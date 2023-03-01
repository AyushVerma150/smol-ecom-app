import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { cartActions, fetchCartData, storeCartData } from "./store/cart";

let initialLoad = true;

function App() {
  const dispatch = useDispatch();
  const cartChanged = useSelector((state) => state.cart.changed);
  const notification = useSelector((state) => state.cart.notification);
  const displayCart = useSelector((state) => state.cart.toggleCart) ?? true;
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    // Store the cart!
    if (initialLoad) {
      initialLoad = false;
      return;
    }

    if (cartChanged) dispatch(storeCartData(cartItems));
  }, [cartItems, dispatch, cartChanged]);

  useEffect(() => {
    if (
      notification &&
      (notification.status === "error" || notification.status === "success")
    ) {
      setTimeout(() => {
        dispatch(cartActions.resetNotification());
      }, 3000);
    }
  }, [notification, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      )}
      <Layout>
        {displayCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
