
import { createSlice } from "@reduxjs/toolkit";


interface Auth {
    token: string | null;
    success: boolean;
    error: any;
    loading: boolean;
  };
  
  
const initialState : Auth = {
    loading: false,
    token: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
  }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
  })

export default authSlice.reducer;