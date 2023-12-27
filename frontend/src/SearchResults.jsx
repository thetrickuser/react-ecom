import { useEffect, useReducer } from "react";
import Product from "./Product";
import PropTypes from "prop-types";

const initialState = {
  filteredProducts: [],
  filters: {
    price: { min: "", max: "" },
    category: ["All"],
    rating: "",
  },
  minPrice: "",
  maxPrice: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTERED_PRODUCTS":
      return { ...state, filteredProducts: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    case "SET_MIN_PRICE":
      return { ...state, minPrice: action.payload };
    case "SET_MAX_PRICE":
      return { ...state, maxPrice: action.payload };
    default:
      return state;
  }
};

const SearchResults = ({ results }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { filteredProducts, filters, minPrice, maxPrice } = state;

  useEffect(() => {
    const filtered = results.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );
    dispatch({ type: "SET_FILTERED_PRODUCTS", payload: filtered });
  }, [minPrice, maxPrice, results]);

  useEffect(() => {
    console.log(results)
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

    dispatch({
      type: "SET_FILTERS",
      payload: {
        price: { min: minPrice, max: maxPrice },
        category: ["All", ...categories],
      },
    });
    dispatch({ type: "SET_MIN_PRICE", payload: filters.price.min });
    dispatch({ type: "SET_MAX_PRICE", payload: filters.price.max });
  }, [results]);

  const handleCategoryChange = (filterCategory) => {
    if (filterCategory === "All") {
      dispatch({ type: "SET_FILTERED_PRODUCTS", payload: results });
      dispatch({ type: "SET_MIN_PRICE", payload: filters.price.min });
      dispatch({ type: "SET_MAX_PRICE", payload: filters.price.max });
    } else {
      const filtered = results.filter(
        (item) => item.category === filterCategory
      );
      dispatch({ type: "SET_FILTERED_PRODUCTS", payload: filtered });
    }
  };

  const handleMaxPriceChange = (price) => {
    dispatch({ type: "SET_MAX_PRICE", payload: price });
  };

  const handleMinPriceChange = (price) => {
    dispatch({ type: "SET_MIN_PRICE", payload: price });
  };

  const handleRatingChange = (rating) => {
    const filtered = results.filter((item) => Number(item.rating.rate) >= rating);
    dispatch({ type: "SET_FILTERED_PRODUCTS", payload: filtered });
  };

  return (
    <div className="search">
      <div className="filters">
        <div className="filter">
          <p>Category</p>
          {filters.category.map((item) => (
            <button
              key={item}
              onClick={() => {
                handleCategoryChange(item);
              }}
              value={item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="filter">
          <p>Price</p>
          <span>Min: </span>
          <input
            name="min_price"
            type="number"
            value={minPrice}
            onChange={(event) => {
              handleMinPriceChange(event.target.value);
            }}
          ></input>
          <span>Max: </span>
          <input
            name="max_price"
            type="number"
            value={maxPrice}
            onChange={(event) => {
              handleMaxPriceChange(event.target.value);
            }}
          ></input>
        </div>
        <div className="filter">
          <p>Rating</p>
          {[1, 2, 3, 4, 5].map((item) => (
            <button key={item} onClick={() => handleRatingChange(item)}>
              {item}
            </button>
          ))}
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
