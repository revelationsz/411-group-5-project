import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';
import Survey from './Mood'
import UserInfo from './UserInfo'
const axios = require('axios')

const code = new URLSearchParams(window.location.search).get('code');


function App() {

    return (
       
        code ? <UserInfo code={code}/> : <Login/>
        
    )
}

export default App;
