import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return(
    <div>
      <h1>TRACKIT</h1>
      <Link to="/users/new">Join</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Home