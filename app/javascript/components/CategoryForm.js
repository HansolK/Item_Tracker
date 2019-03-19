import React, {useState, useEffect} from 'react'
import './JoinPage.css'

function CategoryForm() {
  var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  const [session, setSession] = useState({loading: true})
  useEffect(function() {
      fetch("/sessions")
      .then(res => res.json())
      .then(data => {
        setSession({...session, loading: false, user_id: data.user.id})
      })
  },[])

  if(session.loading === false && session.user_id !== null) {
    return(
      <div>
        <form action="/categories" method="post">
          <input type="hidden" name="user_id" value={session.user_id}/>
          <input type="hidden" name="authenticity_token" value={`${token}`} />
          <div className="form">
            <label>Name:</label>
            <input name="name"/>
            <button className="submit_form_button">Create</button>
          </div>
        </form>
      </div>
    ) 
  }
  return (
    <p>Oops, something is wrong</p>
  )
  
}

export default CategoryForm