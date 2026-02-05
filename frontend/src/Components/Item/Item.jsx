import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";

const Item = (props) => {
  const fixImageUrl = (imageUrl) => {
    // Если фото недоступно — показываем placeholder
    const placeholder =
      "https://via.placeholder.com/300x400/f8f9fa/6c757d?text=No+Image";

    if (
      !imageUrl ||
      imageUrl.includes("localhost") ||
      imageUrl.includes("404")
    ) {
      return placeholder;
    }

    // Твой Render URL
    return imageUrl.includes("e-commerce-2-kyct")
      ? imageUrl
      : imageUrl.replace(
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
          alt={props.name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x400/f8f9fa/6c757d?text=No+Image";
          }}
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
