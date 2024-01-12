import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
 const authReducer = createSlice({
  name: 'auth',
  initialState:{
    token:''
  },
  reducers: {
   
  },
  extraReducers:(builder)=>{

  }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default authReducer.reducer