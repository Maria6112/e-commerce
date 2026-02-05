import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";

import CustomerInfo from "../Components/checkout/CustomerInfo";
import DeliveryForm from "../Components/checkout/DeliveryForm";
import DeliveryOptions from "../Components/checkout/DeliveryOptions";
import ReviewOrder from "../Components/checkout/ReviewOrder";
import "../Pages/CSS/Checkout.css";

const Checkout = () => {
  const { customerInfo: contextCustomerInfo } = useContext(ShopContext);

  // ✅ БЕЗОПАСНЫЙ доступ к customerInfo
  const customerInfo = contextCustomerInfo || {};
  const [showReview, setShowReview] = useState(false);
  const [checkoutData, setCheckoutData] = useState({});

  useEffect(() => {
    if (customerInfo.firstName || customerInfo.email) {
      setCheckoutData(customerInfo);
    }
  }, [customerInfo]);

  const handleContinueToPayment = () => {
    // ✅ БЕЗОПАСНАЯ проверка с опциональной цепочкой
    if (
      !customerInfo.firstName?.trim() ||
      !customerInfo.email?.trim() ||
      !customerInfo.phoneCountry?.trim() ||
      !customerInfo.phone?.trim() ||
      !customerInfo.delivery
    ) {
      console.log("Please fill required fields");
      return;
    }
    setShowReview(true);
  };

  const goBackToCheckout = () => {
    setShowReview(false);
  };

  if (showReview) {
    return (
      <ReviewOrder onBack={goBackToCheckout} customerInfo={checkoutData} />
    );
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <CustomerInfo />
      <DeliveryForm />
      <DeliveryOptions />

      <button
        className="checkout-btn"
        onClick={handleContinueToPayment}
        disabled={
          !customerInfo.firstName?.trim() ||
          !customerInfo.email?.trim() ||
          !customerInfo.phoneCountry?.trim() ||
          !customerInfo.phone?.trim() ||
          !customerInfo.delivery
        }
      >
        CONTINUE TO PAYMENT →
      </button>
    </div>
  );
};

export default Checkout;
