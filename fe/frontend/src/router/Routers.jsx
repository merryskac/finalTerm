import { Route, Routes, BrowserRouter } from "react-router-dom";
import Authorization from "../config/Authorization";
import Content from "../content/content";
import Detail from "../content/contentDetail";
import Dashboard from "../dashboard/dashboard";
import Login from "../login/Login";
import Logout from "../logout/logout";
import Register from "../register/register";

const Routers = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/content" element={<Authorization><Content/></Authorization>} />
        <Route path="/content/:id" element={<Authorization><Detail/></Authorization>} />
        <Route path='/logout' element={<Logout/>} />
      </Routes>
    </BrowserRouter>
   );
}
 
export default Routers;