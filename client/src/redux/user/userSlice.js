import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  centerDetail:null,
  status:null
};
export const fetchCenterDetailsFromUser = createAsyncThunk(
  'User/fetchCenterDetail',
  async (id) =>{
    const res =  await fetch(`/api/user/fetchCenter/${id}`,{
      method:'GET',
      headers: {
          'Content-Type':'application/json'
      },
      
    })
    const rawdata = await res.json()
    console.log("fetch my data",rawdata)
    return rawdata
  }
  
)


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },extraReducers :(builder)=> {
    builder.addCase(fetchCenterDetailsFromUser.pending,(state)=>{
        state.status = "Loading"
    })
    .addCase(fetchCenterDetailsFromUser.fulfilled,(state,action)=>{
        state.status ="Success"
        state.centerDetail = action.payload
    })
    .addCase(fetchCenterDetailsFromUser.rejected,(state,action)=>{
      state.status = "Error",
      console.log("why my data is not showing",action)
      state.error =  action.payload
    })
  }
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
} = userSlice.actions;

export default userSlice.reducer;
