import './App.css';
import React, {useState, useEffect} from 'react'
//import landingPage from './pages/landingPage';
import Dropdown from './components/Dropdown';
import axios from 'axios';
import { Credentials } from './components/Credentials';

function App() {
 /* <Router>
        <Switch>
        <Route path='/landingPage' component={landingPage} />
        </Switch>
      </Router> */
  var nodeBase64 = require('nodejs-base64-converter');

  const data= [
    {value: 1, name: 'A'},
    {value: 2, name: 'B'},
    {value: 3, name: 'C'}
  ]
  const spotify = Credentials()
  const [token, setToken] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + nodeBase64.encode(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      console.log(tokenResponse.data.access_token)
      setToken(tokenResponse.data.access_token);

      axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (genreResponse => {        
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      });


    });

  }, []); 




  return (
    <form onSubmit={() => {}} >
    <div className="App">
      <Dropdown options={genres} />
      <Dropdown options={data} />
      <button type='submit'>
        Search
      </button>
    </div>
    </form>
  );
}

export default App;
