import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const cartLoading = useSelector((state) => state.cart.loading);
  const { title, quantity, total, price, description } = props.item;

  const addToCartHandler = ({ title, price, description }) => {
    dispatch(cartActions.addItem({ title, price, description }));
  };
  const removeFromCartHandler = (title) => {
    dispatch(cartActions.removeItem(title));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button
            disabled={cartLoading}
            onClick={() => {
              removeFromCartHandler(title);
            }}
          >
            -
          </button>
          <button
            disabled={cartLoading}
            onClick={() => {
              addToCartHandler({ title, price, description });
            }}
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
