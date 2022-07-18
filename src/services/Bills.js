import {createSlice} from '@reduxjs/toolkit'

const initialState={
    bills:[{
        id:'123abc',
        billDate: new Date("2022","01","02").toLocaleDateString(),
        paidDate: new Date("2022", "01", "24").toLocaleDateString(),
        units: 230,
        amount: 2300
    },
    {
        id:'123abc1234',
        billDate: new Date("2022", "02", "01").toLocaleDateString(),
        paidDate: new Date("2022", "02", "24").toLocaleDateString(),
        units: 230,
        amount: 2300
    }],
    fetchStatus: 'idle',
    fetchError: null,
    editStatus:'idle',
    editError: null,
    deleteStatus: 'idle',
    deleteError: null
}

const billSlice=createSlice({
    name: 'bills',
    initialState,
    reducers: {
        billAdded(state,action){
            state.bills.push(action.payload)
        },
        billUpdated(state,action){
            const {id,billDate,paidDate,units,amount}=action.payload
            let existingPost=state.bills.filter(bill=>bill.id===id)
            if(existingPost)
            {
                existingPost.billDate=billDate
                existingPost.paidDate=paidDate
                existingPost.units=units
                existingPost.amount=amount
            }
        },
        billDeleted(state,action){
            const {id}=action.payload
            state=state.bills.filter(bill=> bill.id!==id)
        }
    }
})

export const selectAllBills=state=> state.bills.bills

export const selectBill=(state,billId)=>state.bills.bills.find(bill=>bill.id===billId)

export const {billAdded,billUpdated,billDeleted}=billSlice.actions

export default billSlice.reducer