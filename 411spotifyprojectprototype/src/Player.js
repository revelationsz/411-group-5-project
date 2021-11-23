import React, {useState, useEffect} from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({accessToken, trackUri}) {
    const [play, setPlay] = useState(true)

    useEffect(() => setPlay(true), [trackUri])

    if(!accessToken) return null
    return <SpotifyPlayer
    token = {accessToken}
    showSaveIcon 
    callBack={state => {
        if(!state.isPlaying) setPlay(false)
    }}
    play={play}
    uris = {trackUri ? [trackUri] : []} 

    />
}
