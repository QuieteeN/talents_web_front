import { createSlice } from "@reduxjs/toolkit";


interface IModalState {
    visible: boolean;
}

const initialState: IModalState = {
    visible: false,
}

export const inviteModalSlice = createSlice({
    name: 'inviteModal',
    initialState,
    reducers: {
        visibleModal: (state: IModalState) => {
            state.visible = true;
        },
        unvisibleModal: (state: IModalState) => {
            state.visible = false;
        },
    }
});

// Action creators are generated for each case reducer function
export const { 
    visibleModal,
    unvisibleModal,
} = inviteModalSlice.actions

export default inviteModalSlice.reducer
