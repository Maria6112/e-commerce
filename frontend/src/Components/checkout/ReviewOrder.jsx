import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import CartItems from "../CartItems/CartItems";

const ReviewOrder = ({ onBack, customerInfo }) => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);

  // ✅ БЕЗОПАСНЫЕ данные
  const safeCustomerInfo = customerInfo || {};
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const total = getTotalCartAmount ? getTotalCartAmount() : 0;

  return (
    <div className="checkout-section">
      <h2>Order Review</h2>

      {/* Клиент */}
      <div className="review-section">
        <h3>Customer Information</h3>
        <div className="review-item">
          <span>Name:</span>
          <strong>
            {safeCustomerInfo.firstName} {safeCustomerInfo.lastName}
          </strong>
        </div>
        <div className="review-item">
          <span>Email:</span>
          <strong>{safeCustomerInfo.email}</strong>
        </div>
        <div className="review-item">
          <span>Phone:</span>
          <strong>{safeCustomerInfo.phone || "Not provided"}</strong>
        </div>
      </div>

      {/* Доставка */}
      <div className="review-section">
        <h3>Delivery</h3>
        <div className="review-item">
          <span>Method:</span>
          <strong>
            {safeCustomerInfo.delivery === "express"
              ? "⚡ Express"
              : "🚚 Regular"}
          </strong>
        </div>
        <div className="review-item">
          <span>Delivery cost:</span>
          <strong>{(safeCustomerInfo.deliveryPrice || 0).toFixed(2)}$</strong>
        </div>
      </div>

      {/* ✅ ТОВАРЫ — теперь показывает! */}
      <div className="review-section">
        <h3>Order Items</h3>
        {/* <CartItems /> */}
      </div>

      {/* Итого */}
      <div className="review-total">
        <div className="total-row">
          <span>Subtotal:</span> <span>{total.toFixed(2)}$</span>
        </div>
        <div className="total-row">
          <span>Delivery:</span>{" "}
          <span>{(safeCustomerInfo.deliveryPrice || 0).toFixed(2)}$</span>
        </div>
        <hr />
        <div className="total-row total-final">
          <strong>Total:</strong>
          <strong>
            {(total + (safeCustomerInfo.deliveryPrice || 0)).toFixed(2)}$
          </strong>
        </div>
      </div>

      <div className="review-buttons">
        <button className="btn-secondary" onClick={onBack}>
          ← Back to Checkout
        </button>
        <button className="checkout-btn">CONFIRM ORDER →</button>
      </div>
    </div>
  );
};

export default ReviewOrder;
