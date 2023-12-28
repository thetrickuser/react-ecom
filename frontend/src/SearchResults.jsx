import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "./Product";
import PropTypes from "prop-types";
import { filterActions } from "./store/filterSlice";
import Filters from "./Filters";

const SearchResults = ({ results }) => {
  const { filteredProducts, filters } = useSelector((state) => state.filter);
  const dispatch = useDispatch();  

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
      <Filters />
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
