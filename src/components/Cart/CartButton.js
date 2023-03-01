import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import classes from "./CartButton.module.css";

const CartButton = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) ?? [];
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(cartActions.toggleCart());
  };

  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItems.length ?? 0}</span>
    </button>
  );
};

export default CartButton;
