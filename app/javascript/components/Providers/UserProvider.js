import React, { createContext, useEffect, useState, useContext } from "react";
import api from '../../api'
const UserContext = createContext({});

function UserProvider(props) {
  const [session, setSession] = useState({ loading: true });
  useEffect(function() {
    api.get("/sessions")
      .then(data => {
        if (data.error) {
          setSession({ ...session, loading: false, user: null });
        } else {
          setSession({ ...session, loading: false, user: data.user });
        }
      });
  }, []);

  const [loginStatus, setLoginStatus] = useState({
    error: null,
    loading: false
  });
  
  const login = (email, password) => {
    setLoginStatus({ loading: true });
    api.post("/sessions/create", {email, password})
      .then(data => {
        setLoginStatus({ ...loginStatus, loading: false });
        if (data.error) {
          setLoginStatus({ ...loginStatus, error: data.error });
          setSession({ ...session, user: null });
        } else {
          setSession({ ...session, user: data.user });
        }
      });
  };

  const signIn = (name, email, password) => {
    api.post("/api/users/create", { name, email, password })
      .then(data => {
        if (data.error) {
          // setSession({...session, user: null})
        } else {
          setSession({ ...session, user: data.user });
        }
      });
  };


  const signOut = () => {
    api.get("/sessions/destroy")
    .then(data => setSession({ ...session, user: null})) 
  }

  return (
    <UserContext.Provider
      value={{
        signOut,
        login,
        loginStatus,
        isLoggedIn: session.loading === false && session.user !== null,
        signIn,
        user: session.user,
        initialLoading: session.loading
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

function useUserProvider() {
  return useContext(UserContext);
}

export { UserProvider, UserContext, useUserProvider };
