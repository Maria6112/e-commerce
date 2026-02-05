import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";

const Item = (props) => {
  // Фиксим URL фото
  const fixImageUrl = (imageUrl) => {
    if (imageUrl.includes("localhost")) {
      return imageUrl.replace(
        "http://localhost:4000",
        "https://e-commerce-2-kyct.onrender.com"
      );
    }
    return imageUrl;
  };

  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img
          onClick={window.scrollTo(0, 0)}
          src={fixImageUrl(props.image)}
          alt=""
        />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>
    </div>
  );
};

export default Item;
