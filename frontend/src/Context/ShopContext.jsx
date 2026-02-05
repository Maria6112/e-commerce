import React, { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export const ShopContext = createContext(null);
// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index < 300 + 1; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// };

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  // const [cartItems, setCartItems] = useState(getDefaultCart());
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    // fetch("http://localhost:4000/allproducts")
    fetch(`${API_BASE_URL}/allproducts`)
      .then((response) => response.json())
      .then((data) => setAll_Product(data));

    if (localStorage.getItem("auth-token")) {
      // fetch("http://localhost:4000/getcart", {
      fetch(`${API_BASE_URL}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = (itemId, size) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [size]: (prev[itemId]?.[size] || 0) + 1,
      },
    }));
    if (localStorage.getItem("auth-token")) {
      // fetch("http://localhost:4000/addtocart", {
      fetch(`${API_BASE_URL}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, size }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  // const removeFromCart = (itemId, size) => {
  //   setCartItems((prev) => ({
  //     ...prev,
  //     [itemId]: {
  //       ...(prev[itemId] || {}),
  //       [size]: (prev[itemId]?.[size] || 0) - 1,
  //     },
  //   }));
  //   if (localStorage.getItem("auth-token")) {
  //     fetch("http://localhost:4000/removefromcart", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/form-data",
  //         "auth-token": `${localStorage.getItem("auth-token")}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ itemId, size }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => console.log(data));
  //   }
  // };
  const removeFromCart = (itemId, size) => {
    setCartItems((prev) => {
      const updated = { ...prev };

      if (!updated[itemId] || !updated[itemId][size]) return prev;

      updated[itemId][size] -= 1;

      if (updated[itemId][size] === 0) {
        delete updated[itemId][size];
      }

      if (Object.keys(updated[itemId]).length === 0) {
        delete updated[itemId];
      }

      return updated;
    });

    // fetch("http://localhost:4000/removefromcart", {
    fetch(`${API_BASE_URL}/removefromcart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ itemId, size }),
    });
  };
  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = all_product.find(
  //         (product) => product.id === Number(item)
  //       );
  //       totalAmount += itemInfo.new_price * cartItems[item];
  //     }
  //   }
  //   return totalAmount;
  // };
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = all_product.find(
        (product) => product.id === Number(itemId)
      );

      if (!itemInfo) continue;

      const sizes = cartItems[itemId];

      if (typeof sizes === "object") {
        for (const size in sizes) {
          totalAmount += itemInfo.new_price * sizes[size];
        }
      }
    }

    return totalAmount;
  };
  // const getTotalCartItems = () => {
  //   let totalItem = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       totalItem += cartItems[item];
  //     }
  //   }
  //   return totalItem;
  // };
  const getTotalCartItems = () => {
    let totalItem = 0;

    for (const itemId in cartItems) {
      const sizes = cartItems[itemId];

      if (typeof sizes === "object") {
        for (const size in sizes) {
          totalItem += sizes[size];
        }
      }
    }

    return totalItem;
  };
  const [user, setUser] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);

  const fetchUser = async () => {
    if (localStorage.getItem("auth-token")) {
      try {
        // const response = await fetch("http://localhost:4000/getuser", {
        const response = await fetch(`${API_BASE_URL}/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({}),
        });
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error in user fetching:", error);
      }
    }
  };
  useEffect(() => {
    // fetch("http://localhost:4000/allproducts")
    fetch(`${API_BASE_URL}/allproducts`)
      .then((response) => response.json())
      .then((data) => setAll_Product(data));

    fetchUser();

    if (localStorage.getItem("auth-token")) {
      // fetch("http://localhost:4000/getcart", {
      fetch(`${API_BASE_URL}/getcart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ИСПРАВЬ: убери Accept и Content-type
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({}), // ИСПРАВЬ: пустой объект вместо ""
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    user,
    setUser,
    customerInfo,
    setCustomerInfo,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
