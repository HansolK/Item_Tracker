import React, {useState, useEffect} from 'react'

function CategoryDisplay() {
  const [items, setItems] = useState({})
  // console.log(items)
  let descendingOrder = items.data ? items.data.sort((a, b) => a.rate > b.rate ? 1 : -1) : undefined

  useEffect(function() {
    fetch('/api/categories')
    .then(res => res.json())
    .then(data => {
      if(data.length > 0) {
        setItems({data: data})
      } else {
        setItems({})
      }
    })
  }, [])

  return(
    <div>
      {items.data ? items.data.length > 0 ? (<div><h1>Your most loved items</h1></div>) : <div>You haven't purchase anything</div> : undefined}
    </div>

   
  )
}

export default CategoryDisplay