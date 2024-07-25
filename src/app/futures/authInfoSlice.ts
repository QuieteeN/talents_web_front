import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum UserTypes {
    VISITOR = "visitor",
    STUDENT = "student",
    EMPLOYER = "employer",
}

interface IUserState {
    type: UserTypes;
    isAuth: boolean;
}

const initialState: IUserState = {
    type: Object.values(UserTypes).find((type: any) => type === localStorage.getItem('type')) || UserTypes.VISITOR,
    isAuth: localStorage.getItem('type') !== UserTypes.VISITOR,
}

export const authInfoSlice = createSlice({
    name: 'authInfo',
    initialState,
    reducers: {
        authInfo: (state: IUserState, action: PayloadAction<{type: UserTypes}>) => {
            state.type = action.payload.type;
            localStorage.setItem('type', action.payload.type);
            state.isAuth = true;
        },
        afterLogOut: (state: IUserState) => {
            localStorage.setItem('type', UserTypes.VISITOR)
            state.type = UserTypes.VISITOR;
            state.isAuth = false;
        },
    }
});

// Action creators are generated for each case reducer function
export const { 
    authInfo,
    afterLogOut,
} = authInfoSlice.actions

export default authInfoSlice.reducer
