"use client";

import { useEffect, useState } from "react";
import Styles from "./products.module.css";
import axios from "axios";
import  { useSelector, useDispatch }  from  'react-redux'  
import  { selectAllProducts, fetchProducts } from '../../lib/features/products/productsSlice'  


export default function Products() {
  

  const dispatch =  useDispatch()  
	const productStatus =  useSelector(state  => state.prod.status)  
	useEffect(()  =>  {  
	if  (productStatus ===  'idle')  {  
	dispatch(fetchProducts())  
	}  
	},  [productStatus, dispatch])  
  
  const products =  useSelector(selectAllProducts()) 
  
 console.log('productsclient', products)
  

  return (
    <div className={Styles.main}>
    
      <ShowProducts products={products} />
     
    </div>
  );
}

function ShowProducts({ products }) {
  return (
    <div>
      {products
        ? products.map((product) => (
            <RenderShowProducts
              product={product}
              
              key={product.id}
            />
          ))
        : console.log("undefined")}
    </div>
  );
}

function RenderShowProducts({ product}) {
  return (
    <>
      <ol>
        <li>{product.id}</li>
        <li>{product.name}</li>
        <li>{product.description}</li>
      </ol>
      
    </>
  );
}

