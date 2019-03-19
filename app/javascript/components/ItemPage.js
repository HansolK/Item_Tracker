import React, { useState, useEffect } from 'react'
import NewItem from './NewItem'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

function ItemPage(props) {
  const [items, setItems] = useState([])
  const [addItem, setAddItem] = useState(false)
  
  useEffect(function() {
    fetch(`/api/categories/${props.selectedCategory}`)
    .then(res => res.json())
    .then(data => {
      setItems(data.items)
    })
  }, [props.selectedCategory])
  
  return(
    <div>
      <Fab 
      onClick={(e) => {
        setAddItem(true)
      }}
      color="primary" 
      aria-label="Add">
          <AddIcon />
      </Fab>
      {items.map((item, index) => {
        return <div key={index}>
          <p>{item.name}</p>
          <p>{item.rate}</p>
        </div>
      })}
      {addItem ? <NewItem category={props.selectedCategory}/> : ""}
    </div>
  )
}

export default ItemPage