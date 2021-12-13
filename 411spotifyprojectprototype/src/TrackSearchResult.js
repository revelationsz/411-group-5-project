import React , {useState, useEffect}from 'react'
import './TrackSearchResults.css';

function TrackSearchResult({playlist, chooseTrack}) {
    const [play, setPlay] = useState(true)
    function handlePlay() {
        chooseTrack(playlist)
    }

    const Img =  playlist.albumUrl
    
    

    return (
        <div className="con"
            style= {{cursor: 'pointercolums', height: '300px'}}
            onClick={handlePlay}
        >
            <img src={Img} alt='' style={{height:"180px", width:"190px"}} 
                className = "img "
            />
            <div className="title">
                {playlist.title}     
            </div>
        </div>
    )
}

export default TrackSearchResult
