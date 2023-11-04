import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        me: {},

    },
    reducer
})