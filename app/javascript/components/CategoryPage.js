import React, {useState, useEffect} from "react"
import {Link} from 'react-router-dom'
import CategoryForm from './CategoryForm'
import ItemPage from './ItemPage'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

function CategoryPage(props) {
  console.log("props", props)
  const [categories, setCategories] = useState([])
  useEffect(function() {
    fetch("/api/categories")
    .then(res => res.json())
    .then(data => {
      var something = data.categories.map(cat => {
        return {name: cat.name, id: cat.id}
      })
      setCategories(something)
    })
  },[])
  const [click, setClick] = useState(false)
  
  return(
    <div>
      <h1>Explore categories</h1>
      <div>
        <div>
          {categories.map((category, index) => {
            return (
              <Link to={`/categories/${category.id}`}>{category.name}</Link>
            )
          })}
        </div>
        <Fab  onClick={e => setClick(!click)} color="primary" aria-label="Add">
          <AddIcon />
        </Fab>
        
        {props.match.params.id && <ItemPage selectedCategory={props.match.params.id}/>}

      </div>
      {click ? <CategoryForm/> : ""}
    </div>
  )
}

export default CategoryPage