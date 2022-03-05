import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../components/Layout";
import Home from "../components/Home";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";

import config from "../utils/config";
import useCart from "../hooks/useCart";
import useTranslation from "../locales/useTranslation";
import { noSSRWithLoadingDynamic } from "../utils/dynamic.import";
// const Home = noSSRWithLoadingDynamic('../components/Banner')

export default function Index({ meta, products, setting }) {
  const { t } = useTranslation();
  console.log(`config`, config);

  const [cart, getCart] = useCart();

  return (
    <Layout {...{ cart }}>
      <ToastContainer />
      <Home {...{ setting }} />
      <h1 className="heading">
        {t("label.shopBy")} <span>{t("label.category")}</span>
      </h1>
      <Category {...{ setting }} />
      <Products {...{ meta, products, after: () => {
        getCart();
        toast("Added to cart", { position: "bottom-right" });
      } }} />
      {/* <Banner {...{ setting }} /> */}
      <Newsletter />
    </Layout>
  );
}
