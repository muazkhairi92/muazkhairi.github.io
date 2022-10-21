import React, { useState } from 'react';
import { useFormik,Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import {NavLink, useNavigate} from 'react-router-dom';
import MyButton from '../components/MyButton';
import { MyInput } from '../components/MyInput';
import { Paper, Select } from '@mui/material';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// import SignIn from './SignIn';

export const CreateTicket = () => {
  
  

  const {pTick, token} = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  const fetchLookup= ()=>{
    return  axios.get('https://ticket1a-app.herokuapp.com/api/ticket-lookup',config)
}
  
  const {data, isLoading,isError,error,isFetching,refetch} = useQuery(["tik"],fetchLookup,{
    enabled:true,
    onSuccess:(res)=>{console.log('tahniah',res)
},
onError:(res)=>{console.log('error',res)}
});

if (isLoading) {
  return <div>Loading...</div>
}
if (isError) {
  return <div>Error! {error.message}</div>
}

const {Category, PriorityLevel,Status,Developer} = data?.data;



  // const Developer = ["Abu", "Ali","Ahmad"];



  return (
    <Paper sx={{padding:"2% 5%"}}>
    <Formik 
    initialValues= {{title:"" ,description:"", categories_id:1, priority_levels_id:1,developer_id:Developer[0].id,statuses_id:1}}
    validationSchema = {yup.object({
        title: yup
        .string().
        max(30,"Must be less than 30 characters")
        .required("Required"),

        description: yup
        .string().
        min(8,"Must be at least 8 character")
        .required("Required"),

        categories_id: yup
        .number(),

        priority_levels_id: yup
        .number(),

        developer_id: yup
        .number(),

        statuses_id:yup
        .number()

    })}
    onSubmit = {(values) => {
  
        console.log(values);

       pTick(values,token);
        // getComponent();
    }}>
            <div>
            <Form style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <h3>Create A Ticket</h3>


       <div style={{display:"flex", flexDirection:"column", gap:"5%"}}>

            
            <div  style={{display:"flex", justifyContent:"space-between",alignItems:"center", width:"100%"}}>
             <label htmlFor="title">Title: </label>
            <Field name="title" type="text" as={MyInput} />
            <ErrorMessage name="title"/>
            </div>

           <div  style={{display:"flex", justifyContent:"space-between",alignItems:"center",width:"100%"}}>
            <label htmlFor="description">Description: </label>
            <Field name="description" type="text" multiline rows={3} as={MyInput}/>
            <ErrorMessage name="desc"/>
            </div>
        

            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",width:"100%"}}>
            <label htmlFor="categories_id">Category: </label>
            <Field as="select" name="categories_id" style={{ padding:"2%", marginRight:"3%"}}>
            {Category.map((item,i)=><option value={i+1}>{item.toUpperCase()}</option>)}
            </Field>
            </div>

            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",width:"100%",marginTop:"3%"}}>
            <label htmlFor="priority_levels_id">Priority Level: </label>
            <Field as="select" name="priority_levels_id" style={{ padding:"2%", marginRight:"3%"}}>
            {PriorityLevel.map((item,i)=><option value={i+1}>{item.toUpperCase()}</option>)}
            </Field>
            </div>

            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",width:"100%", marginTop:"3%", }}>
            <label htmlFor="developer_id">Developer Name: </label>
            <Field as="select" name="developer_id" style={{ padding:"2%", marginRight:"3%"}}>
            {Developer.map((item,i)=><option value={item.id}>{item.name.toUpperCase()}</option>)}
            </Field>
            </div>

            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",width:"100%",marginTop:"3%", marginBottom:"3%"}}>
            <label htmlFor="statuses_id">Status: </label>
            <Field as="select" name="statuses_id" style={{padding:"2%", marginRight:"3%"}}>
            {Status.map((item,i)=><option value={i+1}>{item.toUpperCase()}</option>)}
            </Field>
            </div>

      </div>
            <MyButton type='submit' > Create</MyButton>        
        </Form>

    </div>
    
    </Formik>

</Paper>
  );
};

export default CreateTicket;
