/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

import styles from "./style.module.css";
import Pagination from "./Pagination";
import config from "../utils/config";

export default function Products({ meta, products, afterAddToCart }) {
  const { total, limit, page, skip, totalPage } = meta;

  return (
    <section className="product" id="product">
      <h1 className="heading">
        latest <span>products</span>
      </h1>
      <div className="box-container mb-5">
        {products.map((product, i) => (
          <Product key={i} {...{ product, afterAddToCart }} />
        ))}
      </div>
      <Pagination {...{ total, limit, page, skip, totalPage }} />
    </section>
  );
}

function Product({ product, afterAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    setLoading(true);
    await axios.post(`${config.server}/api/cart/add`, {
      quantity,
      id: product._id,
    });

    setLoading(false);
    return afterAddToCart();
  };

  return (
    <div className="box">
      <span className="discount">
        {Math.floor((product.original_price / product.price) * 100)}%
      </span>

      <div className="icons">
        <a className="fas fa-heart" onClick={addToCart} />
        <a
          target="_blank"
          href={`https://www.facebook.com/sharer/sharer.php?u=${config.server}/products/${product._id}`}
          className="fb-xfbml-parse-ignore fas fa-share"
          rel="noreferrer"
        />
        <Link href={`/products/${product._id}`}>
          <a href="#" className="fas fa-eye" />
        </Link>
      </div>

      <img src={product.image} alt={product.title} />
      <Link href={`/products/${product._id}`}>
        <h4 style={{ marginTop: 5, cursor: "pointer" }}>
          {product.title?.length > 35
            ? product.title.slice(0, 35) + "..."
            : product.title}
        </h4>
      </Link>

      {/* <ReviewStars /> */}
      <div className="price">
        ${product.price} <span>${product.original_price}</span>
      </div>

      <div className="quantity">
        <span>quantity : </span>
        <input
          type="number"
          min={1}
          max={1000}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ textAlign: "center" }}
        />
      </div>

      <button className={styles.btn} onClick={addToCart} disabled={loading}>
        <i
          className={`fa ${
            loading ? "fa-spinner fa-spin" : "fa-shopping-cart"
          }`}
        />{" "}
        Add to cart
      </button>
    </div>
  );
}
