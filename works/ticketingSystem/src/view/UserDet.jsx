import useAuth from "../hooks/useAuth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import MyButton from "../components/MyButton";
import * as yup from "yup";
import { MyInput } from "../components/MyInput";
import {  useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button, Paper } from "@mui/material";

export const UserDet = () => {
  const[Edit,SetEdit] = useState(true);
    const { user ,eUser} = useAuth();
    const fetchRoles= ()=>{
      return  axios.get('https://ticket1a-app.herokuapp.com/api/roles-list')
  }
  const {data, isLoading,isError,error,isFetching,refetch} = useQuery(["Roles"],fetchRoles,{
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
  const{ Category, Roles} = data?.data;

   
    return (
    <Formik 
  initialValues= {{name:user.name, email:user.email , categories_id:user.categories_id, passwword:"",cpassword:""}}
  validationSchema = {yup.object({
    
    name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name').
    max(30,"Must be less than 30 characters"),

      email: yup
      .string().
      email('invalid email address'),
     

      password: yup
      .string().
      min(8,"Must be at least 8 character"),
      

      cpassword: yup
      .string().
      oneOf([yup.ref('password'),null],"Password don't match"),
   

      categories_id:yup
      .number()


  })}
  onSubmit = {(values) => {

      console.log(values);
      eUser(values,user.id)
      SetEdit(!Edit)
    //  pTick(values,token);
      // getComponent();
  }}>
          <Paper sx={{padding:"2% 2%"}}>
          <h3>My Profile</h3>
          <h3>Hi {user.name}</h3>
          <Button onClick={()=>SetEdit(!Edit)}>Update My Profile</Button>
       <Form style={{display:"flex",flexDirection:"column",gap:"2%", alignItems:"center"}}>

  

          <div style={{display:"flex",alignItems:"center", width:"100%", justifyContent:"space-between"}}>
            <label htmlFor="name">Name: </label>
            {Edit?<p>{user.name}</p>:<div><Field name="name" type="text" as={MyInput}/>
            <ErrorMessage name="name"/></div>}
            </div>

          <div  style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
          <label htmlFor="email">Email: </label>
          {Edit?<p>{user.email}</p>:<div><Field name="email" type="text" as={MyInput} />
          <ErrorMessage name="email"/></div>}
          </div>
          
          {Edit?null:<div  style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
          <label htmlFor="password">New Password: </label>
          <div><Field name="password" type="password" as={MyInput} />
          <ErrorMessage name="password"/></div>
          </div>}

          {Edit?null:<div  style={{display:"flex",alignItems:"center",width:"100%", justifyContent:"space-between"}}>
          <label htmlFor="cpassword">Confirm New Password: </label>
          <div><Field name="cpassword" type="password" as={MyInput} />
          <ErrorMessage name="cpassword"/></div>
          </div>}

          <div style={{display:"flex",alignItems:"center", width:"100%",justifyContent:"space-between"}}>
            <label htmlFor="categories_id">Categories: </label>
            {Edit?<p>{Category[user.categories_id-1]}</p>:<Field as="select" name="categories_id" style={{padding:"2%",marginRight:"2%"}}>
            {Category.map((item,i)=><option value={i+1}>{item}</option>)}
            </Field>}
            </div>

          {Edit?null:<MyButton type='submit' > Update</MyButton>}        
      </Form>

  </Paper>
  
  </Formik>

    );
  };