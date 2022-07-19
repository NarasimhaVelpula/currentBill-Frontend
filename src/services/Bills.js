import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../axios'
const initialState={
    bills:[],
    fetchStatus: 'idle',
    fetchError: null,
    editStatus:'idle',
    editError: null,
    deleteStatus: 'idle',
    deleteError: null
}

export const fetchBills = createAsyncThunk('bills/fetchBills', async () => {
    const response = await axios.get('/')
    console.log(response.data)
    return response.data
  })


const billSlice=createSlice({
    name: 'bills',
    initialState,
    reducers: {
        billAdded(state,action){
            state.bills.push(action.payload)
        },
        billUpdated(state,action){
            const {_id,billDate,paidDate,units,amount}=action.payload
            console.log(action.payload,state)
            let existingPost=state.bills.filter(bill=>bill._id===_id)
            if(existingPost)
            {
                existingPost.billDate=billDate
                existingPost.paidDate=paidDate
                existingPost.units=units
                existingPost.amount=amount
            }
        },
        billDeleted(state,action){
            const id=action.payload
            state.bills=state.bills.filter(bill=> bill._id!==id)
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchBills.pending,(state,action)=>{
            state.fetchStatus="Loading"
        })
        builder
        .addCase(fetchBills.fulfilled,(state,action)=>{
            state.fetchStatus="succeeded"
            state.bills=action.payload
        })
        builder
        .addCase(fetchBills.rejected,(state,action)=>{
            state.fetchStatus="error"
            state.fetchError=action.error.message
        })

    }
})

export const selectAllBills=state=> state.bills.bills

export const selectBill=state=>{
    console.log(state.bills.bills)
    return "billId"
}

export const {billAdded,billUpdated,billDeleted}=billSlice.actions

export default billSlice.reducer