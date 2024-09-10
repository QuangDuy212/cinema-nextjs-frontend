import { createSlice } from "@reduxjs/toolkit";

interface IState {
    nameFilm: string;
    show: string;
    time: string;
    seats: string[];
    zoomNumber: number;
    quantity: number;
    total: number;
    showId: number;
}

const initialState: IState = {
    nameFilm: "",
    show: "",
    time: "",
    seats: [],
    zoomNumber: 0,
    quantity: 0,
    total: 0,
    showId: 0,
};


export const billSlide = createSlice({
    name: 'bill',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setBill: (state, action) => {
            state.nameFilm = action.payload?.nameFilm,
                state.show = action.payload?.show,
                state.time = action.payload?.time,
                state.seats = action.payload?.seats,
                state.zoomNumber = action.payload?.zoomNumber,
                state.quantity = action.payload?.quantity,
                state.total = action.payload?.total,
                state.showId = action.payload?.showId;
        },
        setEmptyBill: (state) => {
            state.nameFilm = "",
                state.show = "",
                state.time = "",
                state.seats = [],
                state.zoomNumber = 0,
                state.quantity = 0,
                state.total = 0,
                state.showId = 0
        }
    },
    extraReducers: (builder) => {

    },

});

export const {
    setBill, setEmptyBill
} = billSlide.actions;

export default billSlide.reducer;