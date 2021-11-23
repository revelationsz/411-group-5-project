import {useState, useEffect} from 'react'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import { Container, Form } from 'react-bootstrap'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
    clientId: 'b2cde67bdf9c48da9b51ef5ad9cb6404'
})

const OpenCage = 'ee2cb42391a0428980f82186d9efe4a8'

export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")
    const [playingPlaylist, setPlayList] = useState()
    const [Location, setLocation] = useState("")
     


    const successfulLookup = position => { //gets location from long and lat
        
        const {latitude, longitude} = position.coords;
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=ee2cb42391a0428980f82186d9efe4a8`)
            .then(re => re.json())
            .then(data => {
                console.log(data.results[0].components)
                setLocation(
                    data.results[0].components.city
                )                        
             })
         }
        
        function chooseTrack(track) {
            setPlayList(track)
            setSearch("")
            setLyrics("")
        }
        
        useEffect(() => { //gets loc in form of long and lat 
                window.navigator.geolocation.getCurrentPosition(successfulLookup, console.log)
        },[])


    // useEffect(() => {
    //     if(!playingPlaylist) return
    //     console.log(playingPlaylist.title)
    //     // axios.
    //     //     get('http://localhost:3001/lyrics',{
    //     //     params:{
    //     //         playlist: playingPlaylist.title,
    //     //         artist: playingPlaylist.description
    //     //     },
    //     // })
    // },[playingPlaylist])

    useEffect(() => {
        if(!accessToken) return 
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return 
        
        let cancel = false
      
        spotifyApi.searchPlaylists(search).then(res => {
           if(cancel) return
           console.log('Found playlists are', res);
       
            setSearchResults(
                  res.body.playlists.items.map(playlist => {
                    
                   return {
                       description: playlist.description,
                       title: playlist.name,
                       uri: playlist.uri,
                       albumUrl: playlist.images[0].url,
                   }})
            )
            },function(err) {
                console.log('Something went wrong!', err);
         });
        
        return () => cancel = true
    },[search, accessToken])

    return (
        <Container className="d-flex flex-column py-2" style={{ 
            height: "100vh"
        }}>
           { <Form.Control 
            type="search" 
            placeholder="Search Songs/Artists" 
            value={search}
            onChange={e => setSearch(e.target.value)}
           /> }
           <button onClick={e => setSearch(Location)}> Search </button>
           <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>
               {searchResults.map(playlist => (
                   <TrackSearchResult 
                        playlist={playlist}
                        key={playlist.uri}
                        chooseTrack={chooseTrack}
                        />
                        ))}
               {searchResults.length === 0 && (
                   <div className="text-center" style={{ whilespace: 'pre'}}>
                       {lyrics}
                    </div>
               )}
               <div> <Player accessToken={accessToken} trackUri={playingPlaylist?.uri} /></div>
           </div>
        </Container>
    )
}
