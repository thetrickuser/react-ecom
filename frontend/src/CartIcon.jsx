import {useSelector} from 'react-redux'

const CartIcon = () => {
    const {totalCost, totalItems} = useSelector(state => state.cart)
  return (
    <>
    {totalItems === 0 && <button>Cart</button>}
    {totalItems !== 0 && <button>${totalCost.toFixed(3)} | {totalItems} items</button>}
    </>
    
  )
}

export default CartIcon