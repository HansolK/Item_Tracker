import React, { useState, createContext } from "react";
const CategoryContext = createContext({});

function CategoryProvider(props) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories);
      });
  };

  const createCategory = name => {
    fetch(`/api/categories`, {
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
        setCategories([...categories, data]);
      });
  };

  const deleteCategory = id => {
    fetch(`/api/categories/${id}/delete`, {
      method: "delete",
      body: JSON.stringify({ id }),
      headers: {
        "X-CSRF-Token": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories);
      });
  };

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
        setItems([...items, data.item]);
      });
  };

  const editItem = (id, name, price, description, rate, category_id) => {
    fetch(`/api/items/${id}`, {
      method: "put",
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
        setItems(
          items.map(item => {
            if (item.id === data.item.id) {
              return data.item;
            }
            return item;
          })
        );
      });
  };

  const deleteItem = id => {
    fetch(`/api/items/${id}`, {
      method: "delete",
      body: JSON.stringify({ id }),
      headers: {
        "X-CSRF-Token": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => setItems(data.item));
  };


  return (
    <CategoryContext.Provider
      value={{
        deleteCategory,
        items,
        setItems,
        getCategories,
        getCategory: id => categories.find(category => category.id == id),
        categories,
        setCategories,
        createCategory,
        itemPost,
        editItem,
        deleteItem,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
}

export { CategoryProvider, CategoryContext };
