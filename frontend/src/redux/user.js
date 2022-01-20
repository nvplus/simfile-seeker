import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false
    },
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        }
    }
});

export const { login } = userSlice.actions;
export default userSlice.reducer;