import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "./store/filterSlice";

const Filters = () => {
    const {products} = useSelector((state) => state.product);
    const { filters } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [productCategories, setProductCategories] = useState(["All"]);
    useEffect(() => {
        let categories = new Set();
        products.forEach((item) => categories.add(item.category));
        categories = Array.from(categories);
        const { minPrice, maxPrice } = products.reduce(
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
        dispatch(filterActions.changeMaxPrice(maxPrice));
        dispatch(filterActions.changeMinPrice(minPrice));
        dispatch(filterActions.changeRating(0));
        // dispatch(filterActions.filteredProductsChanged(results));
      }, [dispatch, products]);

      const handleFilterChange = (filter, value) => {
        switch (filter) {
          case "category":
            dispatch(filterActions.changeCategory(value));
            break;
          case "minPrice":
            dispatch(filterActions.changeMinPrice(value));
            break;
          case "maxPrice":
            dispatch(filterActions.changeMaxPrice(value));
            break;
          case "rating":
            dispatch(filterActions.changeRating(value));
            break;
          default:
            break;
        }
      };
  return (
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
  )
}

export default Filters