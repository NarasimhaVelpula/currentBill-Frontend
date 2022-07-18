import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAllBills } from '../services/Bills'
import {Paper, TableContainer,Table, TableCell, TableBody, TableHead, TableRow} from '@mui/material'
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'


function Bills() {
    const bills=useSelector(selectAllBills)
    // const billsStatus=useSelector(state=>state.bills.fetchStatus)
    // const billsError=useSelector(state=>state.bills.fetchError)
    console.log(bills)
    useEffect(() => {
        
    }, [])
    const navigator=useNavigate()
    
  return (
    <>
    <h1>Bill Viewer</h1>
    <center>
    <Button variant="contained" onClick={()=>{navigator("newBill")}} >Create New Bill</Button>
    </center>
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
        {bills.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="right">{row.billDate}</TableCell>
            <TableCell align="right">{row.paidDate}</TableCell>
            <TableCell align="right">{row.units}</TableCell>
            <TableCell align="right">{row.amount}</TableCell>
            <TableCell align="right"> <Button variant="contained">Edit</Button></TableCell>
            <TableCell align="right"> <Button variant="contained" color="secondary">Delete</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </>
  )
}

export default Bills