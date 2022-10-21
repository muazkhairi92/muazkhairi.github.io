import React, { useEffect, useState } from 'react';
import { useFormik,Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import {SignIn} from './SignIn';
import MyButton from '../components/MyButton';
import {NavLink, useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { MyInput } from '../components/MyInput';
// import { getRoles } from '../api/users';
import {  useQuery } from "@tanstack/react-query";
import axios from "axios";
import Select from '@mui/material/Select';
import { Paper } from '@mui/material';




// import SignIn from './SignIn';

export const SignUp = () => {
  
  
  const [emai,setEmai]=useState("");
  const [pass,setPass]=useState();
  // const [rol,setRol]=useState([]);
  // const [cat,setCat]=useState([]);
  const navigate = useNavigate();
  const {register} = useAuth();

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
// const getRoles = async ()=>{
//   const res = await axios.get(
//       'http://127.0.0.1:8000/api/roles-list',
//   );
//   return res;
// };
// const data = getRoles();

// useEffect(()=>fetchRoles(),[])
// console.log(data);

// const fetchSuperheroes=()=>{
//   return axios.get('http://127.0.0.1:8000/api/roles-list')
// }

// const {data, isLoading,isError,error,isFetching,refetch} = useQuery(["roles"],fetchSuperheroes,{
//   enabled:true,
//   onSuccess:(res)=>{console.log('tahniah',res)
// },
// onError:(res)=>{console.log('error',res)}
// });
// console.log(fetchSuperheroes);

const{ Category, Roles} = data?.data;
// const Category = ['None','Cista','Adnexio','Meniaga','Decoris'];
// const Roles = ['Admin','Support','Developer'];


// if(isError){
//   return <h1>{error}</h1>
//  }



  return (
    <div style={{display:"flex", justifyItems:'center',justifyContent:'center', alignItems:"center", gap:"15%", marginTop:"5%"}}>
   
    <img src='../src/assets/register.png' style={{width:"35%",height:"45%"}}/>

       
          
          <Paper elevation={3} sx={{width:"50vw", padding:"2%"}}>
    <Formik 
    initialValues= {{email:"" ,name:"", password:"", categories_id:"1"}}
    validationSchema = {yup.object({
        name: yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name').
        max(30,"Must be less than 30 characters")
        .required("Required"),

        password: yup
        .string().
        min(8,"Must be at least 8 character")
        .required("Required"),

        cpassword: yup
        .string().
        oneOf([yup.ref('password'),null],"Password don't match")
        .required("Required"),

        email: yup
        .string().
        email('invalid email address')
        .required("Required"),

        // roles: yup
        // .string(),

        categories_id: yup
        .string()

    })}
    onSubmit = {(values) => {
        setEmai(values.email);
        setPass(values.password);
        register(values);

       
        // getComponent();
    }}>
            <Form style={{display:"flex",flexDirection:"column",gap:"5%"}}>
            <h3>Register</h3>

            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center", gap:"5%"}}>
            <label htmlFor="name">Name:</label>
            <Field name="name" type="text" as={MyInput}/>
            <ErrorMessage name="name"/>
            </div>

            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",gap:"5%"}}>
            <label htmlFor="email">Email: </label>
            <Field name="email" type="text"  error={ErrorMessage.name.name} helperText={ErrorMessage.ErrorMessage} as={MyInput}/>

            <ErrorMessage name="email"/>
            </div>

            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",gap:"5%"}}>
            <label htmlFor="password">Password: </label>
            <Field name="password" type="password"  error={ErrorMessage.name.name} helperText={ErrorMessage.name.password} as={MyInput} />
            <ErrorMessage name="password"/>
            </div>

            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center", gap:"5%"}}>
            <label htmlFor="cpassword">Retype Password: </label>
            <Field name="cpassword" type="password"  error={ErrorMessage.name.name} helperText={ErrorMessage.name.cpassword} as={MyInput} />
            <ErrorMessage name="cpassword"/>
            </div>

    
            {/* <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
            <label htmlFor="roles">Roles: </label>
            <Field as="select"name="roles" style={{width:"40%", padding:"2%"}}>
            {Roles?.map((item)=><option value={item}>{item}</option>)}
            </Field>
            </div> */}

            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",gap:"5%", marginRight:"2%"}}>
            <label htmlFor="categories_id">Category: </label>
            <Field as="select"  name="categories_id" style={{width:"40%", padding:"2%", marginBottom:"3%",marginTop:"3%"}}>
            {Category?.map((item,i)=><option value={i+1}>{item}</option>)}
            </Field>
            </div>

            <div style={{display:"flex",AlignItems:"center", justifyContent:"center"}}>

            <MyButton type='submit' > Sign Up</MyButton>        
            </div>
        </Form>

   
    
    </Formik>

</Paper>
</div>
  );
};

export default SignUp;
