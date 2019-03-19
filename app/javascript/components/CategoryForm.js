import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from './Providers/UserProvider'
import './JoinPage.css'

function CategoryForm(props) {
  const userProvider = useContext(UserContext)
  const [categoryName, setCategoryName] = useState("")

  function newCategory(name) {
    fetch("/categories", {
      method: "post",
      body: JSON.stringify({name}),
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      props.setCategories({...props.categories, name:data.name, id: data.id})
    })
  }

  if(userProvider.isLoggedIn) {
    return(
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          newCategory(categoryName)
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