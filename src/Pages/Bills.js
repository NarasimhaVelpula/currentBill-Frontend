import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { billDeleted, fetchBills, selectAllBills } from '../services/Bills'
import {Paper, TableContainer,Table, TableCell, TableBody, TableHead, TableRow} from '@mui/material'
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from './../axios'



function Bills() {
    const bills=useSelector(selectAllBills)
    const loading=useSelector(state=>state.bills.fetchStatus)
    const dispatch=useDispatch()
    // const billsStatus=useSelector(state=>state.bills.fetchStatus)
    // const billsError=useSelector(state=>state.bills.fetchError)
    console.log(bills)
    useEffect(() => {
        dispatch(fetchBills())
    }, [dispatch])
    const navigator=useNavigate()

    const handleDelete=async (billId)=>{
      await axios.delete(`/${billId}`)
      dispatch(billDeleted(billId))
    }
    
  return (
    <>
    <h1>Bill Viewer</h1>
    <center>
    <Button variant="contained" onClick={()=>{navigator("newBill")}} >Create New Bill</Button>
    </center>
    {loading==="Loading"?<h1>Loading...</h1>:
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
        <TableCell>ID</TableCell>
          <TableCell>Bill Date</TableCell>
          <TableCell align="right">Paid Date</TableCell>
          <TableCell align="right">Units</TableCell>
          <TableCell align="right">Amout</TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bills.map((row,id) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {id+1}
            </TableCell>
            <TableCell align="right">{new Date(row.billDate).toLocaleDateString()}</TableCell>
            <TableCell align="right">{new Date(row.paidDate).toLocaleDateString()}</TableCell>
            <TableCell align="right">{row.units}</TableCell>
            <TableCell align="right">{row.amount}</TableCell>
            <TableCell align="right"> <Button variant="contained" onClick={()=>{navigator(`/${row._id}`)}}>Edit</Button></TableCell>
            <TableCell align="right"> <Button variant="contained" color="secondary" onClick={()=>{handleDelete(row._id)}}>Delete</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}
  </>
  )
}

export default Bills