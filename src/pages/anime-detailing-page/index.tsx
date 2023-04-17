import React from "react"
import { AnimeContent } from "./ui/anime-content"
import { AdditionalInfo } from "./ui/additional-info"
import { PagePlayer } from "./ui/page-player"
import { getMediaAccentColorStyles } from "~entities/media/media-card/lib"
import { PreviewImages } from "./ui/preview-images"

const AnimeDetailingPage = () => {
  const cardAccentColorsStyles = getMediaAccentColorStyles("#FFFFFF")
  return (
    <div style={cardAccentColorsStyles}>
      <AnimeContent />
      <div className={"container mx-auto px-2"}>
        <PreviewImages />
        <AdditionalInfo />
        <PagePlayer />
      </div>
    </div>
  )
}

export default AnimeDetailingPage
