import {  Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {useSelector, useDispatch} from 'react-redux';
// import { getUser } from "../api/users";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import {  useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { ErrorMessage, Field, Form,Formik } from "formik";
import * as yup from "yup";
import MyButton from "../components/MyButton";
import { MyInput } from "../components/MyInput";
import axios from "axios";


const UserDash = () => {

    // const {users} = useSelector(state=>state.user);
    const {token,dUser,eUser } = useAuth();
    const [open, setOpen] = useState(false);
    const[Edit,SetEdit] = useState(true);
    const[use,SetUse] = useState([]);


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handlePassData = (user) => {
      SetUse(user);
    };
    const handleClose = () => {
      setOpen(false);
    };


    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const fetchUsers= ()=>{
      return  axios.get('https://ticket1a-app.herokuapp.com/api/user',config)
  }
  //   const fetchRoles= ()=>{
  //     return  axios.get('http://127.0.0.1:8000/api/roles-list')
  // }

  const queryClient = useQueryClient();

  const {data, isLoading,isError,error,isFetching,refetch} = useQuery(["ues"],fetchUsers,{
      enabled:true,
      onSuccess:(res)=>{console.log('tahniah',res);
      // queryClient.invalidateQueries(["ues"])

  },
  onError:(res)=>{console.log('error',res)}
  });
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error! {error.message}</div>
  }

  const handleFetch = () =>{
    refetch();
  }
const users = data?.data;
const Category = ['None','Cista','Adnexio','Meniaga','Decoris'];
const Roles = ['admin','support','developer'];



  // gUser();
  // console.log(data);
  
  // useEffect(()=>{gUser(token);},[]);
  // console.log(users);

  return (
    <div style={{display:"flex",flexDirection:"column", width:"80vw", height:"75vh", alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center"}}>
      <h2> Users Database</h2>

      </div>
      <div style={{height:"60vh", width:"70vw"}}>
      <ul class="responsive-table">
    <li style={{borderRadius: "3px",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px", backgroundColor:"#006D77", color:"white", fontWeight:"bold"}}>
      <div style={{width: "2%", display:"flex",alignItems:"center"}}>Id</div>
      <div style={{width: "15%",display:"flex", alignItems:"center"}}>Name</div>
      <div style={{width: "25%",display:"flex", alignItems:"center"}}>Email</div>
      <div style={{width: "10%",display:"flex", alignItems:"center"}}>Roles</div>
      <div style={{width: "15%", display:"flex",alignItems:"center"}}>Category</div>
      <div style={{width: "15%", display:"flex",alignItems:"center"}}>Action</div>
    </li>
    <div style={{display:"flex", flexDirection:"column",height:"45vh", overflowY: "scroll"}}>
    { users.map((u) => (
    <li style={{borderRadius: "3px",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    backgroundColor: "#EDF6F9",
    boxShadow: "0px 0px 9px 0px rgba(0,0,0,0.1)"}}>
     
           <div style={{width: "2%", display:"flex",alignItems:"center"}}>{u.id}</div>
      <div style={{width: "15%", display:"flex",alignItems:"center"}}>{u.name}</div>
      <div style={{width: "25%", display:"flex",alignItems:"center"}}>{u.email}</div>
      <div style={{width: "10%",display:"flex", alignItems:"center"}}>{u.roles}</div>
      <div style={{width: "15%",display:"flex", alignItems:"center"}}>{Category[u.categories_id-1]}</div>
      <div style={{width: "15%", display:"flex",alignItems:"center", gap:"20%"}}>
        <i onClick={()=>{dUser(u.id)}} style={{cursor:"pointer"}} class="bi bi-trash3"/>
      <i onClick={()=>{handleClickOpen();handlePassData(u)}} style={{cursor:"pointer"}} class="bi bi-pencil-square"/>
      </div>

      
      </li>
      ))}
  <Dialog open={open} onClose={handleClose} fullWidth
  maxWidth="sm">
        <DialogTitle>Update User</DialogTitle>
        <p onClick={handleClose} style={{cursor:"pointer",position:"absolute",top:"0", right:"5%"}}><i class="bi bi-x-square"></i></p>
        <Formik 
    initialValues= {{email:use.email ,name:use.name, roles:use.roles, categories_id:use.categories_id}}
    validationSchema = {yup.object({
        name: yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name').
        max(30,"Must be less than 30 characters"),


        email: yup
        .string().
        email('invalid email address'),

        roles: yup
        .string(),

        categories_id: yup
        .string()

    })}
    onSubmit = {(values) => {

      console.log(values);
      eUser(values,use.id);
      handleClose();

       
        // getComponent();
    }}>
        <div>
            <Form style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"2%", padding:"2% 2%"}}>
            
            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center", gap:"5%", width:"100%"}}>
            <label htmlFor="name">Name:</label>
            <Field name="name" type="text" as={MyInput}/>
            <ErrorMessage name="name"/>
            </div>

            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",gap:"5%" ,width:"100%"}}>
            <label htmlFor="email">Email: </label>
            <Field name="email" type="email"  as={MyInput}/>

            <ErrorMessage name="email"/>
            </div>

    
            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",width:"100%", marginRight:"2%"}}>
            <label htmlFor="roles">Roles: </label>
            <Field as="select"name="roles" style={{padding:"2%"}}>
            {Roles?.map((item,i)=><option value={item}>{item}</option>)}
            </Field>
            </div>

            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",width:"100%",marginRight:"2%"}}>
            <label htmlFor="categories_id">Category: </label>
            <Field as="select"  name="categories_id" style={{ padding:"2%", marginBottom:"2%",marginTop:"2%"}}>
            {Category?.map((item,i)=><option value={i+1}>{item}</option>)}
            </Field>
            </div>

            <div style={{display:"flex",AlignItems:"center", justifyContent:"center"}}>

            <MyButton type='submit' > Update</MyButton>        
            </div>
        </Form>
        </div>
    </Formik>
      </Dialog>
      </div>
    </ul>
    </div>

    </div>

    
  );
}

export default UserDash;