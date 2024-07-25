import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export enum ModalTypes {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
    DEFAULT = "default"
}

interface IModalState {
    type: ModalTypes;
    message: string;
    visible: boolean;
}

const initialState: IModalState = {
    type: ModalTypes.WARNING,
    message: "Инофрмация",
    visible: false,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        changeInfo: (state: IModalState, action: PayloadAction<{type: ModalTypes, message: string}>) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
            state.visible = true;
        },
        endAnimation: (state: IModalState) => {
            state.visible = false;
        },
    }
});

// Action creators are generated for each case reducer function
export const { 
    changeInfo,
    endAnimation,
} = modalSlice.actions

export default modalSlice.reducer
