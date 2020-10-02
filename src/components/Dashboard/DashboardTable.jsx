import React, { Component } from "react";
import "./DashboardTable.css";
import Card from "@material-ui/core/Card";
import { NavLink, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Clientsmodal from "../UploadResult/clientsmodal";
import axios from 'axios';
import { apiurl } from "../../App";
import ProfileView from "./ProfileView"
import dateformat from 'dateformat';
import { Spin } from "antd"


export default class DashboardTable extends Component {
  state = {
    openview: false,
    tableData:[],
    loading:true,
  };


  componentDidMount(){
    var self = this
    axios({
      method: 'post',
      url: apiurl + '/Dashboard',
      data: {
        lab_id: 2,
        date: dateformat(new Date(), "yyyy-mm-dd"),
        period: "day"
      }
    })
    .then((response) => {
      console.log(response,"response_data")

      var tableData = [];
      var tableDatafull = [];
      var total_appointments = []
      var Manage_test = []
      var cancel_count = []
      var totalrevenue = []

      response.data.data.map((data,index) => {
        console.log(data.dashboard,"resdata")
        // tableDatafull.push(val)
        total_appointments.push(data.dashboard.total_appointments)
        Manage_test.push(data.dashboard.Manage_test)
        cancel_count.push(data.dashboard.cancel_count)
        totalrevenue.push(data.dashboard.totalrevenue)

    })

    response.data.data && response.data.data[0] && response.data.data[0].today_appointments.map((val,index) => {
            tableData.push({
              name: val.customer,
              // test: val.test,
              time: this.formatTimeShow(val.test_time),
              charge: val.Charge,
              id:index
            })
            tableDatafull.push(val)
        })

        self.setState({
          tableData:tableData,
          tableDatafull:tableDatafull,
          total_appointments:total_appointments,
          Manage_test:Manage_test,
          cancel_count:cancel_count,
          totalrevenue:totalrevenue,
          loading:false

        })
    })
}

  modelopen = (data,id) => {
    if (data === "view") {
      this.setState({ openview: true,viewdata:this.state.tableDatafull[id] });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  formatTimeShow=(h_24)=> {
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
  }

  render() {
    console.log(this.state.total_appointments,"total_appointments")
    return (
      <Spin className="spinner_align" spinning={this.state.loading}>
        <div>
          <div className="lab_dashboard_buttons_wrap">
            <Card
              component={NavLink}
              to="/Home/AppointmentsList"
              className="lab_button5 lab_button_common_styles"
            >
              <span className="lab_button_text">Total Appointments</span>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="lab_dash_numeric_wrap">
    <p className="lab_dash_numeric_value">{this.state.total_appointments && this.state.total_appointments.length !== 0 ? this.state.total_appointments[0] : 0}</p>
              </div>
            </Card>
            <Card
              component={NavLink}
              to="/Home/Test"
              className="lab_button1 lab_button_common_styles"
            >
              <span className="lab_button_text">Manage Test</span>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="lab_dash_numeric_wrap">
                <p className="lab_dash_numeric_value">{this.state.Manage_test && this.state.Manage_test.length !== 0 ? this.state.Manage_test[0] : 0}</p>
              </div>
            </Card>
            <Card
              component={NavLink}
              to="/Home/CancelAppointments"
              className="lab_button3 lab_button_common_styles"
            >
              <span className="lab_button_text">Cancelled</span>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="lab_dash_numeric_wrap">
                <p className="lab_dash_numeric_value">{this.state.cancel_count && this.state.cancel_count.length !== 0 ? this.state.cancel_count[0] : 0}</p>
              </div>
            </Card>
            <Card
              component={NavLink}
              to="/Home/Revenue"
              className="lab_button2 lab_button_common_styles"
            >
              <span className="lab_button_text">Total Revenue(KWD)</span>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="lab_dash_numeric_wrap">
                <p className="lab_dash_numeric_value">{ this.state.totalrevenue && this.state.totalrevenue[0] !== null ?this.state.totalrevenue[0] : 0}</p>
              </div>
            </Card>
          </div>
        </div>

        <div className="todaysappointment_edit">
          <span className="todays_appointment">
            <b>Today's Appointment</b>
          </span>{" "}
          <span>{dateformat(new Date(), "dd mmm yyyy")}</span>
        </div>
        <div>
          <Tablecomponent
            heading={[
              { id: "", label: "S.No" },
              { id: "name", label: " Customer" },
              // { id: "test", label: "Test Name" },
              { id: "time", label: "Time" },
              { id: "charge", label: "Charge(KWD)" },
              { id: "", label: "Action" },
            ]}
            rowdata={this.state.tableData && this.state.tableData}
            EditIcon="close"
            DeleteIcon="close"
            modelopen={(e,id) => this.modelopen(e,id)}
            props_loading={false}
          />

          {/* <Modalcomp  visible={this.state.openview} title={"CLIENTS"} closemodal={(e)=>this.closemodal(e)}>          
       < Clientsmodal />
        </Modalcomp> */}

<ProfileView open={this.state.openview} onClose={this.closemodal} viewdata={this.state.viewdata}/>


          {/* <Modalcomp
            visible={this.state.openview}
            title={"Edit details"}
            closemodal={(e) => this.closemodal(e)}
            xswidth={"xs"}
          >
          </Modalcomp> */}
        </div>
        <div className="page_button_container">
          <div className="butt_container">
            <Button
              component={NavLink}
              to="/Home/mediauploads"
              className="lab_dash_bottom_buttons lab_dash_bottom2"
            >
              Media Upload
            </Button>
            <Button
              component={NavLink}
              to="/Home/advertisementbooking"
              className="lab_dash_bottom_buttons lab_dash_bottom3"
            >
              Advertisement Booking
            </Button>
          </div>
        </div>
      </Spin>
    );
  }
}
