import React, { Component } from 'react';
import Paper from '@material-ui/core/Card'
import Logo from '../../Images/Logo.png';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import './Forgot.css'
import Grid from '@material-ui/core/Grid';
import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Inbox from '../../Images/inbox.svg'
import {Link,NavLink} from "react-router-dom";
import Clinic from '../../Images/doctorlogin.png'

export default class Forgot extends Component {
 constructor(props)
  {
    super(props);
     this.state={password:"",hidden:true}
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
  resetPassword = () => {
    this.props.history.push("/resetpassword")
  }

    render() {
  
       return (
              <div className="pharmacy_forget_container">
              <Grid container>
              <Grid item xs={12} md={7} className="pharmacy_image_grid">
                    <div className="pharmacy_image_container">
                    <div className="pharmacy_image_div">
                    <div className="pharmacy_image_login">
                       <img src={Clinic} alt="1" className="pharmacy_image"/>
                         {/* <p className="pharmacy_text">PHARMACY</p> */}
                    </div>
                  </div>
                  </div>
                    </Grid>
               
       <Grid item xs={12} md={5} className="pharmacy_grid_container">
       <div className="pharmacy_main_container">
        
         <div className="pharmacy_paper_div">
              <div className="pharmacy_text_container">
              <div className="logo_container"><div className="logo_div"><img className="logo_image" src={Logo}/></div></div>
                 <div className="pharmacy_Welcometext-container"><p className="Welcometext">REQUEST NEW PASSWORD</p></div>
                {/*  <div className="password_text">Enter the current email address associated with your ONE MOMENT</div>
                 <div className="password_text">account, then click submit.We'll email you a link to a page where you can</div>
                 <div className="password_text">easily create a new password</div> */}
                 <div className="pas_msg">
                 Enter the current email address associated with your ONE MOMENT account, then click submit.We'll email you a link to a page where you can easily create a new password
                 </div>
                 
                 <div className="pharmacy_email_container"><TextField type="text" placeholder="divya@gmail.com"   onChange={this.onchange}  value={this.state.password} label="EMAIL"

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
          
                 
                 
                 <div className="pharmacy_submit_container"><a href=""><button className="login" component={Link} onClick={this.resetPassword}>Submit</button></a></div>

                 <div className="cancel_container"><a component={NavLink} href="/" className="cancelbutton">Cancel</a></div>
                </div>
                       </div>
                       </div>
              </Grid>
                    
                 
                </Grid>
                </div>
                      

                )
            }
        }
       