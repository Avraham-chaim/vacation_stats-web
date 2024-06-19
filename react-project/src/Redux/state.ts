import { configureStore, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./reducers";
import { UserModel } from "../Models/UserModel";


// application global state:
export type AppState = {
    user: UserModel;
};

// user slice:
const userSlice = createSlice({
    name: "user", // internal use of redux
    initialState: null, // the initial state
    reducers: { login, logout } // all reducers related to user
});


// export reducer list:
export const userActions = userSlice.actions;

// store:
export const store = configureStore<AppState>({
    reducer: {
        user: userSlice.reducer
    }
});


