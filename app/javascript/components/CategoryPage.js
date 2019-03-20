import React, { useState, useEffect, useContext } from "react";
import {CategoryContext} from './Providers/CategoryProvider'
import "./CategoryPage.css";
import CategoryForm from "./CategoryForm";
import CategoryMenu from "./CategoryMenu";
import ItemPage from "./ItemPage";
import ListItem from "@material-ui/core/ListItem";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function CategoryPage(props) {
  const categoryProvider = useContext(CategoryContext)
  useEffect(categoryProvider.getCategories, [])
  
  const [click, setClick] = useState(false);
  return (
    <div style={{ display: "flex" }}>
      <CategoryMenu categories={categoryProvider.categories} AddCategoryClick={setClick}/>
      <div className="item_content">
        
        {props.match.params.id && (
          <ItemPage selectedCategory={props.match.params.id} />
        )}

        {click ? (
          <CategoryForm categories={categoryProvider.categories} setCategories={categoryProvider.setCategories} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
