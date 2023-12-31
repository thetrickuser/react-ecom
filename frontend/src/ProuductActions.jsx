import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "./store/cartSlice";
import { useState, useEffect } from "react";

const ProuductActions = ({productData}) => {
  const [productCount, setProductCount] = useState(0);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  useEffect(() => {
    setProductCount(items.filter((item) => item.id === Number(productData.id)).length);
  },[items,productData])
  const handleAddItem = (item) => {
    dispatch(cartActions.addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(cartActions.removeItem(item));
  };
  return (
    <>
    {productCount === 0 && (
        <button
          onClick={() => {
            handleAddItem(productData);
          }}
        >
          Add to Cart
        </button>
      )}
      {productCount !== 0 && (
        <>
          <button
            onClick={() => {
              handleRemoveItem(productData);
            }}
          >
            -
          </button>
          {productCount}
          <button
            onClick={() => {
              handleAddItem(productData);
            }}
          >
            +
          </button>
        </>
      )}
      </>
  )
}

export default ProuductActions