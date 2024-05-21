import { createSlice } from "@reduxjs/toolkit";

const initialState : any = {
    session_id: '',
    name: '',
    messages: [],
    new: false,
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
    setNewSession: (state, action) => {
      return {
          ...state,
          new: action.payload
      };
  },
    },
  })

export const { setMessages,setNewSession } = sessionSlice.actions;

export default sessionSlice.reducer;