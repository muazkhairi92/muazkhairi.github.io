import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { delUser, editUser, getUser, signIn, signUp } from "../api/users";
import AuthContext from "../context/AuthContext";

import { createTickets, delTicket, editTicket, getStatus, getTickets } from "../api/ticket";
// import {MuiAlert, Snackbar } from "@mui/material";

// const Alert = forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });


const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [roles, setRoles] = useState([]);
  const [cat, setCat] = useState();
  const [dev, setDev] = useState();
  const [lvl, setLvl] = useState();
  const [stat,setStat] = useState();
  
  const [open, setOpen] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();
  
  const signin = async (luser) => {
    // console.log(luser);
    //     JSON.stringify(luser);
      const {data, isError} = await signIn(luser);
    //   console.log(data);
      if(data.message === 'Login Success' && data.data.token){
            setToken(data.data.token);
              setUser(data.data.user);
              alert("Successful Login");  
              navigate('/my-tickets');
      }
      else{
         navigate('not-authorized');

      }


 
  };

  const signout = () => {
    setToken(null);
    alert("Successful Logout");  

  };

  const register = async (ruser) => {
    const {data, isError} = await signUp(ruser);
    console.log(data);

    alert("Succesful Register");
    navigate('/login');

  }



  const gUser =async()=>{
    // console.log(token);
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const {data} = await getUser(config);
    setUsers(data);
    // console.log(data);
      // console.log(data);
      // console.log(users);
  };

  const gTick =async(token)=>{
    // console.log(token);
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const {data} = await getTickets(config);
    setTickets(data);
    // console.log(data);
      // console.log(data);
      // console.log(users);
  };

  const pTick = async(tick,token)=>{
    const con = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const {data} = await createTickets(tick,con);
    console.log(data);
    alert("Successful Create Ticket!");  


  }
  const delTick = async(id)=>{
    const con = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const {data} = await delTicket(con,id);
    console.log(data);
    alert("Successful Delete Ticket");  


  }
  const eTick = async(tick,id)=>{
    const con = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const {data} = await editTicket(con,tick,id);
    console.log(data);              
    alert("Successful Edit Ticket");  


  }
  const eUser = async(user,id)=>{
    const con = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const {data} = await editUser(con,user,id);
    console.log(data);
    alert("Successful Edit User");  


  }
  const dUser = async(id)=>{
    const con = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const {data} = await delUser(con,id);
    console.log(data);
    alert("Successful Delete User");  


  }

  const lookup = async(token)=>{
    const con = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const {Category, PriorityLevel,Status,Developer} = await getStatus(con);
    setCat(Category);
    setLvl(PriorityLevel);
    setStat(Status);
    setDev(Developer);
    console.log(data);
  }



  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        users,
        tickets,
        cat,
        lvl,
        stat,
        dev,
        signin,
        signout,
        register,
        gUser,
        dUser,
        eUser,
        gTick,
        pTick,
        delTick,
        eTick,
        lookup
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;