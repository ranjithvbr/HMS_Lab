import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import "./ProfileView.css";
import Patient from '../../Images/11.jpg'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import Noimg from "../../Images/No_image_available.svg"

var moment = require('moment');



const styles = {};
export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancel: null };
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open=()=>
  {
  	this.setState({view:true})
  }
  onclose=()=>
  {
    this.setState({view:false})
  }

  formatTimeShow=(h_24)=> {
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
  }

  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    const {viewdata} = this.props 
    console.log(this.props.viewdata,"viewdata")

    return (
      <div className="lab_popup_details">
      
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          className="lab_profile_modal"
        >
          <CloseIcon className="on_close" onClick={()=>this.props.onClose()}/>
            <div>
              <img src={viewdata && viewdata.profile_image ? viewdata.profile_image : Noimg} className="lab"/>
            </div>
         <div className="lab_dashboard_view">
         <div className="lab_details_container">
            <div className="lab_detailsdiv">
    <h3 className="lab_name">{viewdata && viewdata.customer}</h3>
           <p className="lab_age">{viewdata && viewdata.age ? viewdata.age + " " + "Years" : 0 + " " + "Years" }</p>
           <p className="labappointment_details">Appointment Details</p>
           <div className="profileMaster_Dashfont">

             <div className="profileContainer_Dash">
               <div>Date</div>
               <div>{viewdata && moment(viewdata.test_date).format('DD MMM YYYY')}</div>
             </div>

             <div className="profileContainer_Dash">
               <div>Time</div>
               <div>{viewdata && this.formatTimeShow(viewdata.test_time)}</div>
             </div>

             <div className="profileContainer_Dash">
               <div>Test Name</div>
               <div>{viewdata && viewdata.test}</div>
             </div>
           
           {/* <div className="labappointment_details"><p className="labappointment_details">Date<span className="lab_date">{viewdata && moment(viewdata.test_date).format('DD MMM YYYY')}</span></p></div>
           <div className="labappointment_details-div"><p className="labappointment_details">Time<span className="lab_date">{viewdata && this.formatTimeShow(viewdata.test_time)}</span></p></div>
           <div className="labappointment_details-div"><p className="labappointment_details">Test Name<span className="lab_date">{viewdata && viewdata.test}</span></p></div> */}
           </div>
          
           {/* <div className="labappointment_details"><Button variant="contained" className="view_detailsbutton">View Details<ChevronRightIcon className="right_arrowview"/></Button></div> */}
           <Divider className="divider_root"/>
          
         </div>
         </div>
         </div>
        </Dialog>
        
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(ProfileView);
