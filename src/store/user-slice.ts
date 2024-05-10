import { createSlice } from "@reduxjs/toolkit";

  
  
const initialState : any = {
    username: '',
    chats: [],
  }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setChats : (state, action) => { 
        state.chats = action.payload;
      } , 
    },
  })

export const { setChats } = userSlice.actions;

export default userSlice.reducer;