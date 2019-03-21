import React, { useContext, useState } from "react"
import { Redirect, Link } from "react-router-dom"
import "./JoinPage.css"
import "./LoginPage.css"
import Button from "@material-ui/core/Button"
import { UserContext } from "./Providers/UserProvider"

function LoginPage() {
  const userProvider = useContext(UserContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  console.log("user", userProvider.isLoggedIn)
  if (userProvider.isLoggedIn) {
    return <Redirect to="/categories" />
  }
  return (
    <div className="login_page">
      <h1>Login and Love it</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          userProvider.login(email, password)
        }}
      >
        <div className="form">
          <label>Email:</label>
          <input
            onChange={e => {
              setEmail(e.target.value)
            }}
            value={email}
            type="text"
          />
          <label>Password:</label>
          <input
            onChange={e => {
              setPassword(e.target.value)
            }}
            value={password}
            type="password"
          />
        </div>
        <div className="submit_form_button">
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </div>
        <div className="join_page_prompt">
          <p>You don't have an account with us?</p>
          <p>Don't hesitate, just click <Link to="/users/new">here</Link></p>
        </div>
        {userProvider.loginStatus.error && (
          <p>{userProvider.loginStatus.error}</p>
        )}
      </form>
    </div>
  )
}

export default LoginPage
