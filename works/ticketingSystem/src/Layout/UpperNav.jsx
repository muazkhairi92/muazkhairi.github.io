import {NavLink} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const UpperNav = () => {

    const { signout, token, user } = useAuth();
    const style = ({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
        color:"white"
      });

    return (
        <nav
        style={{
            borderBottom: 'solid 1px',
            paddingBottom: '1%',
            paddingTop: '1%',
            paddingLeft: '2%',
            paddingRight: '10%',
            width:'100%',
            display:"flex",
            justifyContent:"space-between",
            position:"fixed",
            top:"0",
            left:"0",
            // right:"0",
            backgroundColor:"#006D77",
        }}
      >
        <NavLink to="/my-tickets" style={style}>Home</NavLink>
        <div style={{display:"flex",gap:"5%",width:"30%"}}>
        {user?.roles.includes('admin') && token ?<NavLink to="/users" style={style}>Users</NavLink> : null}
        {token ?<NavLink to="/profile" style={style}>Edit Profile</NavLink> : null}
        {token ? <NavLink onClick={() => signout()}>Logout</NavLink> : <NavLink to="/login" style={style}>Log In</NavLink>}
        {token ? null : <NavLink to="/register" style={style}>Register</NavLink>}
        </div>
      </nav>
    );

}