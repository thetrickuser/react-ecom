import { useEffect, useState } from "react";
import Product from "./Product";
import PropTypes from "prop-types";

const SearchResults = ({ results }) => {
  const [filteredProducts, setFilteredProducts] = useState(results);
  const [filters, setFilters] = useState({
    price: { min: "", max: "" },
    category: ["All"],
    rating: "",
  });

  useEffect(() => {
    let categories = new Set();
    results.forEach((item) => categories.add(item.category));
    categories = Array.from(categories);
    const { minPrice, maxPrice } = results.reduce(
      (acc, item) => {
        const price = item.price;
        return {
          minPrice: Math.min(acc.minPrice, price),
          maxPrice: Math.max(acc.maxPrice, price),
        };
      },
      { minPrice: Infinity, maxPrice: -Infinity }
    );

    setFilters((prevFilters) => ({
      ...prevFilters,
      price: { min: minPrice, max: maxPrice },
      category: ["All", ...categories],
    }));
  }, [results]);

  const handleCategoryChange = (filterCategory) => {
    if (filterCategory === "All") {
      setFilteredProducts(results);
    } else {
      setFilteredProducts(
        results.filter((item) => item.category === filterCategory)
      );
    }
  };

  return (
    <div className="search">
      <div className="filters">
        <div className="filter">
          <p>Category</p>
          {filters.category.map((item) => (
            <div
              key={item}
              onClick={() => {
                handleCategoryChange(item);
              }}
              value={item}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="filter">
          <p>Price</p>
          <span>Min: </span>
          <input name="min_price" type="number"></input>
          <span>Max: </span>
          <input name="max_price" type="number"></input>
        </div>
        <div className="filter">
          <p>Rating</p>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
        </div>
      </div>
      <div className="results">
        {filteredProducts.map((item) => (
          <Product data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
};

export default SearchResults;
