"use client";

import { useEffect, useState } from "react";
import Styles from "./products.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  AddNewProducts,
  deleteProducts,
} from "../../lib/features/products/productsSlice";

export default function Products() {
  const dispatch = useDispatch();
  const productStatus = useSelector((state) => state.prod.status);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  return (
    <div className={Styles.main}>
      <SubmitProducts />
      <ShowProducts />
    </div>
  );
}

function SubmitProducts() {
  const [productForSubmit, setProductForSubmit] = useState({
    name: "",
    description: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setProductForSubmit({
      ...productForSubmit,
      [e.target.name]: e.target.value,
    });
  };

  function handleClick() {
    dispatch(AddNewProducts(productForSubmit));
    setProductForSubmit({ name: "", description: "" });
  }

  return (
    <>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={productForSubmit.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        description:
        <input
          type="text"
          name="description"
          value={productForSubmit.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit" onClick={handleClick}>
        Add Product
      </button>
    </>
  );
}

function ShowProducts() {
  const products = useSelector((state) => state.prod.products);
  return (
    <div>
      {products
        ? products.map((product) => (
            <RenderShowProducts product={product} key={product.id} />
          ))
        : console.log("undefined")}
    </div>
  );
}

function RenderShowProducts({ product }) {
  const dispatch = useDispatch();

  return (
    <>
      <ol>
        <li>{product.id}</li>
        <li>{product.name}</li>
        <li>{product.description}</li>
      </ol>
      <button
        type="submit"
        value="Delete"
        onClick={() => dispatch(deleteProducts(product.id))}
      >
        Delete product
      </button>
    </>
  );
}
