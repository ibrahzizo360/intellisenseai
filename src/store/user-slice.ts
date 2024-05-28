import { createSlice } from "@reduxjs/toolkit";

const initialState : any = {
    username: '',
    sessions: [],
  }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setSessions : (state, action) => { 
        state.sessions = action.payload;
      }, 
    },
  })

export const { setSessions } = userSlice.actions;

export default userSlice.reducer;