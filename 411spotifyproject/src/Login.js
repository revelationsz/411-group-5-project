import React from 'react'
import {Container} from 'react-bootstrap'

const AUTH_URL =   "https://accounts.spotify.com/authorize?client_id=94b8fe42f877418cb60677b264e47b21&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"



export default function Login() {
    return <Container className="">
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Login to spotify
        </a>
    </Container>
}
