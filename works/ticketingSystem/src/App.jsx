import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import  {Home}  from './view/Home';
import {Nomatch}  from './view/Nomatch';
import {Layout}  from './Layout/Layout';
import {SignIn} from './view/SignIn';
import {SignUp} from './view/SignUp';
import { TicketDash } from './view/TicketDash';
import { LayoutTicket } from './Layout/LayoutTicket';
import CreateTicket from './view/CreateTicket';
import UserDash from './view/UserDash';
import { ProtectedRoute } from './routes/ProtectedRoutes';
import useAuth from './hooks/useAuth';
import { UserDet } from './view/UserDet';
import { NotAuthorized } from './view/NotAuthorized';
import { CompleteTicket } from './view/CompleteTicket';
import { MyTicket } from './view/MyTicket';


function App() {
  const { user } = useAuth();


  return (
    <div className="App">
      <Routes>
        <Route index element={<TicketDash/>} />
        <Route path="home" element={<Home/>} />
        <Route element={<Layout/>}>
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />

        <Route path="not-authorized" element={<NotAuthorized/>} />
        </Route>
        <Route path="*" element={<Nomatch/>} />
        <Route element={<LayoutTicket/>}>
        <Route path={"/profile"} element={<ProtectedRoute><UserDet/></ProtectedRoute>} />
        <Route path={"/users"} element={<ProtectedRoute isAllowed={user?.roles.includes('admin')} redirectPath={'/my-tickets'}><UserDash/></ProtectedRoute>} />
        <Route path="/tickets" element={<ProtectedRoute><TicketDash /></ProtectedRoute>} />
        <Route path="/complete-tickets" element={<ProtectedRoute><CompleteTicket /></ProtectedRoute>} />
        <Route path="/my-tickets" element={<ProtectedRoute isAllowed={!user?.roles.includes('admin')} redirectPath={'/users'}><MyTicket /></ProtectedRoute>} />
        <Route path="/create-ticket" element={<ProtectedRoute><CreateTicket /></ProtectedRoute>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
