import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "../../Pages/CSS/Checkout.css";

const DeliveryForm = () => {
  const { customerInfo, setCustomerInfo } = useContext(ShopContext);

  const [form, setForm] = useState({
    street: "",
    house: "",
    entrance: "",
    apartment: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});

  // Sync with customerInfo
  useEffect(() => {
    if (customerInfo?.address) setForm(customerInfo.address);
  }, [customerInfo]);

  // Simple validation rules
  const rules = {
    street: { required: true, min: 3 },
    house: { required: true, pattern: /^\d+$/ },
    city: { required: true, min: 2 },
    postalCode: { required: true, pattern: /^\d{4,6}$/ },
    country: { required: true },
  };

  const validate = (name, value) => {
    const rule = rules[name];
    if (!rule) return "";

    if (rule.required && !value.trim()) return `${name} is required`;
    if (rule.min && value.trim().length < rule.min)
      return `Minimum ${rule.min} chars`;
    if (rule.pattern && !rule.pattern.test(value.trim()))
      return "Invalid format";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    setErrors({ ...errors, [name]: validate(name, value) });

    setCustomerInfo({ ...customerInfo, address: updated });
  };

  const countries = [
    "Australia",
    "France",
    "Germany",
    "Israel",
    "Italy",
    "Moldova",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Spain",
    "Ukraine",
    "United Kingdom",
    "USA",
  ];

  return (
    <div className="checkout-section">
      <h2>Delivery Address</h2>
      <div className="checkout-grid">
        <div className="form-field">
          <input
            name="street"
            placeholder="Street address"
            value={form.street}
            onChange={handleChange}
            className={errors.street ? "input-error" : ""}
          />
          {errors.street && <span className="error">{errors.street}</span>}
        </div>
        <div className="form-field">
          <input
            name="house"
            placeholder="House number"
            value={form.house}
            onChange={handleChange}
            className={errors.house ? "input-error" : ""}
          />
          {errors.house && <span className="error">{errors.house}</span>}
        </div>

        <input
          name="entrance"
          placeholder="Entrance (optional)"
          value={form.entrance}
          onChange={handleChange}
        />

        <input
          name="apartment"
          placeholder="Apartment (optional)"
          value={form.apartment}
          onChange={handleChange}
        />
        <div className="form-field">
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className={errors.city ? "input-error" : ""}
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="form-field">
          <input
            name="postalCode"
            placeholder="Postal code"
            value={form.postalCode}
            onChange={handleChange}
            className={errors.postalCode ? "input-error" : ""}
          />
          {errors.postalCode && (
            <span className="error">{errors.postalCode}</span>
          )}
        </div>

        <div className="full-width">
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="country-select"
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
