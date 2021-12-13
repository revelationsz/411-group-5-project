import React, {useState, useEffect} from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import './Player.css'
import './TrackSearchResult.js'

export default function Player({accessToken, trackUri, trackPic}) {
    const [player, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    useEffect(() => console.log(player), [player])

    if(!accessToken) return null
    return (
        <div className="player"> 
       
        <SpotifyPlayer
            
            showSaveIcon
            token = {accessToken}
            callBack={state => {
                if(!state.isPlaying) setPlay(false)
            }}
            play = {player}
            uris = {trackUri ? [trackUri] : []} 
            styles={{
                
            }}
        /> 
        </div>
    )
}
