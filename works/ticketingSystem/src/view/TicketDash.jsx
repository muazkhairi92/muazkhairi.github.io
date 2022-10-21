import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import {useSelector, useDispatch} from 'react-redux';
// import { getUser } from "../api/users";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Avatar, CircularProgress, Dialog, DialogTitle, IconButton, List, ListItem, Paper } from "@mui/material";
import { editTicket, getStatus } from "../api/ticket";
import { fontSize } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import MyButton from "../components/MyButton";
import * as yup from "yup";
import { MyInput } from "../components/MyInput";






export const TicketDash= ()=> {

  const {token,delTick,eTick,user} = useAuth();
  const[Edit,SetEdit] = useState(true);
  const[tick,SetTick] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePassData = (tick) => {
    SetTick(tick);
  };

  function capitalFL(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  const getBackgroundColor = (priority)=>{
    switch(priority){
      case "High": return "red"
      case "Mid": return "green"
      case "Low": return "blue"
      default: return "blue"
    }
  }


  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  const fetchTicket= ()=>{
    return  axios.get('https://ticket1a-app.herokuapp.com/ticket',config)
}
//   const fetchStatus= async()=>{
//     return  await axios.get('http://127.0.0.1:8000/api/ticket-lookup',config)
// }
  const queryClient = useQueryClient();

  const {data, isLoading,isError,error,isFetching,refetch} = useQuery(["tick"],fetchTicket,{
    enabled:true,
    onSuccess:(res)=>{console.log('tahniah',res);
    // queryClient.invalidateQueries(["tick"])
},
onError:(res)=>{console.log('error',res)}
});

if (isLoading) {
  return <CircularProgress/>
}
if (isError) {
  return <div>Error! {error.message}</div>
}

const handleFetch = () =>{
  refetch();
}

// const {Category, PriorityLevel,Status,Developer} = getStatus(token);

const Tickets = data?.data?.data;




  return (

  <div style={{ height:"100%",width: '90%', display:"flex", flexDirection:"column", alignItems:"center" }}>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
    <h2> All Pending Tickets</h2>
   
    </div>
  <div style={{width:"100%", display:"flex", flexWrap:"wrap", gap:"5%", marginTop:"5%", height:"60%", overflowY: "scroll"}}>
  { Tickets.map((ticket)=>(
    (ticket.status !== "complete")?
  <Paper elevation={4} style={{width:"25%", fontSize:"80%", padding:"1%",gap:"0%", display:"flex", flexDirection:"column", marginBottom:"5%", backgroundColor:"#83C5BE", overflowWrap: "break-word"}} >
       

    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center",height:"20%"}}>
      <h3 style={{ width:"50%"}}>#{ticket.id}:{ticket.title}</h3>
      <div style={{display:"flex", gap:"5%", width:"30%", alignItems:"center"}}>
        <i class="bi bi-patch-exclamation-fill" style={{color:getBackgroundColor(ticket.level)}}></i>
      <p onClick={()=>{handleClickOpen();handlePassData(ticket)}} style={{cursor:"pointer"}}>details</p>
      </div>
      </div>
      <div style={{height:"35%"}}><p>Description: {ticket.description}</p></div>
 
    <p>Created By: {capitalFL(ticket.support_name)}</p>
    <p>Assign to: {capitalFL(ticket.developer_name)}</p>
   
  </Paper>:null
  
  ))
  }
     <Dialog open={open} onClose={handleClose} fullWidth
  maxWidth="sm" >
        <DialogTitle> Ticket Details</DialogTitle>
        <p onClick={handleClose} style={{cursor:"pointer",position:"absolute",top:"0", right:"5%"}}><i class="bi bi-x-square"></i></p>
        <div style={{display:"flex", justifyContent:"space-between", flexDirection:"column", alignItems:"center",width:"100%", marginBottom:"3%"}}>
      <h3>#{tick.id}:{tick.title}</h3>
     
    <div style={{display:"flex", justifyContent:"space-between", width:"50%"}}><p>Description:</p><p>{tick.description}</p></div>
    <div style={{display:"flex", justifyContent:"space-between", width:"50%"}}><p>Category:</p><p> {tick.category}</p></div>
    <div style={{display:"flex", justifyContent:"space-between", width:"50%"}}><p>Priority Level:</p><p> {tick.level}</p></div>
    <div style={{display:"flex", justifyContent:"space-between", width:"50%"}}><p>Created By:</p> <p>{tick.support_name}</p></div>
    <div style={{display:"flex", justifyContent:"space-between", width:"50%"}}><p>Assign To:</p><p> {tick.developer_name}</p></div>
    <div style={{display:"flex", justifyContent:"space-between", width:"50%"}}><p>Status:</p><p> {tick.status}</p></div>
    <div style={{display:"flex", justifyContent:"space-between", width:"50%"}}><p>Developer Notes: </p><p> {tick.developer_notes}</p></div>
    {user.roles === "support"? <MyButton onClick={()=>{ handleClose();delTick(tick.id)}} > Delete Ticket</MyButton>:null  } 
      </div>
        </Dialog>
  </div>
</div>
  )
};