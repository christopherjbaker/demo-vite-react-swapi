export default async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export function thenDelay<Data>(ms: number): (data: Data) => Promise<Data> {
  return async (data) => {
    await delay(1500)
    return data
  }
}
