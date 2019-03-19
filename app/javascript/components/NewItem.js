import React from 'react'
import Button from '@material-ui/core/Button'

function NewItem(props) {
  console.log("going through newItem page")
  var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  return(
    <div>
      <form action="/items" method="post">
        <input type="hidden" name="authenticity_token" value={`${token}`} />
        <input type="hidden" name="category_id" value={props.category}/>
        <div className="form">
          <label>Name:</label>
          <input name="name" type="text"/>
          <label>Price:</label>
          <input name="price" type="number"/>
          <label>Description:</label>
          <textarea name="description" type="text"></textarea>
          <label>Rate:</label>
          <input name="rate" type="range" min="0" max="10"/>
        </div>
          <div className="submit_form_button">
            <Button variant="outlined" size="medium" color="primary" type="submit">
              Add This Item
            </Button>
          </div>
      </form>
    </div>
  )
}

export default NewItem