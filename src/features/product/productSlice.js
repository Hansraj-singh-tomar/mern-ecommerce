import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsByFilters, fetchCategories, fetchBrands } from "./productAPI";

const initialState = {
    status: 'idle',
    products: [],
    categories: [],
    brands: [],
}

// export const getAllProductsAsync = createAsyncThunk("product/fetchAllProducts", async () => {
//     const products = await fetchAllProducts();
//     return products.data;
// });

export const getAllFilterProductsAsync = createAsyncThunk("product/fetchProductsByFilters", async (filter, pagination) => {
    const products = await fetchProductsByFilters(filter, pagination);
    return products.data;
});

export const getAllCategoriesAsync = createAsyncThunk("product/fetchCategories", async () => {
    const categories = await fetchCategories();
    return categories.data;
})

export const getAllBrandsAsync = createAsyncThunk("products/fetchBrands", async () => {
    const brands = await fetchBrands();
    return brands.data;
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // filter products
            .addCase(getAllFilterProductsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllFilterProductsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })

            // categories
            .addCase(getAllCategoriesAsync.pending, (state) => {
                state.status = 'loading '
            })
            .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
                state.status = 'loading ';
                state.categories = action.payload;
            })

            // brands 
            .addCase(getAllBrandsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllBrandsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.brands = action.payload;
            })
    },
});


export default productSlice.reducer;
