
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  allAdminJobs: [],
  singleJob: null,
  allAppliedJobs: [],
};

const jobSlice = createSlice({
  name: "job",

  initialState,

  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },

    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },

    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },

    clearJobs: (state) => {
      state.allJobs = [];
    },

    clearSingleJob: (state) => {
      state.singleJob = null;
    },

    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setAllAdminJobs,
  setSingleJob,
  clearJobs,
  clearSingleJob,
  setAllAppliedJobs,
} = jobslice.actions;

export default jobSlice.reducer;

