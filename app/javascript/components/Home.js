import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./Providers/UserProvider"

function Home() {
  const userProvider = useContext(UserContext)
  if (userProvider.isLoggedIn) {
    return (
      <div>
        <h1>TRACKIT</h1>
        <p>You are logged in</p>
        <Link to="/categories">Categories</Link>
      </div>
    )
  }
  return (
    <div>
      <h1>TRACKIT</h1>
      <Link to="/users/new">Join</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Home
