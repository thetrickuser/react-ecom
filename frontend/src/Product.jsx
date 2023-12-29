import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import PropTypes from 'prop-types'

const Product = ({ data }) => {
  return (
    <Link to={`/products/${data.id}`}>
      <div className={styles.product}>
        <img className={styles.image} src={data.image} alt={data.title} />
        <div className={styles.details}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.rating}>Rating: {data.rating.rate}⭐</div>
          <div className={styles.price}>${data.price}</div>
        </div>
      </div>
    </Link>
  );
};

Product.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
    }).isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
