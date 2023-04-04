import { useInfiniteQuery } from "react-query"
import { createArrayQueryParam, publicApi } from "~shared/api"
import { AnimeResponse, GetAnimeParams } from "./types"

export const useGetAnimeList = ({
  pageSize,
  searchQuery,
  status,
  season,
  ratingMpa,
  genres,
  minimalAge,
  order,
  type,
}: GetAnimeParams) =>
  useInfiniteQuery<AnimeResponse[]>(
    [
      "getMangaList",
      searchQuery,
      status,
      season,
      ratingMpa,
      genres,
      minimalAge,
      order,
      type,
    ],
    async ({ pageParam = 0 }) => {
      const params = {
        pageSize: pageSize ? pageSize : 20,
        pageNum: pageParam,
        ...(searchQuery && { searchQuery }),
        ...(minimalAge && { minimalAge }),
        ...(ratingMpa && { ratingMpa }),
        ...(status && { status }),
        ...(season && { season }),
        ...(order && { order }),
        ...(type && { type }),
      }

      console.log(
        createArrayQueryParam([
          { paramName: "genres", array: genres },
          { paramName: "test", array: genres },
        ])
      )

      const {
        data: { data },
      } = await publicApi.get(
        `anime/${createArrayQueryParam([
          { paramName: "genres", array: genres },
        ])}`,
        {
          params,
        }
      )
      return data
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length
        return lastPage.length !== 0 ? nextPage + 1 : undefined
      },
      refetchOnWindowFocus: false,
    }
  )
