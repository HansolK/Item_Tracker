import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import {BrowserRouter} from 'react-router-dom';
import { UserProvider } from '../components/Providers/UserProvider';
import {CategoryProvider} from '../components/Providers/CategoryProvider'
import {ItemProvider} from '../components/Providers/ItemProvider'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <UserProvider>
        <CategoryProvider>
          <ItemProvider>
          <App/>
          </ItemProvider>
        </CategoryProvider>
      </UserProvider>
    </BrowserRouter>,
    document.body.appendChild(document.createElement('div')),
  )
})
