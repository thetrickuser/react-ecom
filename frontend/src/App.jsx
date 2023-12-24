import { useEffect, useState } from "react";
import "./App.css";
import SearchResults from "./SearchResults";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  return (
    <>
    <SearchResults results={products} />
    
    </>
  );
}

export default App;
