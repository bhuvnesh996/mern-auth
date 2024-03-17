import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    Session: null,
    loading: false,
    error: false,
    SessionCreation:false,
    deleteSession: {
        error :false,
        loading:false,
    }
  };

export const fetchSession = createAsyncThunk(
    'Session/fetchAll',
    async ()=>{
        const res= await fetch('/api/admin/university/session/all', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            
          });
          const data= res.json()
          return data

    }
)

export const createSession = createAsyncThunk(
    'Session/create',
    async (data)=>{
        const res = await fetch('/api/admin/university/session/create',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data),
        })
        const rawdata = res.json()
        return  rawdata
    }
    
)
export const deleteMySession = createAsyncThunk(
    'Session/delete',
    async (sessionID)=>{
        const res= await fetch(`/api/admin/university/session/delete/${sessionID}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            
          });
          const data = await res.json();
          return data
    }
)


  const sessionSlice = createSlice({
    name:"session",
    initialState,
    reducers :{
        fetchSessionStart:(state)=>{
            state.loading = true
        },
        fetchSessionSuccess:(state,action)=>{
            state.loading = false ,
            state.Session = action.payload
        },
        fetchSessionEnd:(state,action)=>{
            state.loading = false 
            state.error = action.payload
        }, 
        deleteSessionStart:(state)=>{
            state.loading = true
        },
        deleteSessionSuccess:(state,action)=>{
            state.loading = false 
            state.Session = action.payload
        },
        deleteSessionEnd:(state,action)=>{
            state.loading = false 
            state.error = action.payload
        },
        resetCreateSession:(state)=>{
            state.SessionCreation = false
        }
    },extraReducers:(builder)=> {
        builder.addCase(fetchSession.pending,(state)=>{
            state.loading = true 
        })
      .addCase(fetchSession.fulfilled,(state,action)=>{
            state.loading = false
            state.Session = action.payload
        })
        .addCase(fetchSession.rejected,(state,action)=>{
            state.error = action.payload
            state.loading = false
        })
        .addCase(createSession.pending,(state)=>{
            state.loading = true
            state.SessionCreation = false
        })
        .addCase(createSession.fulfilled,(state,action)=>{
            state.loading = false
            state.Session =  action.payload
            state.SessionCreation = true
        })
        .addCase(createSession.rejected,(state,action)=>{
            state.loading = false 
            state.error = action.payload
            state.SessionCreation = false
        })
        .addCase(deleteMySession.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteMySession.fulfilled,(state,action)=>{
            state.loading = false 
            state.Session = state.Session?.filter(session => session._id !== action.payload);
        })
        .addCase(deleteMySession.rejected,(state,action)=>{
            state.loading =  false
            state.error =  action.error.message
        })
    }
  })

  export const {
    fetchSessionStart,fetchSessionSuccess,fetchSessionEnd,SessionCreateStart,SessionCreateSuccess,SessionCreateFail,
    deleteSessionStart,deleteSessionSuccess,deleteSessionEnd,resetCreateSession
  } = sessionSlice.actions;

  export default sessionSlice.reducer;