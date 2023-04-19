import React, { FC, RefObject, useEffect, useState } from "react"
import { useInView } from "framer-motion"
interface InViewPlaybackControllerProps {
  playerRef: RefObject<HTMLIFrameElement>
}

export const InViewPlaybackController: FC<InViewPlaybackControllerProps> = ({
  playerRef,
}) => {
  const playerIFrame = playerRef?.current?.contentWindow

  const [playerAlreadyStarted, setPlayerAlreadyStarted] = useState(false)

  const inView = useInView(playerRef)

  const pausePlay = () => {
    playerIFrame?.postMessage(
      { key: "kodik_player_api", value: { method: "pause" } },
      "*"
    )
  }

  useEffect(() => {
    const onFirstPlayerStart = (message: MessageEvent) => {
      if (message.data.key == "kodik_player_time_update") {
        setPlayerAlreadyStarted(true)
      }
    }

    window.addEventListener("message", onFirstPlayerStart)

    return () => {
      window.removeEventListener("message", onFirstPlayerStart)
    }
  }, [])

  useEffect(() => {
    if (playerIFrame && playerAlreadyStarted && !inView) {
      pausePlay()
    }
  }, [inView])

  return null
}