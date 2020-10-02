import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import ListView from "./ListView";
import axios from 'axios';
import { apiurl } from "../../App";
import dateformat from 'dateformat';

import "./AppointmentsTable.css";

class Approvalmanagement extends React.Component {
  state = {
    openview: false,
    tableData:[],
    tableDatafull:[],
  };

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

  componentDidMount(){
    
    var self = this
    axios({
        method: 'POST', //get method 
        url: apiurl + '/getTestAppointmentList',
        data:{
          "lab_id": "2",
          "date": dateformat(new Date(), "yyyy-mm-dd"),
          "period": "Day",
          "date_to":dateformat(new Date(), "yyyy-mm-dd")
        }
    })
    .then((response) => {
      console.log(response,"response_data")

      var tableData = [];
      var tableDatafull = [];
        response.data.data.map((val,index) => {
            tableData.push({
              name: val.customer,
              // test: val.test,
              date: dateformat(val.test_date, "dd mmm yyyy"),
              time: val.uploaded_time ? val.uploaded_time : '-',
              id:index
            })
            tableDatafull.push(val)
        })

        self.setState({
          tableData:tableData,
          tableDatafull:tableDatafull,
          props_loading:false
        })
    })
}

UNSAFE_componentWillReceiveProps(newProps){
  console.log(newProps,"newProps")
  this.setState({
    tableData:newProps.weekMonthYearData,
    tableDatafull:newProps.wk_Mn_Yr_Full_Data,
    search:newProps.searchData,
  })
}

    
formatTimeShow=(h_24)=> {
  var h = Number(h_24.substring(0, 2)) % 12;
  if (h === 0) h = 12;
  return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
}

  render() {
    const searchdata = []
    this.state.tableDatafull.filter((data,index) => {
      console.log(data,"datadata")
      if (this.state.search === undefined || this.state.search === null){
        searchdata.push({
            name: data.customer,
            // test: data.test,
            date: dateformat(data.test_date, "dd mmm yyyy"),
            time: data.test_time ? this.formatTimeShow(data.test_time) : '-',
          id:index
          })
      }
      else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase()) || data.test_date !== null && data.test_date.toLowerCase().includes(this.state.search.toLowerCase()) || data.test_time !== null && this.formatTimeShow(data.test_time).toLowerCase().includes(this.state.search.toLowerCase())) {
        searchdata.push({
          name: data.customer,
          // test: data.test,
          date: dateformat(data.test_date, "dd mmm yyyy"),
          time: data.test_time ? this.formatTimeShow(data.test_time) : '-',
        id:index
        })
      }
  })
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "name", label: " Customer Name" },
            // { id: "test", label: "Test Name" },
            { id: "date", label: "Date" },
            { id: "time", label: "Time" },
            { id: "", label: "Action" },
          ]}
          rowdata={searchdata}
          EditIcon="close"
          DeleteIcon="close"
          modelopen={(e,id) => this.modelopen(e,id)}
          props_loading={this.state.props_loading}

        />
        <ListView open={this.state.openview} onClose={this.closemodal} viewdata={this.state.viewdata}  />
      </div>
    );
  }
}
export default Approvalmanagement;
