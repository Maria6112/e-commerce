import React, { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";

const DeliveryOptions = () => {
  const { setCustomerInfo } = useContext(ShopContext);

  const [selectedDelivery, setSelectedDelivery] = useState("regular");
  const deliveryOptions = [
    {
      id: "regular",
      title: "Regular Delivery",
      price: "5.99$",
      time: "14 days",
      description: "Standard delivery across the country",
      icon: "🚚",
    },
    {
      id: "express",
      title: "Express Delivery",
      price: "12.99$",
      time: "5-7 days",
      description: "Fast delivery to major cities",
      icon: "⚡",
    },
  ];

  const handleDeliveryChange = (deliveryType) => {
    setSelectedDelivery(deliveryType);
    setCustomerInfo((prev) => ({
      ...prev,
      delivery: deliveryType,
      deliveryPrice: deliveryType === "regilar" ? 5.99 : 12.99,
    }));
  };

  return (
    <div className="checkout-section">
      <h2>DeliveryOptions</h2>
      <div className="delivery-options">
        {deliveryOptions.map((option) => (
          <label
            key={option.id}
            className={`delivery-card ${
              selectedDelivery === option.id ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="delivery"
              value={option.id}
              checked={selectedDelivery === option.id}
              onChange={() => handleDeliveryChange(option.id)}
              className="delivery-radio"
            />
            <div className="delivery-content">
              <div className="delivery-icon">{option.icon}</div>
              <div className="delivery-info">
                <div className="delivery-title">{option.title}</div>
                <div className="delivery-time">{option.time}</div>
                <div className="delivery-desc">{option.description}</div>
              </div>
              <div className="delivery-price">{option.price}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOptions;
