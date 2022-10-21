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






export const MyTicket= ()=> {

  const {token,delTick,eTick,user} = useAuth();
  const[Edit,SetEdit] = useState(true);
  const[tick,SetTick] = useState([]);
  // const Status = getStatus(token);
  // console.log(Status);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handlePassData = (tick) => {
    SetTick(tick);
  };

  const handleClose = () => {
    setOpen(false);
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
    return  axios.get('https://ticket1a-app.herokuapp.com/api/ticket',config)
}
//   const fetchStatus= async()=>{
//     return  await axios.get('http://127.0.0.1:8000/api/ticket-lookup',config)
// }
const queryClient = useQueryClient()

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

// const stat = getStatus(token);
// const {Category, PriorityLevel,Status,Developer} = stat;

const Tickets = data?.data?.data;

const Status = ["in-progress","back-log","complete"];


  return (

  <div style={{ height:"100%",width: '90%', display:"flex", flexDirection:"column", alignItems:"center" }}>
    <h2> My Tickets</h2>


  <div style={{width:"100%", display:"flex", flexWrap:"wrap", gap:"5%", marginTop:"5%", height:"70%", overflowY: "scroll"}}>
  { Tickets.map((ticket)=>(
    (ticket.status !== "complete" && (ticket.developer_name === user.name || ticket.support_name === user.name))?
  <Paper elevation={4} style={{width:"25%", fontSize:"80%", padding:"1%",gap:"0%", display:"flex", flexDirection:"column", marginBottom:"5%", backgroundColor:"#83C5BE", overflowWrap: "break-word"}}>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", height:"20%"}}>
      <h3 style={{ width:"55%"}}>#{ticket.id}:{ticket.title}</h3>
        
      <div style={{display:"flex", gap:"10%", width:"45%",alignItems:"center"}}>
        <i class="bi bi-patch-exclamation-fill" style={{color:getBackgroundColor(ticket.level)}}></i>
        {user.roles === "support"?<p onClick={()=>{handleClickOpen();handlePassData(ticket)}} style={{cursor:"pointer"}} >details</p> :null}

      {user.roles === "support"?<i onClick={()=>delTick(ticket.id)} style={{cursor:"pointer"}} class="bi bi-trash3"></i>:
      <i onClick={()=>{handleClickOpen();handlePassData(ticket)}} style={{cursor:"pointer"}} class="bi bi-pencil-square"></i>}
      </div>
      </div>
    <div style={{height:"35%"}}><p>Description: {ticket.description}</p></div>
    <p>Created By: {capitalFL(ticket.support_name)}</p>
    <p>Assign To: {capitalFL(ticket.developer_name)}</p>
  </Paper>:null
  
  ))
  }
    <Dialog open={open} onClose={handleClose}   fullWidth
  maxWidth="sm">
        <DialogTitle>Update Ticket</DialogTitle>
        <p onClick={handleClose} style={{cursor:"pointer",position:"absolute",top:"0", right:"5%"}}><i class="bi bi-x-square"></i></p>
        <Formik 
  initialValues= {{developer_notes:tick.developer_notes , statuses_id:tick.statuses_id}}
  validationSchema = {yup.object({
 

      developer_notes: yup
      .string().
      min(4,"Must be at least 4 character"),

      // statuses_id:yup
      // .number()


  })}
  onSubmit = {(values) => {

      console.log(values);
      eTick(values,tick.id);
      // SetTick(values)
      handleClose();


  }}>
          <div>
          <Form style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"2%", padding:"2% 2%"}}>
            <div style={{display:"flex"}}>
          <h3>#{tick.id}:{tick.title}</h3>
   
            </div>
            <div style={{display:"flex", justifyContent:"space-between", width:"60%"}}><p>Description:</p><p>{tick.description}</p></div>
    <div style={{display:"flex", justifyContent:"space-between", width:"60%"}}><p>Category:</p><p> {tick.category}</p></div>
    <div style={{display:"flex", justifyContent:"space-between", width:"60%"}}><p>Priority Level:</p><p> {tick.level}</p></div>
    <div style={{display:"flex", justifyContent:"space-between", width:"60%"}}><p>Created By:</p> <p>{tick.support_name}</p></div>
    <div style={{display:"flex", justifyContent:"space-between", width:"60%"}}><p>Assign To:</p><p> {tick.developer_name}</p></div>
    {/* <div style={{display:"flex", justifyContent:"space-between", width:"50%"}}><p>Status:</p><p> {tick.status}</p></div>
    <div style={{display:"flex", justifyContent:"space-between", width:"50%"}}><p>Developer Notes: </p><p> {tick.developer_notes}</p></div> */}
  
          
          
          <div  style={{display:"flex", justifyContent:"space-between",alignItems:"center", width:"60%"}}>
          <label htmlFor="developer_notes">Developer Notes: </label>
          {user.roles === "support"?<p>{tick.developer_notes}</p>:<div><Field name="developer_notes" type="text" as={MyInput} />
          <ErrorMessage name="developer_notes"/></div>}
          </div>

          <div style={{display:"flex", justifyContent:"space-between",alignItems:"center", width:"60%"}}>
            <label htmlFor="statuses_id">Status: </label>
            {user.roles === "support"?<p>{tick.status}</p>:<div><Field as="select" name="statuses_id" style={{padding:"2%", marginRight:"3%"}}>
            {Status?.map((item,i)=><option value={i+1}>{item}</option>)}
            </Field></div>}
            </div>


          {user.roles === "developer"?<MyButton type='submit' > Update</MyButton>: <MyButton onClick={()=>{ handleClose();delTick(tick.id)}} > Delete Ticket</MyButton>  }     
      </Form>

  </div>
  
  </Formik>
        </Dialog>
  </div>
</div>
  )
};