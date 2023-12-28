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
    switch (filter) {
      case "category":
        dispatch(filterActions.categoryChanged(value));
        break;
      case "minPrice":
        dispatch(filterActions.minPriceChanged(value));
        break;
      case "maxPrice":
        dispatch(filterActions.maxPriceChanged(value));
        break;
      case "rating":
        dispatch(filterActions.ratingChanged(value));
        break;
      default:
        break;
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

  const handleSort = (sortType) => {
    const sortedProducts = [...filteredProducts];
    switch (sortType) {
      case "price_l2h":
        sortedProducts.sort((a, b) => {
          return parseFloat(a.price) - parseFloat(b.price);
        });
        break;
      case "price_h2l":
        sortedProducts.sort((a, b) => {
          return parseFloat(b.price) - parseFloat(a.price);
        });
        break;
      case "rating_l2h":
        sortedProducts.sort((a, b) => {
          return parseFloat(a.rating.rate) - parseFloat(b.rating.rate);
        });
        break;
      case "rating_h2l":
        sortedProducts.sort((a, b) => {
          return parseFloat(b.rating.rate) - parseFloat(a.rating.rate);
        });
        break;
      default:
        break;
    }

    dispatch(filterActions.filteredProductsChanged([...sortedProducts]));
  };

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
      <div className="sort">
        <span>Sort: </span>
        <div
          className="sort-option"
          onClick={() => {
            handleSort("price_l2h");
          }}
        >
          Price - Low to High
        </div>
        <div
          className="sort-option"
          onClick={() => {
            handleSort("price_h2l");
          }}
        >
          Price - High to Low
        </div>
        <div
          className="sort-option"
          onClick={() => {
            handleSort("rating_l2h");
          }}
        >
          Rating - Low to High
        </div>
        <div
          className="sort-option"
          onClick={() => {
            handleSort("rating_h2l");
          }}
        >
          Rating - High to Low
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
