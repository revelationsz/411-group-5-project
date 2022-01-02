import {useState, useEffect} from 'react'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import { Container, Form } from 'react-bootstrap'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import axios from 'axios'
import './Dashboard.css'

const spotifyApi = new SpotifyWebApi({
    clientId: 'b2cde67bdf9c48da9b51ef5ad9cb6404'
})

const OpenCage = 'ee2cb42391a0428980f82186d9efe4a8'

export default function Dashboard(props) {
    const accessToken = useAuth(props.code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")
    const [playingPlaylist, setPlayList] = useState()
    const [Location, setLocation] = useState("")
    const [Weather, setWeather] = useState("")
    const email = props.email
    const [mood, setMood] = useState("")
    
    const successfulLookup = position => { //gets location from long and lat
        const {latitude, longitude} = position.coords;
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=ee2cb42391a0428980f82186d9efe4a8`)
        .then(re => re.json())
        .then(data => {
           // console.log(data)
            setLocation(
                data.results[0].components.county
                )                               
            })
        }
        
    function chooseTrack(track) { //chooses track
            setPlayList(track)
            setLyrics("")
        }
        
    useEffect(() => { //gets loc in form of long and lat and current weather
            window.navigator.geolocation.getCurrentPosition(successfulLookup, console.log)            
        },[])
    
    

    const moodForm = (sum) => {
            if(sum == 15)return "Chill"
            else if(sum > 15) return "Happy"
            else return "Sad"
        }


    useEffect(() => {
        console.log("test")
        axios.get('http://localhost:3001/getinfo', email)
        .then((response) => {
            const data= response.data
            for(var i = 0; i < data.length; i++){
                console.log(data[i])
               if(data[i].email == email) setMood(moodForm(data[i].mood)) 
            }
            console.log(data, "test")
        }).catch((error) => {
            console.log(error)
        })


    },[email])

    useEffect(() => { //gets weather data
        if(!Location) return

        fetch('http://api.openweathermap.org/data/2.5/weather?q='+Location+'&appid=08473323d957a10a040eb70deb579c9e')
        .then(re => re.json())
        .then(data => {
          //  console.log(data.weather[0].description)
            setWeather(
               data.weather[0].description
            )
         //   console.log(Weather)
         })
    },[Location])


    useEffect(() => { //gets access token for us to use spotify api
        if(!accessToken) return 
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

    useEffect(() => { //does the main search function based on our input
        if(!search) return setSearchResults([])
        if(!accessToken) return 
        
        let cancel = false
       
        spotifyApi.searchPlaylists(search).then(res => {
           if(cancel) return
         //  console.log('Found playlists are', res);
       
            setSearchResults( 
               
                  res.body.playlists.items.map(playlist => {
                          return {
                            description: playlist.description,
                            title: playlist.name,
                            uri: playlist.uri,
                            albumUrl: playlist.images[0].url,
                          }  
                })
                   
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
           <div className="buttons">
             <button onClick={e => setSearch(Weather) }> Search based on weather </button>
             <button onClick={e => setSearch(mood)}> Search based on mood</button>
           </div>
           <div className="conter" >
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
        <div className="player"> 
            <Player accessToken={accessToken} trackUri={playingPlaylist?.uri} trackPic={playingPlaylist?.albumUrl} playlist={playingPlaylist} />
        </div>
        </Container>
    )
}
