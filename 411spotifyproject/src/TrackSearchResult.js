import React , {useEffect}from 'react'

function TrackSearchResult({playlist, chooseTrack}) {
    function handlePlay() {
        chooseTrack(playlist)
    }

    const Img =  playlist.albumUrl
    
    return (
        <div className="d-flex m-2 algin-items-center"
        style= {{cursor: 'pointer'}}
        onClick={handlePlay}
        >
        <img src={Img} alt='' style={{height:"64px", width:"64px"}} />
         <div className="ml-5">
                <div> {playlist.title}</div> 
                <div className="text-muted">{playlist.description}</div>
        </div>
       
        </div>
    )
}

export default TrackSearchResult
