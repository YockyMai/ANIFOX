import { useQuery } from "react-query"
import { publicHttp } from "~shared/api"

type AnimeTrailer = {
  url: string
  imageUrl: string
  playerUrl: string
  name: string
  kind: string
  hosting: string
}

export const useGetAnimeTrailers = (animeUrl: string) =>
  useQuery<AnimeTrailer[]>(`getAnimeTrailers-${animeUrl}`, async () => {
    try {
      const { data } = await publicHttp.get(`anime/${animeUrl}/media`)

      return data.data
    } catch (e) {
      console.log(e)
    }
  })
