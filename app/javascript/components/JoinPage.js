import React from 'react'
import './JoinPage.css'
import Button from '@material-ui/core/Button'

function JoinPage() {
  var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  console.log("token",token)
  return(
    <div className="join_page">
      <h1>Create Your Account</h1>
      <form action="/api/users/create" method="post">
        <input type="hidden" name="authenticity_token" value={`${token}`} />
        <div className="form">
          <label>Name:</label>
          <input name="name" type="text"/>
          <label>Email:</label>
          <input name="email" type="text"/>
          <label>Password:</label>
          <input name="password" type="password"/>
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