import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CategoryPage.css";
import CategoryForm from "./CategoryForm";
import CategoryMenu from "./CategoryMenu";
import ItemPage from "./ItemPage";
import ListItem from "@material-ui/core/ListItem";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function CategoryPage(props) {
  const [categories, setCategories] = useState([]);
  useEffect(function() {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        var something = data.categories.map(cat => {
          return { name: cat.name, id: cat.id };
        });
        setCategories(something);
      });
  }, []);

  const [click, setClick] = useState(false);
  
  return (
    <div style={{ display: "flex" }}>
      <CategoryMenu categories={categories} clickState={setClick}/>
      <div className="item_content">
        {props.match.params.id && (
          <ItemPage selectedCategory={props.match.params.id} />
        )}
        {click ? (
          <CategoryForm categories={categories} setCategories={setCategories} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
