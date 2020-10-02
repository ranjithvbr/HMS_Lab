/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";

import './AdvertiseList.css'


import Workflow from '../../Images/workflow.svg'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Half from '../../Images/Full.svg';
import Full from '../../Images/half.svg';

import DeleteMedia from './DeleteMedia'
import Modalcomp from '../../helpers/ModalComp/Modalcomp'
import Axios from 'axios';
// import apiservice from '../../helpers/apiservices'
import { apiurl } from "../../App";
import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';
import Stepper from './Stepper'
import ReactPagination from "../Pagination/Pagination";
import NotfoundIcon from "../../Images/NotFound.svg";
import { Spin } from "antd"



const data = [
    { month: 'Jan.', count: 69, city: 'tokyo' }
];
const scale = {
    month: { alias: 'Month', },
    count: { alias: 'Sales', },
};



export default class AdvertiseList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
             open: false,
             del_id:"",
             ad_details:[],
             total_count:"",
             limit:5,
             pageno:1,
             dataOnload: true
    }

    console.log("asdfkjsadhfkjsdsd",this.props)
}


getAdBooking = () => {
    Axios({
        method: 'POST',
        url: apiurl + '/getAdBooking',
        data:{
            "doctorid":"2",
            "limit":this.state.limit,
            "pageno":this.state.pageno
        }
    }).then((response) => {
        this.setState({
            ad_details: response.data.data[0].details,
            total_count:response.data.data[0].total_count,
            dataOnload: false
        },() => console.log("sfdshfjsdhfjsdhfsdf",this.state.total_count))
    }).catch((error) => {
        alert(JSON.stringify(error))
    })
}


componentWillMount() {
    console.log("sdfjshadfkhlasdkfjhdsj",this.props)
    // this.props.getAdvertiseList()
    this.getAdBooking()
}

componentWillReceiveProps(props){
 
this.setState({
    ad_details:props.ad_details
})
console.log("asdfkjsadhfkjsdsdprops",this.props)
}


getAdDetails = (data) => {
    
    Axios({
        method: 'POST',
        url: apiurl + '/Common/getAd_Booking',
        data:{
            "vendor_id":"2",
            "limit":this.state.limit,
            "pageno":data+1
        }
    }).then((response) => {
        console.log("sdfjhsdfjhsdjfhsdjlfhdf",response.data.data[0].total_count)
        this.setState({
            ad_details: response.data.data[0].details,
        },() => console.log("sdfsdhfejdhfdsf",this.state.ad_details))
    }).catch((error) => {
        // alert(JSON.stringify(error))
    })
}

    handleOpen = (data) => {
        this.setState({ open: true,del_id:data })
    }
    handleClose = () => {
        this.setState({ open: false })
    }


    handleChange = event => {
        this.setState({ id: event.target.value });
      }


      handleDelete = (details) => {
        Axios({
            method: 'POST',
            url: apiurl + '/deleteAdBooking',
            data: {
                doctorid: 2,
            }
        }).then((response) => {
            console.log(response)
            // this.resetFormValue()
            this.getAdDetails()
    
        }).catch((error) => {
            // alert(JSON.stringify(error))
        })
        console.log("deletedetails", details)
    }

    workflowopen=(id)=>{
        if(this.state.workflowopen===id){
            this.setState({
                workflowopen:null
            })
        }else{
        this.setState({
            workflowopen:id
        })
    }
    }


    render(){
        console.log("sdfjskdhfjsdkhfds",this.props)
        return(
            <Spin className="spinner_align" spinning={this.state.dataOnload}>
          {this.state.ad_details.length === 0 ? <div className={"noFoundIconCenter_ad"}><img src={NotfoundIcon} /><div>No Data Found</div></div>:
          <>

            <div className="location_add_container">    
            {
                this.state.ad_details && this.state.ad_details.length > 0 &&
                                this.state.ad_details.map((bookingDetails,index) => {
                                    console.log("sadfdshfjshdfjdfsh",bookingDetails)
              
                    return(
                        <div className="Ad_location_container">
                        <div className="advertise_addlist_items">
                      
                            <div>
                                <div className="advertise_contentSpace">
                                    <label className="list_head">Ad Location</label>
                            <h5 className="list_subhead">{bookingDetails.ad_location}</h5>
                                </div>
                                
                                <div className="advertise_contentSpace">
                                    <label className="list_head">Days</label>
                            <h5 className="list_subhead">{bookingDetails.ad_total_days}</h5>
                                </div>
                                
                            </div>
    
    
                            <div>
                            <div className="advertise_contentSpace">
                                    <label className="list_head">Start Date</label>
                            <h5 className="list_subhead">{bookingDetails.ad_start_date}</h5>
                                </div>
                                
                                <div className="advertise_contentSpace">
                                    <label className="list_head">Fee / Day <span className="advertise_kwdsmall">(KWD)</span></label>
                                    <h5 className="list_subhead">{bookingDetails.ad_fee_per_day}</h5>
                                </div>
                            </div>
                            <div>
                            <div className="advertise_contentSpace">
                                    <label className="list_head">End Date</label>
                                    <h5 className="list_subhead">{bookingDetails.ad_end_date}</h5>
                                </div>
                                
                                <div className="advertise_contentSpace">
                                    <label className="list_head">Total Cost <span className="advertise_kwdsmall">(KWD)</span></label>
                                    <h5 className="list_subhead">{bookingDetails.ad_total_cost}</h5>
                                </div>
                            </div>
    
                                <div>
                                    <div className="advertise_image"> <img src={bookingDetails.ad_size == "1" ? Half : Full} /> </div>
                                    <p className="image_size">{bookingDetails.ad_size == "1" ? "Half" : "Full"}</p>
                                    {/* <h5 className="full_half_div">{bookingDetails.ad_filename}</h5> */}
                                        <div>
                                            <img src={Workflow} className="listdelete_icon" onClick={(id)=>this.workflowopen(bookingDetails.id)} />
                                            <EditIcon className="list_edit" 
                                            onClick={() => this.props.changeTab(bookingDetails)}
                                            />
                                            <DeleteIcon className="listdelete_icon" 
                                            onClick={() => this.handleOpen(bookingDetails.id)} />
                                        </div>
                                    {/* <img src={Full}/> */}
                                </div>
    
                        </div>
                       {this.state.workflowopen === bookingDetails.id && <Stepper businessDays={bookingDetails} />}
                       
                    </div>
                    
                    )
                })}


            </div>
        
         {this.state.total_count !== "" && this.state.total_count > 10 &&
         <div className="pagination__container">
            <div className="pagination__box">
                    <ReactPagination  limit={this.state.limit} total_count={this.state.total_count} getAdDetails={this.getAdDetails} />
            </div>
        </div>
       }
         

                <div>
                 
                        <Modalcomp xswidth={"xs"} clrchange="textclr" 
                        title="Delete Advertisement" visible={this.state.open} closemodal = {this.handleClose}>

                            <DeleteMedia  delid={this.state.del_id} listName="advertisement" getAdvertiseList={this.getAdBooking}
                            loader={(data)=>this.setState({dataOnload:data})}
                            apiendpoint={"deleteAdBooking"} generateAlert={this.props.generateAlert}
                                           
                                            closemodal = {this.handleClose} />
                        </Modalcomp>
                </div>
                </>
    }


                </Spin>


       
               
                    
            
        )
    }
}