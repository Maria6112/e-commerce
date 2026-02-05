const sortProducts = (products, sortType) => {
  const sorted = [...products];

  switch (sortType) {
    case "price-asc":
      return sorted.sort((a, b) => a.new_price - b.new_price);
    case "price-desc":
      return sorted.sort((a, b) => b.new_price - a.new_price);
    case "newest":
      return sorted.sort((a, b) => b.id - a.id);

    default:
      return sorted;
  }
};

export default sortProducts;
