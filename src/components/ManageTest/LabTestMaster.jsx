import React, { Component } from "react";
import plus from "../../Images/plus.png";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
// import LabTestMaster from "./LabTestMaster";
import LabTestTable from "./LabTestTable";
import Moment from "react-moment";
import { Input, Select, Icon } from 'antd';
import dateFormat from 'dateformat';
import TestView from "../ManageTest/TestView";
const current_date=(dateFormat(new Date(),"dd mmm yyyy"))

export default class LabTestMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      callgetapi:false,
    };
  }
  handleClickopen = () => {
    this.setState({ open: true});
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };
  callget=(data)=>{
    this.setState({
      callgetapi:data
    })
  }

  render() {
    const { Search } = Input;
    console.log(dateFormat(new Date(),"dd mmm yyyy"))
    return (
      <div>
        <div className="dashboard_header">
              <div className="dashboard_title">MANAGE TEST</div>
           
              <div style={{fontSize:"16px"}}>
              
              {/* <Moment format="DD-MMM-YYYY" className="mr-4 ml-4"></Moment> */}
            <Search
              placeholder=" search "
              onSearch={value => console.log(value)}
              style={{ width: 150 }}
              onChange={(e) => this.setState({ searchData: e.target.value })}
              />
                <img
                  className="plus-icon"
                  src={plus}
                  style={{ width: 40 }}
                  className="mr-4 ml-5"
                  onClick={this.handleClickopen}
                />
                
              </div>
          </div>
      
        
       <LabTestTable getdatacall={this.state.callgetapi} falsegetmethod={()=>this.setState({callgetapi:false})} searchData={this.state.searchData} />
        <div className="Upload-modal-container">
          <Modalcomp
            visible={this.state.open}
            closemodal={this.handleClickclose}
            title={"TEST ENTRY"}
          >
            
          <TestView visible={this.state.open}
            closemodal={this.handleClickclose}
            callget={(data)=>this.callget(data)}
            />
          </Modalcomp>
        </div>
      </div>
    );
  }
}

















