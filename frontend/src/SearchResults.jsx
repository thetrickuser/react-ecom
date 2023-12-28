import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "./Product";
import PropTypes from "prop-types";
import { filterActions } from "./store/filterSlice";

const SearchResults = ({ results }) => {
  const { filteredProducts, filters } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [productCategories, setProductCategories] = useState(["All"]);

  useEffect(() => {
    console.log(results);
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

    setProductCategories(["All", ...categories]);
    dispatch(filterActions.maxPriceChanged(maxPrice));
    dispatch(filterActions.minPriceChanged(minPrice));
    dispatch(filterActions.ratingChanged(0));
    dispatch(filterActions.filteredProductsChanged(results));
  }, [results, dispatch]);

  const handleFilterChange = (filter, value) => {
    console.log(filters);
    if (filter === "category") {
      dispatch(filterActions.categoryChanged(value));
    } else if (filter === "minPrice") {
      dispatch(filterActions.minPriceChanged(value));
    } else if (filter === "maxPrice") {
      dispatch(filterActions.maxPriceChanged(value));
    } else if (filter === "rating") {
      dispatch(filterActions.ratingChanged(value));
    }
  };

  useEffect(() => {
    const newProducts = results.filter((item) => {
      if (filters.category === "All") {
        return (
          item.price >= filters.minPrice &&
          item.price <= filters.maxPrice &&
          item.rating.rate >= filters.rating
        );
      } else {
        return (
          item.category === filters.category &&
          item.price >= filters.minPrice &&
          item.price <= filters.maxPrice &&
          item.rating.rate >= filters.rating
        );
      }
    });

    dispatch(filterActions.filteredProductsChanged(newProducts));
  }, [filters, dispatch, results]);

  return (
    <div className="search">
      <div className="filters">
        <div className="filter">
          <p>Category</p>
          {productCategories.map((item) => (
            <button
              key={item}
              onClick={() => {
                handleFilterChange("category", item);
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
            value={filters.minPrice}
            onChange={(event) => {
              handleFilterChange("minPrice", event.target.value);
            }}
          ></input>
          <span>Max: </span>
          <input
            name="max_price"
            type="number"
            value={filters.maxPrice}
            onChange={(event) => {
              handleFilterChange("maxPrice", event.target.value);
            }}
          ></input>
        </div>
        <div className="filter">
          <p>Rating</p>
          {[1, 2, 3, 4, 5].map((item) => (
            <button
              key={item}
              onClick={() => {
                handleFilterChange("rating", item);
              }}
            >
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
