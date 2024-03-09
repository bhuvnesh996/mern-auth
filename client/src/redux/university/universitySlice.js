import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';



export const getAllUniversity = createAsyncThunk(
    'University/fetchAll',
    async () => {
        console.log("it's started")
        const res= await fetch('/api/admin/university/all', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            
          });
          const data = await res.json()
          return data
    }
  )


const initialState = {
    University: null,
    loading: false,
    error: false,
  };

  const universitySlice = createSlice({
    name: 'university',
    initialState,
    reducers:{
        deleteUniversityStart:(state) =>{
            state.loading = true
            
        },deleteUniversitySuccess:(state,action) =>{
            state.loading = false , 
            state.error = false,
            state.University =  action.payload
        },deleteUniversityFail:(state,action)=>{
            state.loading=false,
            state.error = action.payload
            
        }

    },extraReducers:(builder)=>{
        builder.addCase(getAllUniversity.pending, (state) => {
            state.loading = true
          })
        builder.addCase(getAllUniversity.fulfilled,(state,action)=>{
            state.loading = false
            console.log("action",action)
            console.log("action payload ",action.payload)
            state.University = action.payload
        })
        builder.addCase(getAllUniversity.rejected,(state,action)=>{
            state.loading = false 
            state.error = action.payload
        })
    },
  })

  export const {
    fetchUniversityFail,fetchUniversityStart,fetchUniversitySuccess,deleteUniversityStart,deleteUniversitySuccess,deleteUniversityFail
  } = universitySlice.actions;

  export default universitySlice.reducer;