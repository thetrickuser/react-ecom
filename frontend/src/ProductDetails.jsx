import { useEffect, useState } from "react";
import styles from "./Product.module.css";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        console.log(json);
        setData(json);
      })
      .catch((err) => {
        setLoading(false)
        setError(err.message)});
  }, [productId]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && data && (
        <div className={styles.product}>
          <img className={styles.image} src={data.image} alt={data.title} />
          <div className={styles.details}>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.rating}>Rating: {data.rating.rate}⭐</div>
            <div className={styles.price}>${data.price}</div>
          </div>
        </div>
      )}
      {!loading && error != "" && <div>Error: {error}</div>}
    </>
  );
};

export default ProductDetails;
