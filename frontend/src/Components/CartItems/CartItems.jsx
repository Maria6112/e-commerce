import React, { useContext } from "react";
import "./CartItems.css";
import { Link } from "react-router-dom";

import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((product) => {
        const sizes = cartItems[product.id];

        if (!sizes) return null;

        return Object.entries(sizes).map(([size, quantity]) => (
          <div
            key={`${product.id}-${size}`}
            className="cartitems-format cartitems-format-main"
          >
            <img src={product.image} alt="" className="carticon-product-icon" />
            <p>{product.name}</p>
            <p>{size}</p>
            <p>${product.new_price}</p>
            <button className="cartitems-quantity">{quantity}</button>
            <p>${product.new_price * quantity}</p>
            <img
              className="cartitems-remove-icon"
              src={remove_icon}
              onClick={() => removeFromCart(product.id, size)}
              alt="remove"
            />
          </div>
        ));
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <Link to="/checkout">
            <button>PROCEED TO CHECKOUT</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
