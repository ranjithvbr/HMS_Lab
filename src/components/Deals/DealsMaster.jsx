import React, { Component } from "react";
import BookingDetails from "./BookingDetails";
import { Paper } from "@material-ui/core";

export default class DealsMaster extends Component {
  render() {
  
    return (
      <div>
        <Paper>
          <div className="dashboard_header">
            <div className="dashboard_title">DEALS</div>
          </div>
          <BookingDetails />
        </Paper>
      </div>
    );
  }
}
