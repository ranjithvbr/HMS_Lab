import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./ViewMedia.css";
// import uploadimage from "../../images/upload-button.png";
// // import View from "../../Images/11.jpg";
// import Stepper from "../StepperStatus/Stepper";
// import { Player } from 'video-react';

export default class ViewMedia extends Component {
  state={
    type:""
  }
  render() {
    const {viewData,viewopenModal} = this.props
    console.log(viewData,"viewwww_datattata")
     return (
      <div >
        {/* {" "} */}
        <div style={{ textAlign: "center"}}>
         <div style={{ fontSize: "14px" }}>{this.props.viewData.media_title}</div>
         <p className="media_upload_view_modal">
           {this.props.viewData.is_active == 1 ?"Active" : "Non Active"}
           </p>
        </div>
        <Grid container>
          <Grid item xs={12} md={12} className="media_title_container">
          
            
          {viewData.media_type.toLowerCase() === "video" && 
          <div className="profile_media_div">
           
            <video src = {this.props.viewData.media_filename} type="video/mp4" controls className="img_uploader_edit"/>
            
 
          </div>
  }

        {viewData.media_type.toLowerCase() === "image" &&
             
      
           <div className="profile_media_div">
           
            <img src = {viewData.media_filename} className="img_uploader_edit" alt="break"/>


          </div>
           
  }
          </Grid>
          {/* <Grid item xs={12} md={6} className="media_title_container">
             <div className="stepper__container">
            <Stepper />
            </div>
          </Grid> */}
        </Grid>
      </div>
    );
  }
}