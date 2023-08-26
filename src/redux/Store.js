import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducers/ProfileSlice";

export default configureStore({
  reducer: {
    profile: profileReducer,
  },
});
