import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../Pages/CSS/Checkout.css";

const CustomerInfo = () => {
  const { user, setCustomerInfo } = useContext(ShopContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneCountry: "",
    isGuest: true,
  });
  const [phoneError, setPhoneError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneCountry: user.phoneCountry || "",
        phone: user.phone || "",
        isGuest: false,
      });
      setCustomerInfo({
        ...user,
        isGuest: false,
      });
    }
  }, [user, setCustomerInfo]);

  // Валидация полей
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value.trim()) error = "First name is required";
        else if (value.trim().length < 2) error = "Minimum 2 characters";
        else if (!/^[a-zA-Z\s\-']+$/.test(value.trim()))
          error = "Only English letters allowed";
        break;

      case "lastName":
        if (!value.trim()) error = "Last name is required";
        else if (value.trim().length < 2) error = "Minimum 2 characters";
        else if (!/^[a-zA-Z\s\-']+$/.test(value.trim()))
          error = "Only English letters allowed";
        break;

      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          error = "Invalid email format";
        break;

      case "phoneCountry":
        if (!value.trim()) error = "Phone Country is required";
        break;

      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (value.trim().length < 8) error = "Wrong phone number";

        break;

      default:
        error = "";
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = { ...form, [name]: value };
    setForm(updated);

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error || "",
    }));

    setCustomerInfo(updated);
  };

  const handlePhoneChange = (value, country) => {
    setForm((prev) => ({
      ...prev,
      phone: value,
      phoneCountry: country?.iso2 || "MD",
    }));

    if (value && value.length > 10) {
      setPhoneError("");
    } else if (value) {
      setPhoneError("Invalid phone number");
    } else {
      setPhoneError("");
    }

    setCustomerInfo((prev) => ({
      ...prev,
      phone: value,
      phoneCountry: country?.iso2 || "MD",
    }));
  };

  return (
    <div className="checkout-section">
      <h2>Customer Information</h2>

      {!user && (
        <p style={{ fontSize: "14px", opacity: 0.8 }}>
          You can checkout as a guest or{" "}
          <Link to="/login">
            <strong style={{ cursor: "pointer" }}>log in</strong>
          </Link>
        </p>
      )}

      <div className="checkout-grid">
        {/* РЯД 1: Имя + Фамилия */}
        <div className="form-field">
          <input
            name="firstName"
            placeholder="First name *"
            value={form.firstName}
            onChange={handleChange}
            className={errors.firstName ? "input-error" : ""}
            required
          />
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
        </div>

        <div className="form-field">
          <input
            name="lastName"
            placeholder="Last name *"
            value={form.lastName}
            onChange={handleChange}
            className={errors.lastName ? "input-error" : ""}
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        {/* РЯД 2: Email + Телефон */}
        <div className="form-field">
          <input
            name="email"
            type="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-field phone-input-container">
          <PhoneInput
            country="MD"
            value={form.phone}
            onChange={handlePhoneChange}
            inputClass="phone-input"
            dropdownClass="phone-dropdown"
            disableCountryGuess={false}
            autoFormat={false}
            addInternationalOption={false}
            countryTooltipSizeType="REGULAR"
          />
          {phoneError && <span className="error">{phoneError}</span>}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
