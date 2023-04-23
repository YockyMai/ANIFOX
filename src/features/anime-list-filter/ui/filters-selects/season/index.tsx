import React, { FC } from "react"
import { Select } from "~shared/components"
import { useAnimeListFilterStore } from "~features/anime-list-filter"
import { shallow } from "zustand/shallow"
import { AnimeSeasons } from "~shared/api"

const options = [
  { value: "Fall", label: "Осень" },
  { value: "Spring", label: "Весна" },
  { value: "Winter", label: "Зима" },
  { value: "Summer", label: "Лето" },
]

interface SeasonProps {
  inExtraFilter?: boolean
}

export const Season: FC<SeasonProps> = ({ inExtraFilter }) => {
  const { season, setSeason } = useAnimeListFilterStore(
    (state) => state,
    shallow
  )

  return (
    <div>
      <Select
        value={season || ""}
        onValueChange={(val) => setSeason(val ? (val as AnimeSeasons) : null)}
        options={options}
        placeholder={"Любой"}
        label={"Сезон"}
        color={inExtraFilter ? "slateDark" : undefined}
      />
    </div>
  )
}