import { Paper } from '@mui/material';
import {NavLink,Outlet} from 'react-router-dom';
import { UpperNav } from './UpperNav';

export const Layout = () => {
    const style = ({ isActive }) => ({
      fontWeight: isActive ? 'bold' : 'normal',
      color:"black"
    });
  
    return (
    
      <div>
      <UpperNav/>
 
          <Outlet />
        
       </div>
    );
  };