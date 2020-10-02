import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppRouter from "./routers";
import MyUpload from "./components/UploadResult/Dummy";
import Login from "./components/Login/Login";
import ResetPassword from "./components/Login/ResetPassword";
import Forgot from "./components/Login/Forgot";
import Drawerpage from "./components/Drawer page/Drawerpage";

export const apiurl = "http://52.200.251.222:8158/api/v1";

function App() {
  return (
    <div>
      <Router basename="labmodule/?/">
        <Route path="/" component={Login} exact />
        <Route path={"/forgot"} component={Forgot} exact />
        <Route path="/resetpassword" component={ResetPassword} />
        <Route path="/Home" component={Drawerpage} />
      </Router>
    </div>
  );
}

export default App;
