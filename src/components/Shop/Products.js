import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";

import classes from "./Products.module.css";

const Products = () => {
  const products = useSelector((state) => state.product.products) ?? [];

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map(({ title, price, description }) => {
          return (
            <ProductItem
              key={title + "-" + price + "-list"}
              title={title}
              price={price}
              description={description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
