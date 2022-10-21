import {Navigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const ProtectedRoute = ({children, isAllowed=true, redirectPath='/home'}) =>{
    const {token}= useAuth();
        if(!token){
        return <Navigate to="/home" replace/>
        }
    if(!isAllowed) {
            return <Navigate to={redirectPath} replace/>;
          }  

    return children;
}