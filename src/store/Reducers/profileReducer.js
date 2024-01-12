import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token:'',
  user: {},
  anonymous_reviews:[],
  connect_reviews:[],
  chatUser:""
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    userToken: (state,action) => {
        state.token = action.payload;
    },
    user: (state,action) => {
        state.user = action.payload;
    },
    anonymous_reviews: (state, action) => {
      state.anonymous_reviews = action.payload
    },
    connect_reviews: (state, action) => {
      state.connect_reviews = action.payload
    },
    userChatHandler:(state,action)=>{
      state.chatUser=action.payload
    }
  },
})


export const { userToken, user, anonymous_reviews, connect_reviews, userChatHandler } = profileSlice.actions

export default profileSlice.reducer 