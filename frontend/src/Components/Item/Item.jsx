import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";

const Item = (props) => {
  // Фиксим URL фото
  const fixImageUrl = (imageUrl) => {
    // Placeholder фото для портфолио
    if (
      !imageUrl ||
      imageUrl.includes("404") ||
      !imageUrl.startsWith("https://e-commerce-2-kyct")
    ) {
      return "https://via.placeholder.com/300x400/f8f9fa/6c757d?text=Product";
    }
    return imageUrl.replace(
      "http://localhost:4000",
      "https://e-commerce-2-kyct.onrender.com",
    );
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
