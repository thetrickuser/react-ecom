import Product from "./Product";

const ProductList = ({ products }) => {
  return (
    <div>
      {products.map((item) => (
        <Product data={item} key={item.id} />
      ))}
    </div>
  );
};

export default ProductList;
