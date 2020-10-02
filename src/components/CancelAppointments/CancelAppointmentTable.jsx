import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import axios from 'axios';
import { apiurl } from "../../App";
import dateformat from 'dateformat';

import "./CancelAppointmentTable.css";

var moment = require('moment');

class CancelAppointmentTable extends React.Component {
  state = {
    openview: false,
    tableData:[],
    tableDatafull:[],
  };

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  UNSAFE_componentWillReceiveProps(newProps){
    this.setState({
      tableData:newProps.weekMonthYearData,
      tableDatafull:newProps.wk_Mn_Yr_Full_Data,
      search:newProps.searchData,
    })
  }

  componentDidMount(){
    var self = this
    axios({
        method: 'POST', //get method 
        url: apiurl + '/getPatientTestCancelled',
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
              Bookdate: moment(val.book_date).format('DD MMM YYYY'),
              Canceldate: moment(val.cancel_date).format('DD MMM YYYY'),
              time:"-",
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
          Bookdate: moment(data.book_date).format('DD MMM YYYY'),
          Canceldate: moment(data.cancel_date).format('DD MMM YYYY'),
          time:data.cancel_date?dateformat(new Date(data.cancel_date), "hh:MM TT"):"-",
          id:index
          })
      }
      else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase()) || data.book_date !== null && data.book_date.toLowerCase().includes(this.state.search.toLowerCase()) || data.cancel_date !== null && data.cancel_date.toLowerCase().includes(this.state.search.toLowerCase()) || data.cancel_date !== null && dateformat(new Date(data.cancel_date), "hh:MM TT").toLowerCase().includes(this.state.search.toLowerCase())) {
        searchdata.push({
          name: data.customer,
          // test: data.test,
          Bookdate: moment(data.book_date).format('DD MMM YYYY'),
          Canceldate: moment(data.cancel_date).format('DD MMM YYYY'),
          time:data.cancel_date?dateformat(new Date(data.cancel_date), "hh:MM TT"):"-",
          id:index
        })
      }
  })
  console.log(searchdata,"searchdata")
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "name", label: "Customer" },
            // { id: "test", label: "Test Name" },
            { id: "Bookdate", label: "Booked Date" },
            { id: "Canceldate", label: "Cancelled Date" },
            { id: "time", label: "Time" },
          ]}
          rowdata={searchdata}
          actionclose="close"
          modelopen={(e) => this.modelopen(e)}
          props_loading={this.state.props_loading}
        />

        <Modalcomp
          visible={this.state.openview}
          title={"View details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>

        <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>
      </div>
    );
  }
}

export default CancelAppointmentTable;
