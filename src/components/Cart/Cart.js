import Card from "../UI/Card";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) ?? [];
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.length > 0 &&
          cartItems.map(({ title, quantity, total, price }) => {
            return (
              <CartItem
                key={title + "-" + price + "-cart"}
                item={{ title, quantity, total, price }}
              />
            );
          })}
        {cartItems.length === 0 && <p>Cart is empty!</p>}
      </ul>
    </Card>
  );
};

export default Cart;
