import React from "react";
import CloseIcon from '@material-ui/icons/Close';
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import dateformat from 'dateformat';

import "./ListView.css";

import Patient from '../../Images/11.jpg';

const styles = {};

export default class AppointmentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancel: null };
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open = () => {
    this.setState({ view: true })
  }
  onclose = () => {
    this.setState({ view: false })
  }

  formatTimeShow=(h_24)=> {
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
  }


  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    console.log(this.props.viewdata, "viewdata")
    const { viewdata } = this.props
    console.log("asfkjhdsfkjhdsfkjhds",viewdata)

    return (
      // <div className="doctor_popup_details">

      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
        className="profile_modal"
      >
        <CloseIcon className="on_close" onClick={this.props.onClose} />
        <div className="img_outline">
          <img src={viewdata && viewdata.profile_image} className="appointment" />
        </div>
        <div className="doctor_dashboard_view">
          <div className="doctor_details_container">
            <div className="doctor_detailsdiv">
              <h3 className="appointment_name">{viewdata && viewdata.customer}</h3>
              <p className="appointment_age">{viewdata && viewdata.age + " " +"Years"}</p>
              <p className="appointment__details appointment_master">Appointment Details</p>

              <div className="appointment__detailsdiv"><p className="appointment__details">Date</p><p className="appointment_date">{dateformat(viewdata && viewdata.test_date, "dd mmm yyyy")}</p></div>
              <div className="appointment__detailsdiv"><p className="appointment__details_info">Time</p><p className="appointment_date">{viewdata && viewdata.test_time ? this.formatTimeShow(viewdata.test_time) : "--"}</p></div>
              <div className="appointment__detailsdiv"><p className="appointment__details_infotest">Test Name</p><p className="appointment_date">{viewdata && viewdata.test}</p></div>

              <Divider className="dividerlist_root" />

            </div>
          </div>
        </div>
      </Dialog>

      // </div> 
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(AppointmentView);
