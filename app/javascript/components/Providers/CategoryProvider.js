import React, { useState, createContext} from "react";
const CategoryContext = createContext({});

function CategoryProvider(props) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        var something = data.categories.map(cat => {
          return { name: cat.name, id: cat.id };
        });
        setCategories(something);
      });
  }

  const createCategory = name => {
    fetch(`/categories`, {
      method: "post",
      body: JSON.stringify({ name }),
      headers: {
        "X-CSRF-Token": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
        "Content-type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log("data", data)
    })
  }

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
        getCategories,
        categories,
        setCategories,
        createCategory,
        itemPost,
        editItem
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
}

export { CategoryProvider, CategoryContext };
