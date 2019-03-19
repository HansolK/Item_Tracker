import React, {useState, useEffect} from "react"
import CategoryForm from './CategoryForm'
import ItemPage from './ItemPage'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

function CategoryPage() {
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
  const [categoryId, setCategoryId] = useState(null)
  return(
    <div>
      <h1>Explore categories</h1>
      <div>
        <div>
          {categories.map((category, index) => {
            return <Button 
            key={index}
            onClick={e => {
              setCategoryId(category.id)
            }}  
            color="primary">
            {category.name}
            </Button>
          })}
        </div>
        <Fab  onClick={e => setClick(!click)} color="primary" aria-label="Add">
          <AddIcon />
        </Fab>
        
        {categoryId && <ItemPage selectedCategory={categoryId}/>}

      </div>
      {click ? <CategoryForm/> : ""}
    </div>
  )
}

export default CategoryPage