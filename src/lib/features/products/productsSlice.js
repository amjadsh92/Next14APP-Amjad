
import  { createSlice, nanoid, createAsyncThunk  }  from  '@reduxjs/toolkit'  

import axios from "axios";

const initialState =  {  
products:  [],  
status:  'idle',  
error:  null  
}  
  
const productsSlice =  createSlice({  
name:  'prod',  
initialState,  
reducers:  {  
productAdded:  {  
reducer(state, action)  {  
state.products.push(action.payload)  
},  
prepare(name, description)  {  
    return  {  
        payload:  {  
        id:  nanoid(),  
        name,  
        description  
        }  
        }  
}  
}
},  

extraReducers(builder)  {  
    builder  
    .addCase(fetchProducts.pending,  (state, action)  =>  {  
    state.status  =  'loading'  
    console.log('it is pending')
    })  
    .addCase(fetchProducts.fulfilled,  (state, action)  =>  {  
    state.status  =  'succeeded'  
    // Add any fetched posts to the array  
    state.products = action.payload
    console.log(action.payload)  
    })  
    .addCase(fetchProducts.rejected,  (state, action)  =>  {  
    state.status  =  'failed'  
    state.error  = action.error.message  
    })  
    }      
    

 
})  
  

export const fetchProducts = createAsyncThunk('prod/fetchProducts', async (thunkAPI) => {
    try {
      const res = await axios.get('../api/products')
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  })

export  const  selectAllProducts =  state  => {state.prod.products
    console.log('products=',state.prod.products)
    console.log('status=',state.prod.status)}  
      
export  const  selectProductById  =  (state, productId)  =>  
state.prod.products.find(product  => product.id  === productId)


export  const  { productAdded }  = productsSlice.actions  

export const productsReducer =  productsSlice.reducer  

    
