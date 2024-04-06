import  { configureStore }  from '@reduxjs/toolkit'  
import {productsReducer} from './features/products/productsSlice'


const store =  configureStore({reducer:
    { prod: productsReducer }})  
  
console.log(store.getState())  


export default store;