import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import SearchResults from "./SearchResults";
import { fetchProducts } from "./store/productSlice";
//hi
function App() {
  const { loading, products, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && error && <div>Error: {error}</div>}
      {!loading && products.length && <SearchResults results={products} />}
    </>
  );
}

export default App;
