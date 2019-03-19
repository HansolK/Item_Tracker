import React, {createContext, useEffect, useState} from 'react'
const UserContext = createContext({})

function UserProvider(props) {
  const [session, setSession] = useState({loading: true})
  useEffect(function() {
    fetch("/sessions")
      .then(res => res.json())
      .then(data => {
        if(data.error) {
          setSession({...session, loading: false, user: null})
        } else {
          setSession({...session, loading: false, user: data.user})
        }
      })
  },[])

  const login = (email, password) => {
    fetch("/sessions/create", {
      method: "post",
      body: JSON.stringify({email, password}),
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
      setSession({...session, user: null})
    } else {
      setSession({...session, user: data.user})
    }
    })
  }

  return(
    <UserContext.Provider
      value={{
        login,
        isLoggedIn: session.loading === false && session.user !== null,
        user: session.user,
        initalLoading: session.loading
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}


export {UserProvider, UserContext}