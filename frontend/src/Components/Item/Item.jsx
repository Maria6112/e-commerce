import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Item.css";

const Item = (props) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img
          src={
            props.image ||
            "https://via.placeholder.com/300x400/eeeeee/999999?text=Product"
          }
          alt={props.name}
          onError={(e) => {
            setImageError(true); // Только ОДИН раз
            e.target.src =
              "https://via.placeholder.com/300x400/eeeeee/999999?text=Product";
          }}
          style={{
            display: imageError ? "block" : "block",
            minHeight: "350px",
            objectFit: "cover",
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
