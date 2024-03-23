"use client";
import { useEffect, useState } from "react";
import Styles from "./products.module.css";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitProduct = (url, postdata) => {
    if (loading) return loading;
    if (error) console.log(error);
    console.log("it is working");
    axios
      .post(url, postdata)
      .then((response) => {
        console.log("This has been posted", response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log(false);
      });
  };

  const deleteProduct = (url, id) => {
    if (loading) return loading;
    if (error) console.log(error);

    axios
      .delete(url + `/${id}`)
      .then((response) => {
        console.log("This user has been deleted", response.data);
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("../api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={Styles.main}>
      <SubmitProducts productToSubmit={submitProduct} />
      <ShowProducts products={products} productToDelete={deleteProduct} />
    </div>
  );
}

function ShowProducts({ products, productToDelete }) {
  return (
    <div>
      {products
        ? products.map((product) => (
            <RenderShowProducts
              product={product}
              productToDelete={productToDelete}
              key={product.id}
            />
          ))
        : console.log("undefined")}
    </div>
  );
}

function RenderShowProducts({ product, productToDelete }) {
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
        onClick={() => productToDelete("../api/products", product.id)}
      >
        Delete product
      </button>
    </>
  );
}

function SubmitProducts({ productToSubmit }) {
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  const product = { name: name, description: des };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleDescription = (event) => {
    setDes(event.target.value);
  };

  function handleClick(url) {
    productToSubmit(url, product);
    setName("");
    setDes("");
  }

  return (
    <>
      <lable>
        name:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleName}
        />
      </lable>
      <br />
      <lable>
        description:
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleDescription}
        />
      </lable>
      <br />
      <button
        type="submit"
        value="Add"
        onClick={() => handleClick("../api/products")}
      >
        submit product
      </button>
    </>
  );
}
