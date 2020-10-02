import React, { Component } from 'react';
import Paper from '@material-ui/core/Card'
import Logo from '../../Images/Logo.png';
import TextField from '@material-ui/core/TextField';
import './Login.css'
import Grid from '@material-ui/core/Grid';
import Eye from '../../Images/eye.svg'
import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Inbox from '../../Images/inbox.svg'
import {Link,NavLink} from "react-router-dom";
import Pharmacy from '../../Images/doctorlogin.png'

export default class Login extends Component {
  constructor(props)    
  {
    super(props);
     this.state={password:"",hidden:true,draweropen:false}
  }
  toggleshow=()=>
  {
    this.setState({hidden:!this.state.hidden})
    console.log("i am clicked",this.state.hidden)
  }
  onchange=(e)=>
  {
    this.setState({password:e.target.value})
  }

  draweropen=()=>{
    this.setState({
      draweropen:true
    })
    this.props.history.push("/Home/Dashboard");
  }
  fogotpush = () => {
    this.props.history.push("/forgot")
  }

    render() {
  
       return (<div>
          {this.state.draweropen===false&&
              <div className="pharmacy_login_container">
              <Grid container>
              <Grid item xs={12} md={6} className="pharmacy_image_grid">
                    <div className="pharmacy_image_container">
                    <div className="pharmacy_image_div">
                    <div className="pharmacy_image_login">
                    <div>
                       <img src={Pharmacy} alt="1" className="pharmacy_image"/>
                        {/* <p className="pharmacy_text">PHARMACY</p> */}
                        </div>
                    </div>
                  </div>
                  </div>
                    </Grid>
               
       <Grid item xs={12} md={6} className="pharmacy_grid_container">
       <div className="pharmacy_main_container">
        
         <div className="pharmacy_paper_div">
              <div className="pharmacy_text_container">
              <div className="logo_container"><div className="logo_div"><img className="logo_image" src={Logo}/></div></div>
                 <div className="pharmacy_Welcometext-container"><p className="Welcometext">WELCOMES YOU</p></div>
                 <div className="pharmacy_email_container"><TextField   type="text"  placeholder="divya@gmail.com"  label="EMAIL"

                  InputProps={{
    endAdornment: (
      <InputAdornment>
        <IconButton>
          <img className="inbox_icon" src={Inbox}/>
        </IconButton>
      </InputAdornment>
    )
  }}/>
                 </div>
                 
                 <div className="password_container"><TextField  type={this.state.hidden ? "password" : "text"} onChange={this.onchange}  value={this.state.password} placeholder="" className="trrainer_password" label="PASSWORD"  
                 
                  InputProps={{
    endAdornment: (
      <InputAdornment>
        <IconButton>
          <img className="logineye_icon" src={Eye} onClick={this.toggleshow}/>

        </IconButton>
      </InputAdornment>
    )
  }}/> 
                 
                 </div>
                 <div className="login_button_container">
                 <button className="login" onClick={this.draweropen} >Login</button>
                 </div>
                 <div className="cancel_container">
                  
                     <p className="cancelbutton" onClick={this.fogotpush}>Forgot Password?</p>
                    
                   </div>
                </div>
                       </div>
                       </div>
              </Grid>
                    
                 
                </Grid>
                </div>}
                </div>
                      

                )
            }
        }
       