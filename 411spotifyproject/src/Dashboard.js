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

export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")
    const [playingPlaylist, setPlayList] = useState()

    function chooseTrack(track) {
     //   setPlayingTrack(track)
        setPlayList(track)
        setSearch("")
        setLyrics("")
    }

    // useEffect(() => {
    //     if(!setPlayList) return

    //     axios.get('http://localhost:3001/lyrics',{
    //         params:{
    //             track: playingTrack.title,
    //             artist: playingTrack.artist,
    //             playlist: playingPlaylist.name
    //            // creator: playingPlaylist.
    //         }
    //     })
    // })

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
            
           console.log('Found playlists are', res.body);
           console.log('Found playlists are', res.body.playlists.items[0].images[0].url);

            setSearchResults(
                  res.body.playlists.items.map(playlist => {
                      
                   return {
                       artist: playlist.description,
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
           <Form.Control 
            type="search" 
            placeholder="Search Songs/Artists" 
            value={search}
            onChange={e => setSearch(e.target.value)}
           />
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
           </div>
           <div> <Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
        </Container>
    )
}
