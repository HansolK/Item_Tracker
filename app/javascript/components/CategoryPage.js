import React, {useState, useEffect} from "react"
import {Link} from 'react-router-dom'
import CategoryForm from './CategoryForm'
import ItemPage from './ItemPage'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function CategoryPage(props) {
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
  
  console.log('click value', click)

  return(
    <div>
      <h1>Explore categories</h1>
      <div>
        <div>
          <List component="nav">
          {categories.map((category, index) => {
            return (
              <ListItem key={index} button component={Link} to={`/categories/${category.id}`}>
                <ListItemText primary={`${category.name}`} />
              </ListItem>
            )
          })}
          </List>
        </div>
        <Fab onClick={e => {
          console.log('clicked')
          setClick(!click)
        }} size="small" color="secondary" aria-label="Add">
          <AddIcon />
        </Fab>
        
        {props.match.params.id && <ItemPage selectedCategory={props.match.params.id}/>}

      </div>
      {click ? <CategoryForm categories={categories} setCategories={setCategories} /> : ""}
    </div>
  )
}

export default CategoryPage