import React, { useState, createContext} from "react";
const CategoryContext = createContext({});

function CategoryProvider(props) {
  const [items, setItems] = useState([]);
  console.log("items", items)
  const itemPost = (name, price, description, rate, category_id) => {
    fetch(`/items`, {
      method: "post",
      body: JSON.stringify({ name, price, description, rate, category_id }),
      headers: {
        "X-CSRF-Token": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("returning", data.item)
        console.log("items", items)
        setItems([...items, data.item])
      });
  };

  const editItem = (props) => {
    fetch(`/api/items/${props.id}`, {
      method: "post",
      body: JSON.stringify({ name, price, description, rate, category_id }),
      headers: {
        "X-CSRF-Token": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
        "Content-type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      data
    })
  }

  return (
    <CategoryContext.Provider
      value={{
        items,
        setItems,
        itemPost,
        editItem
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
}

export { CategoryProvider, CategoryContext };
