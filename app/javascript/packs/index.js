import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import {BrowserRouter} from 'react-router-dom';
import { UserProvider } from '../components/Providers/UserProvider';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <UserProvider>
        <App/>
      </UserProvider>
    </BrowserRouter>,
    document.body.appendChild(document.createElement('div')),
  )
})
