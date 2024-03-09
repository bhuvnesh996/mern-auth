import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import { CreateCourse } from '../course/courseSlice';


export const  createCenter = createAsyncThunk(
    'Center/createCenter',
    async (data)=>{
        const res= await fetch('/api/admin/university/center/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                centerData: {
                    zipCode: data.zipCode,
                    OwnerName: data.OwnerName,
                    OwnerFatherName: data.OwnerFatherName,
                    InsitutionName: data.InstitutionName,
                    ContactNumber: data.ContactNumber,
                    WhatappNumber: data.WhatsAppNumber,
                    CenterCode: data.CenterCode,
                    DateOfBirth:data.DateOfBirth,
                    email: data.email,
                    password: data.password,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    FrontAdhar: data.FrontAdhar,
                    BackAdhar: data.BackAdhar,
                    PanCard: data.PanCard,
                    ProfilePhoto: data.ProfilePhoto,
                    VistOffice: data.VistOffice,
                  },
                  userData: {
                    email: data.email,
                    password: data.password,
                    username:data.username,
                    profilePicture:data.ProfilePhoto
                  },
        
            }),
            
          });
          const rawdata= await res.json()
          return rawdata

    }
    
)
export const fetchCenter = createAsyncThunk(
  'Center/fetchCenter',
  async()=>{
    const res= await fetch('/api/admin/university/center/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
    });  
    const rawdata= await res.json()
    return rawdata
  }
)
export const deleteCenter = createAsyncThunk(
  'Center/deleteCenter',
  async(id)=>{
    const res = await fetch(`/api/admin/university/center/delete/${id}`,{
      method:"DELETE",
      header:{
        'Content-Type':'application/json'
      }
    });
    const data = await res.json()
    return data
  }
)


const initialState = {
    Center: [],
    loading: false,
    error: false,
    status:null,
    createLoading:false,
    createError:null,
    createStatus:null,
    deleteLoading:false,
    deleteError:null,
    
  };

  
  const CenterSlice = createSlice({ 
    name:"center",
    initialState,
    reducers:{
      resetCreate:(state)=>{
        state.createLoading =false;
        state.createError= null;
        state.createStatus = null
      },
    },
    extraReducers:(builder)=>{
        builder
                .addCase(createCenter.pending,(state)=>{
                    state.createLoading=true;
                })
                .addCase(createCenter.fulfilled,(state,action)=>{
                    state.createLoading = false;
                    state.createStatus = 200
                })
                .addCase(createCenter.rejected,(state,action)=>{
                    state.createLoading =  false;
                    state.Center.push(action.payload); 
                    state.createStatus = 500
                })
                .addCase(fetchCenter.pending,(state)=>{
                    state.loading =  true;
                })
                .addCase(fetchCenter.fulfilled,(state,action)=>{
                  state.loading = true;
                  state.status =  200;
                  state.Center = action.payload
                })
                .addCase(fetchCenter.rejected,(state,action)=>{
                    state.loading = false,
                    state.status = 500,
                    state.error = action.payload
                })
                .addCase(deleteCenter.pending,(state)=>{
                  state.deleteLoading = true;
                })
                  .addCase(deleteCenter.fulfilled,(state,action)=>{
                    state.deleteLoading = false;
                    console.log("delete successfull",action)
                    state.Center = state.Center.filter(center => center._id !== action.payload.centerID);
                })
                .addCase(deleteCenter.rejected,(state,action)=>{
                    state.deleteError = action.payload
                    console.log("my action at delete",action)
                    state.createError = action.payload
                })
    }
  })

export const {resetCreate} = CenterSlice.actions
  export default CenterSlice.reducer;