import { useEffect, useState } from "react";
import Filters from "./Filters";
import ProductList from "./ProductList";

const SearchResults = ({ results }) => {
  console.log(results);
  const [filters, setFilters] = useState([])

  useEffect(() => {
    results.forEach(item => {
        filters.push({})
    });
  },[results])
  return (
    <>
      <Filters />
      <ProductList products={results} />
    </>
  );
};

export default SearchResults;
