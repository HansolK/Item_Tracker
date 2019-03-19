import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CategoryPage.css";
import CategoryForm from "./CategoryForm";
import CategoryMenu from "./CategoryMenu";
import ItemPage from "./ItemPage";
import Grid from "@material-ui/core/Grid";
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

  console.log("click value", click);

  return (
    <div style={{ display: "flex" }}>
      <CategoryMenu categories={categories} />
      <div style={{ padding: "5px 30px" }}>
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
