import React, { Component } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import './AdvertisementMaster.css'
import Moment from "react-moment";
import { Input } from "antd";
import Button from '@material-ui/core/Button';
import Plus from '../../Images/plus.png'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import dateFormat from 'dateformat';
import Labelbox from "../../helpers/labelbox/labelbox";
import Paper from "@material-ui/core/Paper";
// import Calendar from './Calendar';
import BookingDetails from './BookingDetails'
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import { apiurl } from "../../App";
import Axios from "axios";

const current_date=(dateFormat(new Date(),"dd mmm yyyy"))

class AdvertisementMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",
      data:[],
      
    };
  }
componentWillMount(){
    Axios({
      method: 'POST',
      url: apiurl+"/getDoctorClinics",
      data: {"doctorId":"2",}
      
    })//if your using axios no need of conversion to json
    .then((response) =>{//2.getting json response in another promise function called .then function
      // console.log("response",data)
      var data=response.data;
      console.log("RevenueMaster -> componentWillMount -> data", data)
      
      if(data.status==0){//checking success response = 0
        this.setState({data: data.data})
      }
      // else{} send the error response = 1
    })
}
  render() {
    const { Option } = Select;
    const { Search } = Input;
    console.log(dateFormat(new Date(),"dd mmm yyyy"))
    return (
      <div className="doctor_dashboard">
          <Paper>
          <div className="advertise_heading_edit">
          <div className="titleuser">ADVERTISEMENT BOOKING</div>
  
            {/* <div  className="advertisement_clinic_container">
 
               <label className="clinic_label">Clinic</label>
               <select className="select_drop" style={{width:"150px", height:"30px"}} type="drop down">{
                 this.state.data.map(clinic => <option value="data.value">{clinic.clinicName}</option>)}
                </select>
            </div>           */}
          </div>
          <BookingDetails generateAlert={this.props.generateAlert} />
          </Paper>
          </div>
      
    );
  }
}

export default AdvertisementMaster;
