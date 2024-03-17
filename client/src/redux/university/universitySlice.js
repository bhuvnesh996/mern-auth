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
          console.log("my all University",data)
          return data
    }
  )

  export const deletMyUniversity = createAsyncThunk(
    'University/delete',
    async (selectedUniversityId)=>{
      const res= await fetch(`/api/admin/university/delete/${selectedUniversityId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
      const data = await res.json()
      console.log("my all University",data)
      return data
    }
  )


const initialState = {
    University: null,
    loading: false,
    error: false,
    deleteError :null,
    deleteLoading: false,

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
            console.log("delete Success",action.payload)
            state.University =  action.payload
        },deleteUniversityFail:(state,action)=>{
            state.loading=false,
            state.error = action.payload
            
        }

    },extraReducers:(builder)=>{
        builder.addCase(getAllUniversity.pending, (state) => {
            state.loading = true
          })
        .addCase(getAllUniversity.fulfilled,(state,action)=>{
            state.loading = false
            console.log("action",action)
            console.log("action payload ",action.payload)
            state.University = action.payload
            // state.University = state.University?.filter(uni => uni._id !== action.payload);
           
        })
        .addCase(getAllUniversity.rejected,(state,action)=>{
            state.loading = false 
            state.error = action.payload
        })
        .addCase(deletMyUniversity.pending,(state)=>{
            state.deleteLoading = true;
        })
        .addCase(deletMyUniversity.fulfilled,(state,action)=>{
          state.deleteLoading =  false
          console.log("check state",action.payload)
          state.University = state.University?.filter(uni => uni._id !== action.payload);
        })
        .addCase(deletMyUniversity,(state,action)=>{
            state.deleteError = action.error.message;
            state.deleteLoading = false
        })
    },
  })

  export const {
    fetchUniversityFail,fetchUniversityStart,fetchUniversitySuccess,deleteUniversityStart,deleteUniversitySuccess,deleteUniversityFail
  } = universitySlice.actions;

  export default universitySlice.reducer;