import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

// const baseAPIURL = "http://localhost:3000/"

const initialState = {
  sort: 'newest',
  allReviews: [],
  reviews: [],
  ratings: '',
  recommended: '',
  characteristics: {}
};

export const getReviews = createAsyncThunk('/reviews', async({id, sort},  thunkAPI) => {
  return axios.get(`/reviews`, {
    params: {
      page: 1,
      count: 200,
      sort: sort,
      product_id: id
    }
  }).then((res) => {
    // console.log('The review get request worked:', res.data.results);
    return res.data.results;
  }).catch((err) => {
    console.log('Error when getting Reviews', err);
  })
})

export const getMetaData = createAsyncThunk('/reviews/meta', async(id, thunkAPI) => {
  return axios.get(`/reviews/meta`, {
    params: {
      product_id: id
    }
  }).then((res) => {
    // console.log(res.data);
    return res.data;
  }).catch((err) => {
    console.log(err);
  })
})


export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    updateReviews: (state, action) => {
      state.reviews = action.payload;
    },
    updateSort: (state, action) => {
      // console.log('state=>', state.sort)
      state.sort = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviews = action.payload.slice(0, 2);
        state.allReviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getMetaData.fulfilled, (state, action) => {
        state.ratings = action.payload.ratings;
        state.recommended = action.payload.recommended;
        state.characteristics = action.payload.characteristics;
      })
      .addCase(getMetaData.rejected, (state, action) => {
        console.log(action.payload);
      })
  }
})

export const reducers = reviewSlice.actions;