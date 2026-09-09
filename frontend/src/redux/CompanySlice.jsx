import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleCompany: null,
  company: [],
};

const companySlice = createSlice({
  name: "company",
  initialState,

  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },

    setAllCompany: (state, action) => {
      state.company = action.payload;
    },

    clearSingleCompany: (state) => {
      state.singleCompany = null;
    },

    clearCompany: (state) => {
      state.company = [];
    },
  },
});

export const {
  setSingleCompany,
  setAllCompany,
  clearSingleCompany,
  clearCompany,
} = companySlice.actions;

export default companySlice.reducer;