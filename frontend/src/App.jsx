import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import SearchResults from "./SearchResults";
import { fetchProducts } from "./store/productSlice";
//hi
function App() {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      {product.loading && <div>Loading...</div>}
      {!product.loading && product.error && <div>Error: {product.error}</div>}
      {!product.loading && product.products.length && (
        <SearchResults results={product.products} />
      )}
    </>
  );
}

export default App;
