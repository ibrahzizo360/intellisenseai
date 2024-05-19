import { createSlice } from "@reduxjs/toolkit";

const initialState : any = {
    session_id: '',
    name: '',
    messages: [],
  }

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
      setMessages: (state, action) => {
        return {
            ...state,
            messages: action.payload
        };
    },
    },
  })

export const { setMessages } = sessionSlice.actions;

export default sessionSlice.reducer;