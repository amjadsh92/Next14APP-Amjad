import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "prod",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
        console.log("it is pending");
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(AddNewProducts.pending, (state, action) => {
        state.status = "loading";
        console.log("it is pending");
      })
      .addCase(AddNewProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
        console.log(action.payload);
      })
      .addCase(AddNewProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProducts.pending, (state, action) => {
        state.status = "loading";
        console.log("it is pending");
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        //state.products.filter((product) => product.id !== action.payload)
        state.products.splice(
          state.products.findIndex((arrow) => arrow.id === action.payload),
          1
        );
        console.log(action.payload);
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "prod/fetchProducts",
  async (thunkAPI) => {
    try {
      const res = await axios.get("../api/products");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const AddNewProducts = createAsyncThunk(
  "prod/AddNewProducts",
  async (productToSend, thunkAPI) => {
    try {
      const res = await axios.post("../api/products", productToSend);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "prod/deleteProducts",
  async (idOfProductToDelete, thunkAPI) => {
    try {
      const res = await axios.delete(
        "../api/products" + `/${idOfProductToDelete}`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const selectAllProducts = (state) => state.prod.products;

export const selectProductById = (state, productId) =>
  state.prod.products.find((product) => product.id === productId);

export const productsReducer = productsSlice.reducer;
