"use client"
import { useEffect, useState } from 'react'
import Styles from "./products.module.css"
import axios from 'axios'



export default function  Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
    
  const submitProduct = (url, postdata) => {
    if (loading) return loading;
    if (error) console.log(error);
    console.log("it is working")
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
 
  



  return(
    <div className ={Styles.main}>
    {products ? products.map( (product) => {return (<ShowProducts product={product} key={product.id} />)}  ): console.log("undefined")}
    <SubmitProduct productToSubmit={submitProduct} />
  </div>  
  
  
    )
}




function ShowProducts ({product}){

return(
  <ol>
    <li>
      {product.id}
    </li>
    <li>
      {product.name}
    </li>
    <li>
      {product.description}
    </li>
    
  </ol>
  
)

}     


function SubmitProduct({productToSubmit}){

  const [product, setProduct] = useState([{name: "", description:""}])

  

  const handlechange = (e) => {
    setProduct({...product, [e.target.name]: e.target.value })
  };

  


return(
  <>
  <lable>
  name:
  < input type="text" name="name" value={product.name} onChange={handlechange} />

  </lable>
  <br />
  <lable>
  description:
  < input type="text" name="description" value={product.description} onChange={handlechange} />

  </lable>
  <br />
   <button type="submit" value="Add" onClick={() => productToSubmit("../api/products", product)}>submit product</button>

  </>

 
)

}