import React, {useContext, useState} from 'react'
import {UserContext} from './Providers/UserProvider'
import {Redirect} from 'react-router-dom'
import './JoinPage.css'
import Button from '@material-ui/core/Button'

function JoinPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const userProvider = useContext(UserContext)

  if(userProvider.isLoggedIn) {
    return <Redirect to="/categories"/>
  }
  return(
    <div className="join_page">
      <h1>Create Your Account</h1>
      <form onSubmit={e => {
        e.preventDefault()
        userProvider.signIn(name, email, password)
        }}>
        <div className="form">
          <label>Name:</label>
          <input onChange={e => setName(e.target.value)}type="text"/>
          <label>Email:</label>
          <input onChange={e => setEmail(e.target.value)} type="text"/>
          <label>Password:</label>
          <input onChange={e => setPassword(e.target.value)} type="password"/>
        </div>
          <div className="submit_form_button">
            <Button variant="outlined" size="medium" color="primary" type="submit">
              Join
            </Button>
          </div>
      </form>
    </div>
  )
}

export default JoinPage