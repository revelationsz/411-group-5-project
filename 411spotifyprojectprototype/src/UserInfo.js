import React, {useState, useEffect} from 'react'
import { Container, Form } from 'react-bootstrap'
import axios from 'axios'
import Mood from './Mood'
import Dash from './Dashboard'
import './UserInfo.css'


const UserInfo = ({code}) => {
    const [email, setEmail] = useState("")
    const [userType, setUserType] = useState("")
    const [filledNew, setFilledNew] = useState("  ")
    const [filledRet, setFilledRet] = useState("  ")
    const [RetorNew, setRetorNew] = useState("")
    const [mood, setMood] = useState(-1)
    //const userType = ""

    const isnewUser = () => {
        axios.get('http://localhost:3001/getinfo', email)
        .then((response) => {
            const data= response.data
            for(var i = 0; i < data.length; i++){
                if(data[i].email == email){
                    setUserType("existing")
                    return
                } 
            } 
        setUserType("none")
        }).catch((error) => {
            console.log(error)
        })
        
    }


    useEffect(() => {
        if(email.includes("@")) isnewUser()
    },[email])

    useEffect(() => {
        setEmail("")
    },[RetorNew])

    const errorFeildNew = () => {
        isnewUser()
        email=="" ? setFilledNew("Enter a new Email") 
        : (userType=="existing" ? 
        setFilledNew(" User has already regestered ") : (setFilledNew("")))
    }

    const errorFeildReturning = () => {
        isnewUser()
        console.log(email, userType)
        email=="" ? setFilledRet("Enter Email") 
        : (userType=="existing" ? ( setFilledRet("")) : 
        setFilledRet("Email not Regestered"))
    }    
    
  

    const newUser = () => {
        return (
        <div className="User">
            <h2> New User</h2>
            { <Form.Control 
                type="newEmail" 
                placeholder="your@email.com" 
                value={email}
                onChange={e=> setEmail(e.target.value)}
            /> }     
            <button 
                onClick={() => errorFeildNew()}> Submit 
            </button>
            <h3> {filledNew} </h3> 
        </div>
        )
    }

    const returningUsers = () => {
        return(
        <div className="User">
            <h2> Returning Users</h2>
            { <Form.Control 
                type="retEmail" 
                placeholder="your@email.com" 
                value={email}
                onChange={e=> setEmail(e.target.value)}
            /> }     
            <button onClick={() =>  errorFeildReturning()}> Submit </button>
            <h3>{filledRet}</h3>
        </div>
        )
    }

    const logic = () => {
        return( 
            (RetorNew == "new" && filledNew=="") ? <Mood code={code} email={email}/> : 
            (RetorNew == "ret" && filledRet=="" ? <Dash code ={code} email={email} mood={null}/> : intro())
        )
    }


    const intro = () => {
        return (
            <Container>
            <button onClick={() => setRetorNew("new")}> New user </button>
            <button onClick={() => setRetorNew("ret")}> Returning user </button>
            {RetorNew== "" ? null: (RetorNew=="new" ? newUser() : returningUsers())}
            </Container> 
        )
    }

    return(
        logic()
    )
}

export default UserInfo
