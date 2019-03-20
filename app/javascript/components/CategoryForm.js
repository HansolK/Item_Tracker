import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from './Providers/UserProvider'
import {CategoryContext} from './Providers/CategoryProvider'
import './JoinPage.css'

function CategoryForm(props) {
  const userProvider = useContext(UserContext)
  const [categoryName, setCategoryName] = useState("")
  const categoryProvider = useContext

  if(userProvider.isLoggedIn) {
    return(
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          categoryProvider.createCategory(CategoryName)
        }}>
          <div className="form">
            <label>Name:</label>
            <input onChange={e => {
              setCategoryName(e.target.value)
            }} 
            value={categoryName}
            name="name"/>
            <button className="submit_form_button">Create</button>
          </div>
        </form>
      </div>
    ) 
  }
  return (
    <p>Oops, You have to log in first</p>
  )
}

export default CategoryForm