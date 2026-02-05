import React, { useContext, useState, useMemo } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import sortProducts from "../utils/sortProducts.js";

// import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item.jsx";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortType, setSortType] = useState("");

  const filteredProducts = useMemo(() => {
    const products = all_product.filter(
      (item) => item.category === props.category
    );
    return sortProducts(products, sortType);
  }, [all_product, props.category, sortType]);

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="banner" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
          {/* <img src={dropdown_icon} alt="dropdown_icon" /> */}
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
