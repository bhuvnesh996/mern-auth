import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  centerDetail:null,
  status:null,
  selectedUniversity:null ,
  getSessionOnSelectUniversity:null,
  sessionLoading :false ,
  sessionError:null,
  getCourseOnSelectUniversity:null,
  courseLoading :false ,
  courseError:null
};
export const fetchCourseByUniversity = createAsyncThunk(
  'University/MyCourses',
  async(id)=>{
    const res =  await fetch (`/api/admin/university/courses/${id}`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      },
     
    })
    const data = await res.json()
    console.log("Dataatatata",data)
    return data
  })
    export const fetchSessionByUniversity = createAsyncThunk(
      'University/mySession',
      async(universityId)=>{
        const res =  await fetch (`/api/admin/session/university/all/${universityId}`,{
          method:"GET",
          headers:{
            'Content-Type':'application/json'
          },
         
        })

    const data = await res.json()
    console.log("Dataatatata",data)
    return data
  }
)
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
    selectWorkingUniversity :(state,action)=>{
      state.selectedUniversity = action.payload;
    },
    resetWorkingUniversity:(state) =>{
      state.selectedUniversity = null;
    }
  },
  extraReducers :(builder)=> {
    builder
    .addCase(fetchCenterDetailsFromUser.pending,(state)=>{
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
    .addCase(fetchSessionByUniversity.pending,(state)=>{
      state.sessionLoading= true
    })
    .addCase(fetchSessionByUniversity.fulfilled,(state,action)=>{
      state.sessionLoading = false
       state.getSessionOnSelectUniversity =action.payload
   })
    .addCase(fetchSessionByUniversity.rejected,(state,action)=>{
      state.sessionLoading = false
      state.sessionError =  action.payload.error
      console.log("rejecte why why why",action)
    })
    .addCase(fetchCourseByUniversity.pending,(state)=>{
      state.courseLoading = true;
    })
    .addCase(fetchCourseByUniversity.fulfilled,(state,action)=>{
       state.courseLoading =  false;
       state.getCourseOnSelectUniversity = action.payload;
    })
    .addCase(fetchCourseByUniversity.rejected,(state,action)=>{
      state.courseLoading = false;
      state.courseError =  action.payload.message;
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
  selectWorkingUniversity,
  resetWorkingUniversity,
} = userSlice.actions;

export default userSlice.reducer;
