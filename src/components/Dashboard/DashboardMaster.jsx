import React, { Component } from "react";
import DashboardTable from "./DashboardTable";
import { Input, Select, Icon } from 'antd';
import dateFormat from 'dateformat';
import Paper from '@material-ui/core/Paper';
const current_date=(dateFormat(new Date(),"dd mmm yyyy"))
export default class DashboardMaster extends Component {

  
  render() {
    const { Search } = Input;
    console.log(dateFormat(new Date(),"dd mmm yyyy"))
    return (
      <div >
        <Paper>
        <div className="dashboard_header">
              <div className="dashboard_title">LAB DASHBOARD</div>           
          </div>
        <DashboardTable />
        </Paper>
      </div>
    );
  }
}
