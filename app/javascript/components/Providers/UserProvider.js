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

  return(
    <UserContext.Provider
      value={{
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