import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./Providers/UserProvider"
import AddCategoryModal from "./AddCategoryModal";

function Home() {
  const userProvider = useContext(UserContext)
  if (userProvider.isLoggedIn) {
    return (
      <div>
        <p>You are logged in</p>
        <Link to="/categories">Categories</Link>
      </div>
    )
  }
  return (
    <div>
      <Link to="/users/new">Join</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Home
