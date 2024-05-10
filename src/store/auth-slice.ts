import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";


interface Auth {
    userInfo: User | null | {};
    userToken: string | null;
    success: boolean;
    error: any;
    loading: boolean;
  };
  
  
const initialState : Auth = {
    loading: false,
    userInfo: {}, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
  }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
  })

export default authSlice.reducer;