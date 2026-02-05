import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>122</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer
          garmet.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={selectedSize === size ? "size selected" : "size"}
                onClick={() => {
                  setSelectedSize(size);
                  setError("");
                }}
              >
                {size}
              </div>
            ))}
            {/* <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div> */}
          </div>
        </div>
        <button
          onClick={() => {
            if (!selectedSize) {
              setError("Please choose Size");
              return;
            }
            addToCart(product.id, selectedSize);
            console.log(
              `product ${product.id} added with ${selectedSize} size`
            );
          }}
        >
          ADD TO CART
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="productdisplay-right-category">
          <span>Category: </span>
          {product.category} , T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags: </span>
          Modern , Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
