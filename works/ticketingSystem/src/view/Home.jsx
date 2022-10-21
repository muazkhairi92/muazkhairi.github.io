import '../App.css'
import {NavLink} from 'react-router-dom';
import { UpperNav } from '../Layout/UpperNav';
import { Paper } from '@mui/material';


export const Home= ()=> {
    const style = ({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
        color:"white",
        backgroundColor:"#006D77",
        padding:"1% 2% 1% 2%",
        borderRadius:"5px"
      });
  return (
    <div style={{display:"flex", width:"100%"}}>

    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      
    <img src='../src/assets/newimage.jpeg' style={{width:"45vw",height:"50vh"}}/>
    <Paper elevation={3} style={{ padding:"3%"}}>
  <h2 style={{ fontWeight:"bold"}}>Welcome to Solver Ticketing System</h2>
  <div style={{display:"flex", justifyContent:"center", gap:"5%"}}>
  <NavLink to="/login" style={style}>Log In</NavLink>
  <NavLink to="/register" style={style}>Register</NavLink>
  </div>
  </Paper>

</div>
{/* </main> */}
</div>
  )
};

