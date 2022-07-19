import Box from '@mui/material/Box';
import {TextField, Button} from '@mui/material'
import React, { useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import axios from './../axios'
import {useDispatch} from 'react-redux'
import { billAdded } from '../services/Bills';
import { useNavigate } from 'react-router-dom'


function NewBill() {
    
    let dispatch=useDispatch();
    let navigator=useNavigate()
    
    const [bill, setBill] = useState({
        paidDate: "",
        billDate: "",
        amount: "",
        units:""
    })
    const [loading,setLoading]=useState(false)
    const handleSubmit=async (event)=>{
      event.preventDefault()
      setLoading(true)
      let response=await axios.post("/",bill)
      setLoading(false)
      dispatch(billAdded(response.data))
      navigator("/")




  }

    const handleChange=(event)=>{
        setBill(bill=> {return{...bill,[event.target.id]:event.target.value}})
    }

    const paidDateChange=(value)=>{
        setBill(bill=> {return{...bill,paidDate:value}})
    }
    const billDateChange=(value)=>{
        setBill(bill=> {return{...bill,billDate:value}})
    }
  return (
    <>
    <h1>Create A Bill</h1>
    <Box component="form" onSubmit={handleSubmit} noValidate >
   
    Bill Date: <DateTimePicker 
    value={bill.billDate}
    onChange={billDateChange}
    maxDate={new Date()}/> <br />
    Paid Date: <DateTimePicker  
    value={bill.paidDate}
    onChange={paidDateChange}
    maxDate={new Date()}/> <br />
    Units: <TextField
      margin="normal"
      required
      name="units"
      label="Units"
      type="text"
      value={bill.units}
      onChange={handleChange}
      id="units"
      variant="standard"
    />
    <br />
    Amount: <TextField
      margin="normal"
      required
      name="amount"
      label="Amount"
      type="text"
      id="amount"
      value={bill.amount}
      onChange={handleChange}
      variant="standard"
    />
    <br />

<span>{}</span>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      disabled={loading}
    >
      Save
    </Button>
</Box>
</>
  )
}

export default NewBill