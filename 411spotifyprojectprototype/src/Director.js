import React, {useState, useEffect} from 'react'
import { Container, Form } from 'react-bootstrap'
//
const Director = ({title, email, setEmail, errorChecker, filled}) => {
    return (
    <div className="User">
        <h2> test {email}</h2>
        { <Form.Control 
            type="newEmail" 
            placeholder="your@email.com" 
            value={email}
            onChange={e=> setEmail() } //setEmail(e.target.value)
        /> }     
        <button 
            onClick={() => errorChecker}> Submit
        </button>
        <h3> "test" </h3>  
    </div>
    )
}


export default Director