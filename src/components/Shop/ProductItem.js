import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { title, price, description } = props;
  const cartLoader = useSelector((state) => state.cart.loading);
  const addToCartHandler = ({ title, price, description }) => {
    dispatch(cartActions.addItem({ title, price, description }));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button
            disabled={cartLoader}
            onClick={() => {
              addToCartHandler({
                title,
                price,
                description,
              });
            }}
          >
            Add to Cart
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
