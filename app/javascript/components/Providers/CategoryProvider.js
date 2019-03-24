import React, { useState, createContext } from "react";
import api from '../../api'
const CategoryContext = createContext({});

function CategoryProvider(props) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
 

  const getCategories = () => {
    api.get("/api/categories")
      .then(data => {
        setCategories(data.categories);
      });
  };

  const createCategory = name => {
    api.post(`/api/categories`, { name })
      .then(data => {
        setCategories([...categories, data]);
      });
  };

  const deleteCategory = id => {
    return fetch(`/api/categories/${id}/delete`, {
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
        createCategory
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
}

export { CategoryProvider, CategoryContext };
