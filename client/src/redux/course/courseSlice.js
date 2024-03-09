import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import build from 'react-pincode';

export const fetchCourse = createAsyncThunk(
    'Course/fetchCourse',
    async(page)=>{
        const res= await fetch(`/api/admin/university/course/all?page=${page}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            
          });
          const data= await res.json()
          return data

    }
)
export const CreateCourse = createAsyncThunk(
    'Course/CreateCourse',
    async(data)=>{
        const res= await fetch('/api/admin/university/course/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            
          });
          const rawdata= await res.json()
          return rawdata

    }
)
export const DeleteCourse = createAsyncThunk(
    'Course/DeleteCourse',
    async(id)=>{
        const res = await fetch(`/api/admin/university/course/delete/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data =await res.json()
        return  data
    }
)
const initialState = {
    Course: [],
    loading: false,
    error: false,
    createLoading:false,
    createError:null,
    createStatus:"",
    deleteLoading:false,
    deleteError:null,


 
  };

  const CourseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCourse.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(fetchCourse.fulfilled, (state, action) => {
            state.loading = false;
            state.Course = action.payload;
        })
        .addCase(fetchCourse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(CreateCourse.pending,(state)=>{
            state.createLoading = true;
        })
        .addCase(CreateCourse.fulfilled,(state,action)=>{
            state.createLoading =  false;
            console.log("my action",action)
            // Check if Course state already contains data and if it's an array
            if (Array.isArray(state.Course)) {
                // Append the new data to the existing array
                state.Course.push(action.payload);
                state.createStatus = action.meta.requestStatus
            } else {
                // Create a new array with the new data
                state.Course = [action.payload];
            }
        })
        .addCase(CreateCourse.rejected,(state,action)=>{
            state.createLoading = false;
            state.createError =  action.payload;
        })
        .addCase(DeleteCourse.pending,(state)=>{
            state.deleteLoading = true
        })
        .addCase(DeleteCourse.fulfilled,(state,action)=>{
            state.deleteLoading = true;
            console.log("delete course",action.payload.deletedCourseId)
            state.Course = state.Course.filter(course => course._id !== action.payload.deletedCourseId);
        })
        .addCase(DeleteCourse.rejected,(state,action)=>{
            state.deleteLoading = false;
            console.log("delete course",action)
        })
    }
   })

   export default CourseSlice.reducer;