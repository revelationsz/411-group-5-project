import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';
import Survey from './Mood'


const code = new URLSearchParams(window.location.search).get('code');

//const mood = 3
//const page = mood ? <Dashboard code={code}/> : <Survey/>

function App() {
    return (
        code ? <Survey code={code}/> : <Login />
        
    )
}

export default App;
