import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createStudentAsync = createAsyncThunk(
    'student/create',
    async (studentData, thunkAPI) => {
      try {
        // Make a POST request using fetch
        const response = await fetch('/api/admin/student/student/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentData),
        });
  
        // Check if the request was successful
        if (!response.ok) {
          // If not, throw an error with the status text
          throw new Error(`Failed to create student: ${response.statusText}`);
        }
  
        // Parse the response JSON
        const data = await response.json();
  
        // Return the response data
        return data;
      } catch (error) {
        // If an error occurs, throw it to be caught by the rejected action
        throw error;
      }
    }
);
export const fetchFreshApplicant = createAsyncThunk(
  'applicant/fresh',
  async()=>{
    const response = await fetch('/api/admin/student/student/fresh/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
     // Check if the request was successful
     if (!response.ok) {
      // If not, throw an error with the status text
      throw new Error(`Failed to create student: ${response.statusText}`);
    }

    // Parse the response JSON
    const data = await response.json();

    // Return the response data
    return data;
  }
)
export const fetchstudent = createAsyncThunk(
  'applicant/fetchstudent',
  async()=>{
    const response = await fetch('/api/admin/student/student/fresh/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
     // Check if the request was successful
     if (!response.ok) {
      // If not, throw an error with the status text
      throw new Error(`Failed to create student: ${response.statusText}`);
    }

    // Parse the response JSON
    const data = await response.json();

    // Return the response data
    return data;
  }
)
export const changeDocStatus = createAsyncThunk(
  "applicant/changeDocStatus",
  async(data)=>{
    console.log("fsafasfasfsafas",data)
      const response = await fetch (`/api/admin/student/student/docstatus/${data.id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(data.raw),
      })
      const rawData = await response.json()
      return rawData
      }
)
export const applicationStatus = createAsyncThunk(
  "applicant/applicationStatus",
  async(data)=>{
    console.log("fsafasfasfsafas",data)
      const response = await fetch (`/api/admin/student/student/applicationstatus/${data.id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(data.raw),
      })
      const rawData = await response.json()
      return rawData
      }
)

const initialState = {

    student :null,
    loading:false,
    error:null,
    studentFresh:null,
    freshLoading:false,
    freshError:null,
    createdStudent: null,
    createLoading: false,
    createError: null,
    createStatus:false,
    updateLoading:null,
    updateError:null,
    updateStatus:false,
    applicationStatusLoading:false,
    applicationStatusError:null,
  

};

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
      restCreateStatus:(state)=>{
        state.createStatus = false
      }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createStudentAsync.pending, (state, action) => {
                state.createLoading = true;
                state.createError = null;
                state.createStatus=false;
            })
            .addCase(createStudentAsync.fulfilled, (state, action) => {
                state.createLoading = false;
                state.createdStudent = action.payload;
                state.createStatus = true;
            })
            .addCase(createStudentAsync.rejected, (state, action) => {
                state.createLoading = false;
                state.createError = action.error.message;
                state.createStatus = false;
            })
            .addCase(fetchFreshApplicant.pending,(state)=>{
                state.freshLoading = false;
            })
            .addCase(fetchFreshApplicant.fulfilled,(state,action)=>{
                state.freshLoading = true;
                state.studentFresh = action.payload;
            })
            .addCase(fetchFreshApplicant.rejected,(state,action)=>{
                state.freshLoading =  false;
                state.freshError =action.payload;
            })
            .addCase(fetchstudent.pending,(state)=>{
                state.loading = false;
            })
            .addCase(fetchstudent.fulfilled,(state,action)=>{
                state.loading =  true;
                state.student = action.payload;
            })
            .addCase(fetchstudent.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(changeDocStatus.pending,(state)=>{
              state.updateLoading = true;
              state.updateStatus = false;
            })
            .addCase(changeDocStatus.fulfilled,(state,action)=>{
              state.updateLoading = false;
              state.updateStatus = true;
              console.log("fullfipled",action.payload)
              const index = state.student.findIndex(student => student._id === action.payload._id);
              if (index !== -1) {
                state.student[index] = action.payload;
              }
            
            })
            .addCase(changeDocStatus.rejected,(state,action)=>{
              state.updateLoading =  false;
              state.updateStatus =  false;
              state.updateError = action.payload;
            })
            .addCase(applicationStatus.pending,(state)=>{
              state.applicationStatusLoading = true;
            })
            .addCase(applicationStatus.fulfilled,(state,action)=>{
              state.applicationStatusLoading = false;
              const index = state.student.findIndex(student => student._id === action.payload._id);
              if (index !== -1) {
                state.student[index] = action.payload;
              }
            })
            .addCase(applicationStatus.rejected,(state,actin)=>{
              state.applicationStatusLoading = false;
              state.applicationStatusError = action.payload
            })
    }
});

export const {
  restCreateStatus
} = studentSlice.actions;

export default studentSlice.reducer;
