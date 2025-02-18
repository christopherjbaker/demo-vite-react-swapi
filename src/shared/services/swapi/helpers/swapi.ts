export type SwapiResourceType =
  | "films"
  | "people"
  | "planets"
  | "species"
  | "starships"
  | "vehicles"

export interface SwapiResource {
  type: SwapiResourceType
  id: string
}

export interface SwapiItemBase {
  created: Date
  edited: Date
  type: SwapiResourceType
  id: number
}

interface SwapiError {
  detail: string
}

const baseUrl = "https://swapi.dev/api"
const detailsUrlMatch = new RegExp(`^${baseUrl}/(.+)/(\\d+)/?$`)
type SwapiUrlDetails = `${typeof baseUrl}/${SwapiResourceType}/${number}`

export async function getSwapi<Data extends SwapiItemBase | SwapiItemBase[]>(
  path: string,
): Promise<Data> {
  const response = await fetch(`${baseUrl}${path}`)
  const data = extractSwapiData<Data>(await response.json())

  if (!response.ok || isError(data)) {
    if (isError(data)) {
      throw new Error(data.detail)
    }

    throw new Error("Something went wrong.")
  }

  if (isList(data)) {
    for (const item of data) {
      transformItem(item)
    }

    return data as Data
  }

  if (isDetails(data)) {
    transformItem(data)

    return data as Data
  }

  throw new Error("Bad data.")
}

function extractSwapiData<Data>(data: unknown): SwapiError | Data {
  if (!data || typeof data !== "object") throw new Error("Invalid response.")

  if ("detail" in data) return data as SwapiError
  if ("results" in data) return data.results as Data
  else return data as Data
}

function transformItem(data_: SwapiItemBase): void {
  // These kinds of cleanup transforms are messy with respect to types.
  const data = data_ as unknown as Partial<Record<string, unknown>>

  for (const key in data) {
    const value = data[key]

    if (typeof value === "string") {
      if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{6}Z$/)) {
        data[key] = new Date(value)
      }

      if (value.match(/^\d+Z$/)) {
        data[key] = parseInt(value, 10)
      }
    }

    if (isSwapiDetailsUrl(value)) {
      data[key] = parseSwapiDetailsUrl(value)
    }
  }

  if (isSwapiResource(data.url)) {
    data.type = data.url.type
    data.id = data.url.id
    delete data.url
  }
}

function isError(data: unknown): data is SwapiError {
  return typeof data === "object" && data !== null && "detail" in data
}

function isList(
  data: SwapiItemBase | SwapiItemBase[],
): data is SwapiItemBase[] {
  return Array.isArray(data)
}

function isDetails(
  data: SwapiItemBase | SwapiItemBase[],
): data is SwapiItemBase {
  return !Array.isArray(data)
}

function isSwapiDetailsUrl(
  value: unknown,
): value is SwapiUrlDetails | SwapiUrlDetails[] {
  return (
    (typeof value === "string" && !!value.match(detailsUrlMatch)) ||
    (Array.isArray(value) && value.every((value) => isSwapiDetailsUrl(value)))
  )
}

function isSwapiResource(value: unknown): value is SwapiResource {
  return (
    !!value && typeof value === "object" && "type" in value && "id" in value
  )
}

function parseSwapiDetailsUrl(
  value: SwapiUrlDetails | SwapiUrlDetails[],
): SwapiResource | SwapiResource[] {
  function parse(value: string): SwapiResource {
    const match = value.match(detailsUrlMatch)
    if (!match) throw new Error(`Invalid SwapiUrlDetails: ${value}`)

    return {
      type: match[1] as SwapiResourceType,
      id: match[2],
    }
  }

  if (typeof value === "string") {
    return parse(value)
  }

  if (Array.isArray(value)) {
    return value.map((value) => parse(value))
  }

  throw new Error(`Invalid SwapiUrlDetails: ${JSON.stringify(value)}`)
}
