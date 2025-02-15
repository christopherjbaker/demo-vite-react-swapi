type SwapiResource =
  | "films"
  | "people"
  | "planets"
  | "species"
  | "starships"
  | "vehicles"

export type SwapiPathList = `/${SwapiResource}`
export type SwapiPathDetails = `/${SwapiResource}/${number}`
export type SwapiUrlList = `https://swapi.dev/api${SwapiPathList}`
export type SwapiUrlDetails = `https://swapi.dev/api${SwapiPathDetails}`

export interface SwapiItemBase {
  created: Date
  edited: Date
  id: number
  url: SwapiUrlDetails
}

interface SwapiError {
  detail: string
}

export async function getSwapi<Data extends SwapiItemBase | SwapiItemBase[]>(
  path: SwapiPathList | SwapiPathDetails,
): Promise<Data> {
  const response = await fetch(`https://swapi.dev/api${path}`)
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
  }

  if (typeof data.url === "string") {
    const parts = data.url.split("/").reverse()
    const part = parts.find((part) => part.match(/^\d+$/))
    if (part) {
      data.id = parseInt(part, 10)
    }
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
