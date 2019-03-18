import React from 'react'
import './JoinPage.css'
import Button from '@material-ui/core/Button'

function LoginPage() {
  var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  return(
    <div className="login_page">
      <h1>Login and Love it</h1>
        <form action="/sessions/create" method="get">
          <div className="form">
            <label>Email:</label>
            <input name="email" type="text"/>
            <label>Password:</label>
            <input name="password" type="password"/>
          </div>
          <div className="submit_form_button">
            <Button variant="outlined" size="medium" color="primary" type="submit">
              Login
            </Button>
          </div>
        </form>
    </div>
  )
}

export default LoginPage