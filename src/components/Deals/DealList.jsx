import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
// import Stepper from "../AdvertisementBooking/Stepper";
import Workflow from "../../Images/workflow.svg";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import DeleteMedia from "./DeleteMedia";
import NotfoundIcon from "../../Images/NotFound.svg";
import { apiurl } from "../../App";
import axios from 'axios';
import { notification, Spin } from "antd"

import "./DealList.css";

import ReactPagination from "../Pagination/Pagination";
var moment = require('moment');


export default class DealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
     name: "",
     open: false,
     openstepper:[],
     dyndeallist:[],
     dyndealAlllist:[], 
     total_count:"",
     limit:10,
    };
  }

  handleOpen = (id) => {
    this.setState({ open: true,currentDeleteId:id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount(){
    this.getlistdata()
  }
  
  // Unsafe_componentWillReceiveProps(){
  //   if(this.props.afteredit){
  //   this.getlistdata()
  //   }
  // }


  getPaginateList=(data)=>{
    this.setState({dataOnload:true})
    var self = this
    axios({
        method: 'post',
        url: apiurl + "/Common/getsingle_deals",
        data:{
          "vendor_id":"2", 
          "limit": this.state.limit, 
          "pageno":data+1
          
        } 
    })
    .then((response) => {
      console.log(response.data.data[0].total_count,"response_data")
      var dyndeallist= []
      var dyndealAlllist= [];

      this.setState({total_count:response.data.data[0].totalCount})

      response.data.data[0].details.map((listdata)=>{
        dyndealAlllist.push(listdata)
        dyndeallist.push(
          <>
                    <Grid item xs={12} md={12}>
              <Paper className="dyndeallistPaper">
                <div className="aligndeallistdata">
                  <div>
                    <span>Test Name</span>
                    <div>{listdata.deal_service_type == "" ? "All" : listdata.deal_service_type}</div>
                    
                    
                  </div>
                  <div>
                    <span> Start Date</span>
                    <div>{moment(listdata.deal_valid_from).format('DD-MM-YYYY')}</div>
                  </div>
                  <div>
                    <span>End Date</span>
                    <div>{moment(listdata.deal_valid_to).format('DD-MM-YYYY')}</div>
                  </div>
                  <div>
                    <span>{listdata.deal_options==="Amount"?"Amount":"Percentage"}</span>
        <div>{listdata.deal_amount}{" "}{listdata.deal_options==="Amount"?"KWD":"%"}</div>
                  </div>
                </div>
                <div className="aligndeallistdataRow2">
                  <div className={"titleDealFlex"}>
                  <div className={"listTitleWidth"}>
                    <span>Title</span>
                <div>{listdata.deal_title}</div>
                  </div>
                  <div>
                    <span>Deal</span>
                <div className="view">{listdata.deal_active==1?"Active":"Inactive"}</div>
                  </div>
                  </div>
                  <div className="iconsdiv">
                  {/* <img src={Workflow} alt="error" onClick={()=>this.openstepper(listdata.id)} /> */}
                  <EditIcon className="edit_icon_div" onClick={()=>this.props.changeTab(listdata)}/>
                  <DeleteIcon
                    className="delete_icon_div"
                    onClick={()=>this.handleOpen(listdata.id)}
                  />
                </div>
                </div>

                <div>
                {/* {this.state.openstepper.includes(listdata.id) && <Stepper /> } */}
                </div>

                                           
      
  
              </Paper>
  
            </Grid>
          </>
        )
      })

      // if(notifymsg){
      //   notification.info({
      //     description:notifymsg,
      //       placement:"topRight",
      //   });
      // }

      self.setState({dyndeallist:dyndeallist,dyndealAlllist:dyndealAlllist,dataOnload:false})
      
    })
  }

  UNSAFE_componentWillReceiveProps(newprops){
        if(newprops.afteredit){
    this.getlistdata()
    newprops.aftereditfalse()
    }
  }



  getlistdata=(notifymsg)=>{
    this.setState({dataOnload:true})
    var self = this
    axios({
        method: 'post',
        url: apiurl + "/Common/getsingle_deals",
        data:{
          "vendor_id":"2", 
          "limit": this.state.limit, 
          "pageno":1
          
        } 
    })
    .then((response) => {
      console.log(response.data.data,"response_data")
      var dyndeallist= []
      var dyndealAlllist= [];

      this.setState({total_count:response.data.data[0].totalCount})

      response.data.data[0].details.map((listdata)=>{
        dyndealAlllist.push(listdata)
        dyndeallist.push(
          <>
                    <Grid item xs={12} md={12}>
              <Paper className="dyndeallistPaper">
                <div className="aligndeallistdata">
                  <div>
                    <span>Test Name</span>
                    <div>{listdata.deal_service_type == "" ? "All" : listdata.deal_service_type}</div>
                    
                    
                  </div>
                  <div>
                    <span> Start Date</span>
                    <div>{moment(listdata.deal_valid_from).format('DD-MM-YYYY')}</div>
                  </div>
                  <div>
                    <span>End Date</span>
                    <div>{moment(listdata.deal_valid_to).format('DD-MM-YYYY')}</div>
                  </div>
                  <div>
                    <span>{listdata.deal_options==="Amount"?"Amount":"Percentage"}</span>
        <div>{listdata.deal_amount}{" "}{listdata.deal_options==="Amount"?"KWD":"%"}</div>
                  </div>
                </div>
                <div className="aligndeallistdataRow2">
                  <div className={"titleDealFlex"}>
                  <div className={"listTitleWidth"}>
                    <span>Title</span>
                <div>{listdata.deal_title}</div>
                  </div>
                  <div>
                    <span>Deal</span>
                <div className="view">{listdata.deal_active==1?"Active":"Inactive"}</div>
                  </div>
                  </div>
                  <div className="iconsdiv">
                  {/* <img src={Workflow} alt="error" onClick={()=>this.openstepper(listdata.id)} /> */}
                  <EditIcon className="edit_icon_div" onClick={()=>this.props.changeTab(listdata)}/>
                  <DeleteIcon
                    className="delete_icon_div"
                    onClick={()=>this.handleOpen(listdata.id)}
                  />
                </div>
                </div>

                <div>
                {/* {this.state.openstepper.includes(listdata.id) && <Stepper /> } */}
                </div>

                                           
      
  
              </Paper>
  
            </Grid>
          </>
        )
      })

      if(notifymsg){
        notification.info({
          description:notifymsg,
            placement:"topRight",
        });
      }

      self.setState({dyndeallist:dyndeallist,dyndealAlllist:dyndealAlllist,dataOnload:false})
      
    })
  }

  openstepper = (id) => {

    if(this.state.openstepper.find((removeid)=>{return removeid===id})){
      this.state.openstepper.splice(this.state.openstepper.findIndex((findindex)=>{return findindex===id}),1)
      this.recallForOpen()
    }else{
      this.state.openstepper.push(id)
      this.recallForOpen()
    }
    this.setState({})

  }

  recallForOpen=()=>{
    var dyndeallist= []

    this.state.dyndealAlllist.map((listdata)=>{
      dyndeallist.push(
        <>
                  <Grid item xs={12} md={12}>
            <Paper style={{ marginBottom: "10px" }}>
              <div className="aligndeallistdata">
                <div >
                  <span>Service Type</span>
                  {/* <div>{listdata.deal_title}</div> */}
                  <div>{""}</div>
                </div>
                <div>
                  <span> Start Date</span>
                  <div>{moment(listdata.deal_valid_from).format('DD-MM-YYYY')}</div>
                </div>
                <div>
                  <span>End Date</span>
                  <div>{moment(listdata.deal_valid_to).format('DD-MM-YYYY')}</div>
                </div>
                <div>
                  <span>Amount</span>
                  <div>{listdata.deal_amount}</div>
                </div>
              </div>
              <div className="aligndeallistdataRow2">
                <div className={"titleDealFlex"}>
                <div className={"listTitleWidth"}>
                  <span>Title</span>
              <div>{listdata.deal_title}</div>
                </div>
                <div>
                  <span>Deal</span>
              <div className="view">{listdata.deal_active==1?"Active":"Inactive"}</div>
                </div>
                </div>
                <div className="iconsdiv">
                {/* <img src={Workflow} alt="error" onClick={()=>this.openstepper(listdata.id)} /> */}
                <EditIcon className="edit_icon_div" onClick={()=>this.props.changeTab(listdata)}/>
                <DeleteIcon
                  className="delete_icon_div"
                  onClick={()=>this.handleOpen(listdata.id)}
                />
              </div>
              </div>
              <div>
              {/* {this.state.openstepper.includes(listdata.id) && <Stepper /> } */}
              </div>

            </Paper>

          </Grid>
        </>
      )
    })

    this.setState({dyndeallist:dyndeallist})
    
  }

  deleteDealLIst=()=>{
    this.setState({dataOnload:true,open: false})
    var self=this
    axios({
      method:'DELETE',
      url: apiurl+'/deleteDeals',
      data:{
        "id":this.state.currentDeleteId
      }
    })
    .then((response)=>{
      self.getlistdata("Deal Deleted Successfully")
    })
  }


  render() {
    console.log(this.state.openstepper,"openstepper")

    return (
        <Spin className="spinner_align" spinning={this.state.dataOnload}>

        {this.state.dyndeallist.length === 0 ? <div className={"noFoundIconCenter_ad"}><img src={NotfoundIcon} /><div>No Data Found</div></div>:

      <div className="deal_list_paper_maincontainer">
        <Grid container>
      {this.state.dyndeallist}
        </Grid>
        
        <Modalcomp
          xswidth={"xs"}
          clrchange="textclr"
          title="Delete Deals"
          visible={this.state.open}
          closemodal={this.handleClose}
        >
          <DeleteMedia closemodal={this.handleClose} deleteitem={this.deleteDealLIst} closeDeleteModel={this.handleClose}/>
        </Modalcomp>
      </div>}
      {this.state.total_count !== "" && this.state.total_count > 10 &&
      <div className="pagination__container">
            <div className="pagination__box">
                    <ReactPagination  limit={this.state.limit} total_count={this.state.total_count} getAdDetails={this.getPaginateList} />
            </div>
        </div>
  }
      </Spin>
    );
  }
}