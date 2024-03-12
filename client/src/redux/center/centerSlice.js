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
export const searchCenter  = createAsyncThunk(
  'Center/search',
  async(CenterCode)=>{
    console.log("center code queary",CenterCode)
    const res =  await fetch(`/api/admin/center/search?CenterCode=${CenterCode}`,{
      method:"GET",
      header:{
        'Content-Type':'application/json'
      }
    });
    console.log("why reject me",res)
    const data = await res.json()
    console.log("datadat",data)
    return data
  }
)
export const assignUniversity = createAsyncThunk(
  'Center/unassignedUniversity',
  async(id)=>{
    const res =  await fetch(`/api/admin/center/unassignedUni/${id}`,{
      method:"GET",
      header:{
        'Content-Type':'application/json'
      }
    });
    const data = await res.json()
    console.log("datadat",data)
    return data
  }
)

export const  createAssignUniversity =  createAsyncThunk(
  'Center/assign/University',
  async(data)=>{

      const res= await fetch('/api/admin/center/assign/university', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
  })
      const rawdata =  res.json()
      return  rawdata
})

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
    searchCenter:{},
    searchCenterError:null,
    seacrchCenterLoading:false,
    unAssigned:[],
    unAssignedLoading:false,
    unAssignedError:null,

    
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
                .addCase(searchCenter.fulfilled,(state,action)=>{
                      state.seacrchCenterLoading = false
                      state.searchCenter = action.payload
                      })
                .addCase(searchCenter.pending,(state)=>{
                  state.seacrchCenterLoading = true
                })
                .addCase(searchCenter.rejected,(state,action)=>{
                  state.searchCenterError = action 
                  state.seacrchCenterLoading  = false
                })
                .addCase(assignUniversity.pending,(state)=>{
                    state.unAssignedLoading = true;
                })
                .addCase(assignUniversity.fulfilled,(state,action)=>{
                    state.unAssignedLoading = false
                    state.unAssigned =  action.payload
                })
                .addCase(assignUniversity.rejected,(state,action)=>{
                    state.unAssignedLoading = false
                    state.unAssignedError =  action.error.message;
                })
                .addCase(createAssignUniversity.pending,(state)=>{
                  state.loading= true
                })
                  .addCase(createAssignUniversity.fulfilled,(state,action)=>{
                    state.loading = false 
                    console.log("action payloadinng in my",action.payload)
                    state.searchCenter = action.payload
                  })
                .addCase(createAssignUniversity.rejected,(state,action)=>{
                    state.loading =  false 
                    state.error =  action.error.message
                })
                
    }
  })

export const {resetCreate} = CenterSlice.actions
  export default CenterSlice.reducer;