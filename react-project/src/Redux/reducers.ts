// func for performing changes on the slice data:

import { PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";


// login for save the user in the global state:
export function login(currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    const newState = action.payload; // here the payload is the new user logged-in.
    return newState;
}

// logout for delete the user from the global state:
export function logout(currentState: UserModel, action: PayloadAction): UserModel {
    return null;
}

