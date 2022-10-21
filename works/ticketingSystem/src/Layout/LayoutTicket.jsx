import {NavLink,Outlet} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { UpperNav } from './UpperNav';

export const LayoutTicket = () => {
    const style = ({ isActive }) => ({
      fontWeight: isActive ? 'bold' : 'normal',
      color:"white"
    });
  
    const { user,token } = useAuth();

    return (
      <>
      <UpperNav/>
        
            <nav
            style={{
               
                paddingBottom: '1rem',
                paddingTop: '1rem',
                paddingLeft: '1rem',
                marginLeft:"1%",
                width:"15%",
                height:"20%",
                display:"flex",
                gap:"10%",
                position:"fixed",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                bottom:"10",
                left:"0",
                backgroundColor:"#006D77",
            }}
          >
            
          {(user?.roles.includes('support') || user?.roles.includes('developer') ) && token ?<NavLink to="/my-tickets" style={style}> My Tickets</NavLink> : null}
          {user?.roles.includes('support') && token ?<NavLink to="/create-ticket" style={style}>Create Tickets</NavLink> : null}

            {/* <NavLink to="/create-ticket" style={style}>Create Tickets</NavLink> */}
            <NavLink to="/tickets" style={style}>Pending Tickets</NavLink>
            <NavLink to="/complete-tickets" style={style}>Completed Tickets</NavLink>
        
            </nav>     
        <main style={{ padding: '1rem 0',backgroundColor:"#cce3de", 
        color:"black",display:"flex", flexDirection:"column", alignContent:"center",justifyContent:"center",alignItems:"center", width:"75vw", height:"75vh",marginLeft:"10%", marginTop:"5%"}}>
          <Outlet />
        </main>
        </>
    );
  };