import React, { useEffect, useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';


import { useFormik,Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import MyButton from '../components/MyButton';
import useAuth from '../hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MyInput } from '../components/MyInput';
import { Paper } from '@mui/material';
// import {MuiAlert, Snackbar } from "@mui/material";

// const Alert = forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export const SignIn = ({show,ema,passwor}) => {
 
  const[msg,setMsg]=useState("");
  const[el,setEl]=useState("");
  const[ps,setPs]=useState("");
  const[disp,setDisp]=useState("none");
  const navigate = useNavigate();
  const {signin,user} = useAuth();

  // const checkPass=()=>{
  //   if(ps === passwor && el === ema){
  //     navigate('/tickets')
  //   }
  //   else if (ps === "" || el === ""){
  //     setMsg("")
  //   }
  //   else{
  //     setMsg("invalid credentials");
  //     setDisp("none");
  //   }
  // };

  // useEffect(()=>{checkPass()},[ps,el]);



  return (
    <div style={{display:"flex", justifyItems:'center',justifyContent:'center', alignItems:"center", gap:"15%", marginTop:"5%"}}>
   
    <img src='../src/assets/login.png' style={{width:"25%",height:"25%"}}/>

       
          
          <Paper elevation={3} sx={{width:"45vw", padding:"2%"}}>
    <Formik 
    initialValues= {{email:"", password:""}}
    validationSchema = {yup.object({
      
      email: yup
      .string().
      email('invalid email address')
      .required("Required"),

        password: yup
        .string().
        min(8,"Must be at least 8 character")
        .required("Required")

    })}
    onSubmit = {(values) => {
      setEl(values.email);
      setPs(values.password);
      // mutate(values);
      signin(values);
      console.log(values);
      

      // checkPass();
    }}>
            <Form style={{display:"flex",flexDirection:"column", alignItems:"center", gap:"5%" }}>
            <h3>Sign In</h3>
            
            <div style={{display:"flex",justifyContent:'space-between', alignItems:"center", width:"30vw"}}>
            <label htmlFor="email">Email: </label>
            <div style={{display:"flex",flexDirection:"column"}}>
            <Field name="email" type="text" as={MyInput}/>
            <ErrorMessage name="email"/>
            </div>
            </div>

            <div style={{display:"flex",justifyContent:'space-between', alignItems:"center", width:"30vw"}}>
            <label htmlFor="password">Password: </label>
            <div style={{display:"flex",flexDirection:"column"}}>
            <Field name="password" type="password" as={MyInput} />
            <ErrorMessage name="password"/>
            </div>
            </div>

            <div style={{marginTop:"2%", display:"flex",justifyContent:"center",alignItems:"center",gap:"1%", width:"100%"}}>
            <MyButton type='submit' > LogIn</MyButton> 
            <NavLink to="/register">Not a user yet?</NavLink>
            </div>
        </Form>
    </Formik>
 </Paper>
 </div>

  );
};

export default SignIn;

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import {TextField,Button} from "@mui/material";
// import useAuth from '../hooks/useAuth';

// const validationSchema = yup.object({
//   email: yup
//     .string('Enter your email')
//     .email('Enter a valid email')
//     .required('Email is required'),
//   password: yup
//     .string('Enter your password')
//     .min(8, 'Password should be of minimum 8 characters length')
//     .required('Password is required'),
// });

// const {signin} = useAuth();

//  export const SignIn = () => {
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       JSON.stringify(values, null, 2);
//           signin(values);

//     },
//   });

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           fullWidth
//           id="email"
//           name="email"
//           label="Email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//         />
//         <TextField
//           fullWidth
//           id="password"
//           name="password"
//           label="Password"
//           type="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//           helperText={formik.touched.password && formik.errors.password}
//         />
//         <Button color="primary" variant="contained" fullWidth type="submit">
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// };
// export default SignIn;
