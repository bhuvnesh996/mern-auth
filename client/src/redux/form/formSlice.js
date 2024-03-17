import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';



export const formCreate = createAsyncThunk(
    'form/creation',
    async ({ id, categories }) =>{
        const form = {
            categories
        }   
        console.log("snedingdataatatatata",form)
   
        const res = await fetch(`/api/admin/university/form/${id}`,{
            method:"POST",
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categories),
        })
        const rawData = res.json()
        return rawData
    }
)
export const formFetch = createAsyncThunk(
    'form/Fetch',
    async () =>{
        const res = await fetch(`/api/admin/university/form/all`,{
            method:"GET",
            headers : {
                'Content-Type': 'application/json',
            },
            
        })
        const rawData = res.json()
        return rawData
    }
)
const initialState = {
    Form:[],
    createForm:null,
    error:null,
    loading:false,
}

const formSlice =  createSlice({
    name:"form",
    initialState,
    reducers :{ },
    extraReducers : (builder) =>{
        builder 
            .addCase(formCreate.pending,(state)=>{
                state.loading = true;
            })
            .addCase(formCreate.fulfilled,(state,action)=>{
                state.loading = false;
                state.createForm = action.payload;
            })
            .addCase(formCreate.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload
            })
            .addCase(formFetch.pending,(state)=>{
                state.loading = true;
            })
            .addCase(formFetch.fulfilled,(state,action)=>{
                state.loading = false;
                state.Form = action.payload;
            })
            .addCase(formFetch.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload
            })
    }
})
export default formSlice.reducer;