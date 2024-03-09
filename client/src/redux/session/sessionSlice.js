import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    Session: null,
    loading: false,
    error: false,
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
    },extraReducers:(builder)=> {
        builder.addCase(fetchSession.pending,(state)=>{
            state.loading = true 
        })
        builder.addCase(fetchSession.fulfilled,(state,action)=>{
            state.loading = false
            state.Session = action.payload
        })
        builder.addCase(fetchSession.rejected,(State,action)=>{
            state.error = action.payload
            state.loading = false
        })
        builder.addCase(createSession.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(createSession.fulfilled,(state,action)=>{
            state.loading = false
            state.Session =  action.payload
        })
        builder.addCase(createSession.rejected,(state,action)=>{
            state.loading = false 
            state.error = action.payload
        })
    }
  })

  export const {
    fetchSessionStart,fetchSessionSuccess,fetchSessionEnd,SessionCreateStart,SessionCreateSuccess,SessionCreateFail,
    deleteSessionStart,deleteSessionSuccess,deleteSessionEnd
  } = sessionSlice.actions;

  export default sessionSlice.reducer;