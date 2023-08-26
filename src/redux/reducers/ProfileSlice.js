import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: [],
  open: false, //for add account
  editOpen: false,
  enableEdit: true,
  editId: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    delId: (state, action) => {
      state.id = [];
      // console.log(action.payload);
      state.id += action.payload;
      // console.log(state.id);
    },
    setEId: (state, action) => {
      state.editId = [];
      state.editId += action.payload;
      console.log(action.payload);
    },
    handleDialog: (state, action) => {
      // console.log(action.payload);
      state.open = action.payload;
    },
    handleEditDialog: (state, action) => {
      // console.log("edit profile...");
      state.editOpen = action.payload;
      // console.log(state.editOpen);
    },
    enableEditBtm: (state, action) => {
      state.enableEdit = action.payload;
    },
  },
});

export const { delId, handleDialog, handleEditDialog, enableEditBtm, setEId } =
  profileSlice.actions;
export default profileSlice.reducer;
