/* eslint-disable @typescript-eslint/consistent-type-definitions */

type SwapiResource =
  | "films"
  | "people"
  | "planets"
  | "species"
  | "starships"
  | "vehicles"

export type SwapiUrlList = `https://swapi.dev/api/${SwapiResource}`
export type SwapiUrlDetails = `https://swapi.dev/api/${SwapiResource}/${number}`

export interface SwapiItemBase {
  created: Date
  edited: Date
  id: string
  url: SwapiUrlDetails
}

// type SwapiListResponse = { results: SwapiItemBase[] }
// type SwapiDetailsResponse = SwapiItemBase
type SwapiError = { detail: string }
// type SwapiSuccess = SwapiListResponse | SwapiDetailsResponse
// type SwapiResponse = SwapiSuccess | SwapiError

export async function getSwapi<Data>(path: string): Promise<Data> {
  const response = await fetch(`https://swapi.dev/api${path}`)
  const data = (await response.json()) as unknown //as SwapiResponse

  if (!response.ok) {
    throw new Error((data as SwapiError).detail)
  }
  if (typeof data !== "object" || !data) {
    throw new Error("No data.")
  }

  if ("results" in data) {
    if (Array.isArray(data.results)) {
      for (const item of data.results) {
        transformItem(item as Partial<Record<string, unknown>>)
      }

      return data.results as Data
    }
  } else {
    transformItem(data as Partial<Record<string, unknown>>)

    return data as Data
  }

  throw new Error("Bad data.")
}

function transformItem(data: Partial<Record<string, unknown>>) {
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

  // @ts-expect-error: fix later
  // eslint-disable-next-line
  data.id = data.url.split("/").slice(-2)[0]
}

// function isError(data: SwapiResponse): data is SwapiError {
//   return "detail" in data
// }

// function isList(data: SwapiSuccess): data is SwapiListResponse {
//   return "results" in data
// }

// function isDetails(data: SwapiSuccess): data is SwapiDetailsResponse {
//   return !("results" in data)
// }
