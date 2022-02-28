import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        loggedIn: false
    },
    reducers: {
        login: (state, action) => {
            console.log(action.payload)
            let payload = action.payload;

            if (payload.auth) {
                state.loggedIn = true;
                state.user = payload.user;
            }
        },
        logout: (state) => {
            state.loggedIn = false;
            state.user = {username: ""};
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;