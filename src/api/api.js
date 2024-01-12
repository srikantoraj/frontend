import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { configureStore } from '@reduxjs/toolkit';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://trytales.com/' }),
    endpoints: (builder) => ({
      loginUser: builder.mutation({
        query: (credentials) => ({
          url: 'signin/',
          method: 'POST',
          body: credentials,
        }),
      }),
      registerUser: builder.mutation({
        query: (credentials) => ({
          url: 'signup/',
          method: 'POST',
          body: credentials,
        }),
      }),
      homePageData: builder.query({  
        query: (token) => ({
            url: '',
            headers: {
              Authorization: `Token ${token}`,
            },
        }),
      }),
      reviewUser: builder.mutation({
        query: (credentials) => ({
          url: 'review/',
          method: 'POST',
          body: credentials,
          headers:{
            Authorization: `Token ${credentials.token}`,
          }
        }),
      }),


      // appendix
      addToBucket: builder.mutation({  
        query: (token) => ({
          url: `add_to_bucket/${token.username}/`,
          
          headers: {
            Authorization: `Token ${token.token}`,
          },
          
        }),
      }),
      removeFromBucket: builder.query({  
        query: (token) => ({
            url: `remove_from_bucket/${JSON.parse(token).username}/`,
            headers: {
              Authorization: `Token ${JSON.parse(token).token}`,
            },
        }),
      }),
    }),
  });
  
  export const { useLoginUserMutation,useRegisterUserMutation, useHomePageDataQuery, useAddToBucketMutation, useRemoveFromBucketQuery } = api;