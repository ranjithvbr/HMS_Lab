import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Tabs,notification } from 'antd';
import Checkbox from '@material-ui/core/Checkbox';
// import Report from '../../images/report.jpg'
import './BookingDetails.css'
import DealList from './DealList'
import Calendar from '../Calendar/Calendar'
import Axios from "axios";
import { apiurl } from "../../App";
import ValidationLibrary from '../../helpers/validationfunction';
import dateformat from 'dateformat';
import {Select} from 'antd';


const {Option} = Select;

export default class BookingDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            serviceType: [],
            serviceTypeAll:false,
            edit:false,
            activeKey: "1",
            serviceTypeAll: false,
            dealOption: "M",
            deal_valid_from: new Date(),
            deal_valid_to: new Date(),
            dealActive: false,
            afteredit: false,
            valideToerror:false,
            dateError:false,
            servicetype: 1,
            services:[],
            serviceTypeValue:"All",
            bookingDetails: {
               
                'deal_title': {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'deal_amt': {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                }
            }
        }

        console.log("consptops",this.props)
    }
    callback = (key) => {

        if(key == 2 && this.state.edit) {
            this.resetFormValue()
        }

        this.setState({
            activeKey: key
        })
    }
    changeTabFun = (data) => {
        console.log("asfshdfsdfksd",data)
        if(new Date (data.deal_valid_from) < new Date() && new Date (data.deal_valid_to) < new Date() ){
            notification.info({
                description:
                  'Deals expired',
                  placement:"topRight",
              });
        }else if(new Date (data.deal_valid_from) < new Date() && new Date (data.deal_valid_to) > new Date() ){
            notification.info({
                description:
                  "Deals already posted",
                  placement:"topRight",
              });
        }else{
        console.log(data, "editdata")
        this.setState({
            edit: true,
            activeKey: "1",
            editData: data,
           
        },() => this.svalue(data))
        // For Edit Data form filling
        // this.state.bookingDetails.service_type.value =   data.deal_service_type == "" ? "All" : data.deal_service_type;
        this.state.bookingDetails.deal_title.value = data.deal_title
        this.state.bookingDetails.deal_title.error = null
        this.state.bookingDetails.deal_title.errmsg = null


        // this.state.serviceTypeValue = data.deal_service_type
        // this.state.serviceTypeId = data.deal_service_type_id;
        this.state.bookingDetails.deal_amt.value = data.deal_amount
        this.state.bookingDetails.deal_amt.error = null
        this.state.bookingDetails.deal_amt.errmsg = null

        
        this.state.dealActive = data.deal_active === 1 ? true : false
        this.state.dealOption = data.deal_options === "Amount" ? "M" : "F"
        this.state.deal_valid_from = dateformat(data.deal_valid_from, "yyyy-mm-dd")
        this.state.deal_valid_to = dateformat(data.deal_valid_to, "yyyy-mm-dd")
        
        this.setState({})
    }

    }

    svalue = (data) => {
      

        let wtf = data.deal_service_type == "" ? "All" : data.deal_service_type;
        wtf == "All" ? this.setState({serviceTypeAll:false}) : this.setState({serviceTypeAll:true})
        console.log("arjundsfsdfdsf",wtf)
        this.setState({serviceTypeValue:wtf,edit:true,servicetype:this.state.editData.deal_service_type_id})
    
        this.setState({})
    }

    compareDate = () => {
       
        if(dateformat(this.state.deal_valid_from,'mm-dd-yyyy') <= dateformat(this.state.deal_valid_to,'mm-dd-yyyy')) {
             this.setState({dateError:false})
           
        }else{
            this.setState({dateError:true})
        }
    }


    componentWillMount() {
        this.getServiceType()
    }

    getServiceType = () => {
        Axios({
            method: "POST",
            url: apiurl + "/get_mas_lab_test",
            data: {
                "lab_vendor_id":"2"
            },
          })
            .then((response) => {
              console.log(
                response.data.data.map((val) => {
                  return { id: val.lab_test_id, serviceType: val.lab_test_name };
                }),
                "sadfasdf"
              );
              this.setState(
                {
                  serviceType: response.data.data.map((val) => {
                    return { id: val.lab_test_id, serviceType: val.lab_test_name };
                  }),
                },
                () => this.state.serviceType.unshift({ id: 1, serviceType: "All" })
              );
      
              this.setState({});
              // self.state.serviceType=response.data.data.map((val)=>{return{id:val.id,serviceType:val.service_type}})
            })
            .catch((error) => {
            //   alert(JSON.stringify(error));
            });
    }

    checkValidation = () => {
        var bookingDetails = this.state.bookingDetails;
        var bookingKeys = Object.keys(bookingDetails);
        console.log(bookingKeys);
        for (var i in bookingKeys) {
            var errorcheck = ValidationLibrary.checkValidation(bookingDetails[bookingKeys[i]].value, bookingDetails[bookingKeys[i]].validation);
            console.log(errorcheck);
            bookingDetails[bookingKeys[i]].error = !errorcheck.state;
            bookingDetails[bookingKeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = bookingKeys.filter((obj) =>
            bookingDetails[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0 || this.state.dateError ) {
           
            this.setState({ error: true})
        } else {

            this.setState({ error: false })
            // if(new Date(this.state.deal_valid_from) >= new Date(this.state.deal_valid_to)){
            // }else{
            this.onSubmitData()
            // }
        }
        this.setState({ bookingDetails })
    }
    changeDynamic = (data, key) => {
        var bookingDetails = this.state.bookingDetails;
        var errorcheck = ValidationLibrary.checkValidation(data, bookingDetails[key].validation);
        bookingDetails[key].value = data;
        bookingDetails[key].error = !errorcheck.state;
        bookingDetails[key].errmsg = errorcheck.msg;
        this.setState({ bookingDetails });
        if (key === "service_type" && data === 1) {
            var Data = [];
            this.state.serviceType.map(val => val.id > 1 && Data.push(val.id))
            console.log(Data.toString(), "myData")
            this.setState({
                serviceTypeAll: Data.toString()
            })
        }
        this.setState({})
    }

    changeDealOption = (data) => {
      
        console.log(data,"dataradio")
        this.setState({ dealOption: data });
    }

    dealActiveCheck = (e) => {
        console.log(e.target.checked, "mytargetValue")
        this.setState({
            dealActive: e.target.checked
        })
    }

    getRangeData = (data) => {
        console.log(data,"getRangeData")
        if(data.enddate===null){
            this.setState({deal_valid_from:data.startdate},() => this.compareDate())
        }else{
            if(data.startdate<data.enddate){
            this.setState({deal_valid_from:data.startdate,deal_valid_to:data.enddate},() => this.compareDate())
            }else{
            this.setState({deal_valid_from:data.enddate,deal_valid_to:data.startdate},() => this.compareDate())
            }
        }
    }


    services = () => {
        let services = [];
        for(let i=0;i<this.state.serviceType.length;i++) {
            services.push(<Option value={this.state.serviceType[i].id}>{this.state.serviceType[i].serviceType}</Option>)
          
        }

        return services;

    }

    onSubmitData = () => {
        var serviceId = !this.state.edit && !this.state.serviceTypeAll 

        var data = [];
        if(!this.state.serviceTypeAll) {
            this.state.serviceType.map(val => val.id > 1 && data.push(val.id))    
        }

        console.log("sajkdfhjskdfhkdsjh",this.state.servicetype)
        var bookingDetails = {
            userId: 1,
            dealvendorId: 2,
            dealservicetypeId: this.state.serviceTypeAll ? this.state.servicetype : data,
            dealtitle: this.state.bookingDetails.deal_title.value,
            dealvalidfrom: dateformat(this.state.deal_valid_from, "yyyy-mm-dd"),
            dealvalidto: dateformat(this.state.deal_valid_to, "yyyy-mm-dd"),
            dealoptions: this.state.dealOption === "M" ? "Amount" : "Percentage",
            dealamount: this.state.bookingDetails.deal_amt.value,
            dealactive: this.state.dealActive === true ? 1 : 0,
            ipaddress: this.state.myIpAddress,
            activeflag: 1,
            createdby: 1,
            createdon: dateformat(new Date(), "yyyy-mm-dd"),
            modifiedby: 1,
            modifiedon: dateformat(new Date(), "yyyy-mm-dd"),
        }
        if (this.state.edit === false) {
            this.bookingDetailsInsertApi(bookingDetails)
        } else {
            this.bookingDetailsEditApi(bookingDetails)
        }
    }
    // Once form submitted successfully then form resets happens here
    resetFormValue = () => {
        return (

            // this.state.bookingDetails.service_type.value="",
            this.state.bookingDetails.deal_title.value = "",
            this.state.deal_valid_from = dateformat(new Date(), "yyyy-mm-dd"),
            this.state.deal_valid_to = dateformat(new Date(), "yyyy-mm-dd"),
            this.state.dealOption = "M",
            this.state.bookingDetails.deal_amt.value = "",
            this.state.serviceTypeValue = "All",
            this.state.dealActive = false,
            this.setState({})
        )
    }

    bookingDetailsInsertApi = (bookingDetails) => {

        this.setState({clickControl:true})
        Axios({
            method: 'POST',
            url: apiurl + '/insertDeals',
            data: {
                ...bookingDetails
            }
        }).then((response) => {
            console.log(response)
            this.resetFormValue()
            this.getDealsList()
            this.setState({afteredit: true,clickControl:false})
            notification.info({
                description:
                  'Record Added Successfully',
                  placement:"topRight",
              });

        }).catch((error) => {
            // alert(JSON.stringify(error))
        })
    }


    bookingDetailsEditApi = (bookingDetails) => {
        this.setState({clickControl:true})
        Axios({
            method: "PUT",
            url: apiurl + "/editDeals",
            data: {
                Id: this.state.editData.id,
                ...bookingDetails
            }
        }).then((response) => {
            this.resetFormValue()
            this.getDealsList()
            this.setState({ afteredit: true, activeKey: "2",edit:false,clickControl:false})
           
            
            notification.info({
                description:
                  'Record Updated Successfully',
                  placement:"topRight",
              });

        }).catch((error) => {
            // alert(JSON.stringify(error))
        })
    }

    // For Update purpose we are using this function here (if we try use this in dealList.jsx then we cant update automatically the list)
    getDealsList = () => {
        var data = {
          vendor_id:2,
          limit: 100,
          pageno: 1,
        };
        Axios({
          method: "POST",
          url: apiurl + "/Common/getsingle_deals",
          data: data,
        })
          .then((response) => {
            this.setState(
              {
                dealsList: response.data.data[0].details,
              },
              () => console.log("safskjdfhjsdkahfjksdfhljskd", this.state.dealsList)
            );
          })
          .catch((error) => {
            // alert(JSON.stringify(error));
          });
      };

    changedateFun = (data, name) => {
        this.setState({ [name]: data },() => this.compareDate())
    }


    storeService = (data) => {
        if(data == 1) {
            this.setState({serviceTypeAll:false})
        }else{
        this.setState({servicetype:data,serviceTypeAll:true,serviceTypeValue:data})
        }
    }

 

    render() {
        const { TabPane } = Tabs;

        var editValue = this.state.edit
        
        console.log(this.state.serviceTypeValue,"deal_valid_from")
        return (
            <div className="booking_createlist">
                <Grid container>
                    <Grid item xs={12} md={7}>
                        <Calendar
                            getDate={(data) => this.getRangeData(data)}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} >
                        <Tabs defaultActiveKey={"1"} activeKey={this.state.activeKey} onChange={this.callback}>
                            <TabPane tab="Create Deals" key={"1"}>
                                <Grid container spacing={2} className="deal_container">
                                    <Grid item xs={6} md={6}>
                                  
                                                <div>
                                                    <label className="label_txt">Test Name</label>
                                                <Select value={this.state.serviceTypeValue}   style={{width:"100%"}} onChange={this.storeService}>
                                                    {this.services()}
                                                </Select>
                                                </div>
                             </Grid>
                                    <Grid item xs={6} md={6}>
                                    <Labelbox
                                            type="text"
                                            labelname="Deal Title"
                                            valuelabel={'deal_title'}
                                            changeData={(data) => this.changeDynamic(data, 'deal_title')}
                                            value={this.state.bookingDetails.deal_title.value}
                                            error={this.state.bookingDetails.deal_title.error}
                                            errmsg={this.state.bookingDetails.deal_title.errmsg}
                                        />
                                    </Grid>

                                    <Grid item xs={6} md={6}>
                                    <Labelbox
                                            type="datepicker"
                                            labelname="Valid From"
                                            value={this.state.deal_valid_from}
                                            changeData={(data) => this.changedateFun(data, 'deal_valid_from')}
                                            disablePast={true}
                                        />
                                    </Grid>

                                    <Grid item xs={6} md={6}>
                                    <Labelbox
                                    type="datepicker"
                                    labelname="Valid To"
                                    value={this.state.deal_valid_to}
                                    changeData={(data) => this.changedateFun(data, 'deal_valid_to')}
                                    disablePast={true}
                                    />
                                   <div className="validation__error--minus">{this.state.dateError && "enddate should be greater than startdate"}</div>
                                    </Grid>

                                    <Grid item xs={6} md={6}>
                                    <div className="radio_buttons">
                                            <Labelbox
                                                labelname="Deal Options"
                                                type="radio"
                                                checked={this.state.dealOption}
                                                changeGender={(data) => this.changeDealOption(data)}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={6} md={6}>
                                        <div className="deal_radiopercent">
                                    <Labelbox
                                            type="number"
                                            labelname={this.state.dealOption === "M" ? "Deal Amount" : "Deal Percentage"}
                                            valuelabel={'deal_amt'}
                                            changeData={(data) => this.changeDynamic(data, 'deal_amt')}
                                            value={this.state.bookingDetails.deal_amt.value}
                                            error={this.state.bookingDetails.deal_amt.error}
                                            errmsg={this.state.bookingDetails.deal_amt.errmsg}
                                        />
                                            <div className="deal_kwdalign">
                                            {this.state.dealOption === "M" ? "KWD" : "%"}
                                            </div>
                                            </div>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={12}>
                                    <div className="Deal_activecheck">
                                        <div>
                                    <Checkbox className="Deal_active_check" checked={this.state.dealActive} onChange={(e) => this.dealActiveCheck(e)} /><span>Deal Active</span>
                                    </div>


                                    <div className="createbutton-container">
                                            <Button className="create_cancel" onClick={this.resetFormValue}>Cancel</Button>
                                            <Button className="media_save" onClick={!this.state.clickControl ? this.checkValidation : null}>
                                                {
                                                    this.state.edit === true ? "Update" : "Save"
                                                }
                                            </Button>
                                    </div>

                                    </div>
    
       

                                    </Grid>

                                </Grid>
                            </TabPane>
                            <TabPane tab="Deals List" key="2">
                                <DealList
                                    aftereditfalse={()=>this.setState({afteredit:false})}
                                    dealsList={this.state.dealsList} // list data
                                    getDealsList={this.getDealsList} // get api function
                                    serviceType={this.state.serviceType} // dropdown val
                                    changeTab={(data) => this.changeTabFun(data)} // for automatically change the tab
                                    afteredit={this.state.afteredit}
                                />
                            </TabPane>
                        </Tabs>
                        <div></div>
                    </Grid>

                </Grid>
            </div >
        )
    }
}