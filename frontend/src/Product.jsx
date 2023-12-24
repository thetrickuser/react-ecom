import styles from "./Product.module.css";

const Product = ({ data }) => {
  return (
    <>
      <div className={styles.product}>
        <img className={styles.image} src={data.image} alt={data.title} />
        <div className={styles.details}>
          <div className={styles.title}>{data.title}</div>
          {/* <div className={styles.description}>{data.description}</div> */}
          <div className={styles.rating}>Rating: {data.rating.rate}⭐</div>
          <div className={styles.price}>${data.price}</div>
        </div>
      </div>
    </>
  );
};

export default Product;
