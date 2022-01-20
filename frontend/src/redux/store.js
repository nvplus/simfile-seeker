import { configureStore } from "@reduxjs/toolkit";
import login from "./user";

export default configureStore({
    reducer: {
        login
    }
});