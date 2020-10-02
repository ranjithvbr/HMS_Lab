import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import Patient from '../../Images/11.jpg';
import CloseIcon from '@material-ui/icons/Close';
import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { apiurl } from "../../App";
import { Spin } from 'antd';


import "./UploadView.css";


export default class UploadView extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { cancel: null};
  // }

  state = {
    viewdata: this.props.viewdata,
    loader:false
  }

  formatTimeShow = (h_24) => {
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ':' + h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
  }

  deleteuploadtest = (data) => {
    console.log(data, "data")
    this.setState({loader:true})
    axios({
      method: 'delete', //get method 
      url: apiurl + "/deleteTestUploadResult",
      data: {
        "booking_id": data.booking_id,
        "test_id": data.test_id,
        "lab_id": 2

      }
    })
      .then((response) => {
        this.recallget(data.booking_id)
        this.props.getrecall("uploaded")
      })
  }

  recallget = (reloadid) => {
    axios({
      method: 'POST', //get method 
      url: apiurl + '/viewTestPendingResult',
      data: {
        "booking_id": reloadid
      }
    })
      .then((response) => {
        this.setState({ viewdata: response.data.data[0], propstostate: true,loader:false })
      })
  }

  render() {
    var { classes, onClose, cancel, selectedValue, ...other } = this.props;
    if (this.state.propstostate) {
      var { viewdata } = this.state
    } else {
      var { viewdata } = this.props
    }
    console.log(this.props.tab, "tab")
    // var viewdata = viewdata && viewdata[0]
    return (
      <Dialog
        aria-labelledby="simple-dialog-title"
        {...other}
        className="profile_modal"
        open={this.props.openuploadview}
      >
      <Spin className="spinner_align" spinning={this.state.loader}>

        <CloseIcon className="on_close" onClick={() => this.props.onClose()} />
        <div className="img_outline">
          <img src={viewdata && viewdata.profile_image} className="appointment" /></div>
        <div className="lab_dashboard_view">
          <div className="lab_details_container">
            <div className="lab_detailsdiv">
              <h3 className="patient_name">{viewdata && viewdata.customer}</h3>
              <p className="patient_age">{viewdata && viewdata.age + " " + "Years"}</p>
              <p className="patientappointment_details">Appointment Details</p>
              <div className="head_text_edit">
                {/* <div className="date_uploadetext_edit">
             <p className="uploadeddate_text_date">{this.props.tab==="upload" ?  "Uploaded Date" : "Test Date"}</p>
    <p className="date_text_date" >{this.props.tab==="upload" ? (viewdata && viewdata.uploaded_date && viewdata.uploaded_date) : (viewdata && viewdata.test_date && viewdata.test_date)}</p>
           </div>
           <div className="date_uploadetext_edit">
             <p className="uploadeddate_text_date">Time</p>
             <p className="date_text_date">{ this.props.tab==="upload" ?  (viewdata && viewdata.uploaded_time && this.formatTimeShow(viewdata.uploaded_time)):(viewdata && viewdata.test_time && this.formatTimeShow(viewdata.test_time))}</p>
           </div> */}

                <div className="date_uploadetext_edit">
                  <p className="uploadeddate_text_date">{"Uploaded Date"}</p>
                  <p className="date_text_date" >{viewdata && viewdata.test_date && viewdata.test_date}</p>
                </div>
                <div className="date_uploadetext_edit">
                  <p className="uploadeddate_text_date">Time</p>
                  <p className="date_text_date">{viewdata && viewdata.test_time && this.formatTimeShow(viewdata.test_time)}</p>
                </div>

              </div>


              <Divider className="dividerlist_root" />
              <div className="test_details_head">Test Details</div>
              <div className="test_report_container">

                {viewdata && viewdata.test_info && viewdata.test_info.map((data, id) => {
                  return (

                    <span>{data.test_result ? <div className="testdetails_upload"><p>
                      {data.test_name}
                      <a href={data.test_result} target="blank"><DescriptionIcon className="file_attach" /></a></p>
                      <DeleteIcon onClick={() => this.deleteuploadtest(data)} />
                    </div>
                      : <div className="testdetails_upload"><p>{data.test_name}</p></div>
                    }
                    </span>

                  )
                })}



              </div>
            </div>
          </div>
        </div>
        </Spin>

      </Dialog>

    );
  }
}
