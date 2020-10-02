import React, { Component } from "react";
import "./ResheduleAppointmentMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Paper from '@material-ui/core/Paper';

class ResheduleAppointmentMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr"
    };
  }

  render() {
    const { Option } = Select;
    return (
      <div className="reschedule_header">
        <div className="reschedule_border_box">
          <p className="reschedule_title">Reshedule Appointments</p>
        </div>
        <Paper>
        {/* <ResheduleAppointmentTable/> */}
        </Paper>
      </div>
    );
  }
}
export default ResheduleAppointmentMaster;
