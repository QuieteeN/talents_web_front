import { createSlice } from "@reduxjs/toolkit";


interface IModalState {
    visible: boolean;
}

const initialState: IModalState = {
    visible: false,
}

export const responseModalSlice = createSlice({
    name: 'responseModal',
    initialState,
    reducers: {
        visibleResponseModal: (state: IModalState) => {
            state.visible = true;
        },
        unvisibleResponseModal: (state: IModalState) => {
            state.visible = false;
        },
    }
});

// Action creators are generated for each case reducer function
export const { 
    visibleResponseModal,
    unvisibleResponseModal,
} = responseModalSlice.actions

export default responseModalSlice.reducer
