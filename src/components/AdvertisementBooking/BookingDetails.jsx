/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable eqeqeq */
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox"
import Button from "@material-ui/core/Button";

import { Tabs } from 'antd';
import Checkbox from '@material-ui/core/Checkbox';

import './BookingDetails.css'

import { Upload, Icon, message } from 'antd';

import AdvertiseList from './AdvertiseList'

import UploadMedia from './UploadInstruction'
import Modalcomp from '../../helpers/ModalComp/Modalcomp'
import Calendar from '../Calendar/Calendar'

import { apiurl, imageUrl } from "../../App";
import Axios from "axios";
import { FiInfo } from "react-icons/fi";
import dateformat from 'dateformat';
import 'antd/dist/antd.css';
import { notification, Select } from 'antd';
import moment from 'moment';


const { Option } = Select;


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const key = 'updatable';

const openNotification = () => {
    notification.open({
        key,
        message: 'Notification Title',
        description: 'description.',
    });
}



var startDate = moment();
var startdate = moment(startDate).add(2, 'days').format('YYYY-MM-DD');

var enddate = moment(startdate);
export default class AdBooking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          
            open: false,
            edit: false,
            loading: false,
            imageChanged: false,
            data: [],
            placementLocation: [],
            sizeData: [],
            sizeCheck: "S",
            adfeeperday: "",
            adtotalcost: "",
            location: "",
            imageUrl: "",
            imageName: "",
            imagedata: [],
            adsize: "",
            ad_details: [],
            activeKey: "1",
            startdate: startdate,
            endDate:  enddate,
            checked:false,
            clickControl:false,
            minDate:startdate,

            startdateError: "",
            enddateError: "",
            sizeError: "",
            locationError: "",
            imageError: "",
            feeError: "",
            totalcostError: "",
            dateError:false,
            hidefilelist:false,
            totalDays:null
        }

        console.log("sdfsdafjlshjerhsdf", this.props)
    }


    callback = (key) => {

        if(key == 2 && this.state.edit) {
            this.resetFormValue()
        }

        this.setState({
            activeKey: key,
        });
    };

    // setTimeout= () => {
    // notification.open({
    //     key,
    //     message: 'New Title',
    //     description: 'New description.',
    // }), 1000
    // }


        getRangeData = (data) => {
          
            console.log(data,"getRangeData")
            if(data.enddate===null){
              
                this.setState({startdate:data.startdate},() => this.compareDate())
            }else{
                if(data.startdate<data.enddate){
                   
                this.setState({startdate:data.startdate,endDate:data.enddate},() => this.compareDate())
                }else{
                this.setState({startdate:data.enddate,endDate:data.startdate},() => this.compareDate())
                }
            }
                    
        }



    handleChange = info => {
      
// console.log("ajusfjdsfsdjhfljdsh",info)

        if(info.fileList.length == 0){
            let fileList = [...info.fileList];
       


            fileList = fileList.slice(-1);
            
          this.setState({ fileList,imagedata:fileList,hidefilelist:false, });

        }

        if(info.fileList.length > 0){

        if(info.fileList[0].type == "image/png" || info.fileList[0].type =="video/mp4"){
            
        let fileList = [...info.fileList];
       


        fileList = fileList.slice(-1);
    
    
        fileList = fileList.map(file => {
          if (file.response) {
    
            file.url = file.response.url;
          }
          return file;
        });
    
        this.setState({ fileList,imagedata:fileList,imageChanged: true,hidefilelist:false,imageError:false });
    } else{
        this.setState({open:true})
    }
}
    };



    changeTabFun = (data) => {
        console.log("asfshdfsdfksd",data)
        if(new Date (data.ad_start_date) < new Date() && new Date (data.ad_end_date) < new Date() ){
            notification.info({
                message:
                  'Advertisement expired',
                  placement:"topRight",
              });
        }else if(new Date (data.ad_start_date) < new Date() && new Date (data.ad_end_date) > new Date() ){
            notification.info({
                message:
                  "Advertisement already posted",
                  placement:"topRight",
              });
        }else{
        console.log("sdfjhdsjfhsldjfhdsfj", data)
        this.setState({
            activeKey: "1",
            editData: data,
            imageChanged: false,
            edit: true
        },() => this.storeadSize(this.state.editData.ad_size))

        // For Edit Data form filling
        var imgarr = data.ad_filename.split('/');
        var s = imgarr[imgarr.length - 1];
        var splitted = s.split('ad_filename');
        console.log(splitted[1].slice(4),"editurl")

        this.state.id = data.id
        this.state.startdate = dateformat(data.ad_start_date, "yyyy-mm-dd")
        this.state.endDate = dateformat(data.ad_end_date, "yyyy-mm-dd")
        this.state.adtotaldays = data.ad_total_days
        this.state.adsize = data.ad_size
        this.state.location = data.ad_location_id
        this.state.adfeeperday = data.ad_fee_per_day
        this.state.adtotalcost = data.ad_total_cost
        this.state.imagedata = [{name:splitted[1].slice(4)}]
        this.state.filename = splitted[1].slice(5);

        this.setState({})

        console.log("adfksgadfsgdlfhgdslfh",this.state.editData)
    }

    }


    changeSizeCheck = (data) => {
        this.setState({ sizeCheck: data });
    }


    componentWillMount() {

        this.handleChangeSize()
        this.handlePlacement()
        this.getAdBooking()
        // this.getRate(1,1)

    }

 uploadFile = (e) => {
     
        if(e.target.files[0].type == "image/png" || e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "video/mp4"){
            this.setState({
             imagedata:e.target.files[0],
             filename:e.target.files[0].name,
             type:e.target.files[0].type,
             mediaError:false,
             imageChanged: true,
             imageError:false 
            })
         }else {
            this.setState({open:true})
         }
    }



    handleChangeSize = () => {
        Axios({
            method: 'GET',
            url: apiurl + "/get_mas_size_master"
        })
            .then((response) => {//1..getting json response in another promise function called .then function
                var data = response.data
                console.log("BookingDetails -> checkSize -> data", data)

                if (data.status == 1) { //2.checking success response = 1

                    this.setState({ sizeData: data.data })
                    console.log("BookingDetails -> componentWillMount -> data", data)
                }
                // else{} 3.send the error response = 0
                console.log("sizeData", this.state.sizeData)
            })
    }


    handlePlacement = () => {
        Axios({
            method: 'GET',
            url: apiurl + '/get_mas_placement_location'

        })//if your using axios no need of conversion to json
            .then((response) => {//2.getting json response in another promise function called .then function

                console.log("sfdhjdsfghdsgfhfghsdf", response)
                var data = response.data
                console.log("response", data)

                //   console.log("RevenueMaster -> componentWillMount -> data", data)
                console.log("data", data)

                if (data.status == 1) {//checking success response = 0
                    this.setState({ placementLocation: data.data, location: data.data[0].id })
                }
                // else{} send the error response = 1
                console.log("placement_location", this.state.placementLocation)
            })
    }



    validation = () => {
        let startdateError = "";
        let enddateError = "";
        let sizeError = "";
        let locationError = "";
        let feeError = "";
        let totalcostError = "";
        let imageError = "";

        if (this.state.startdate === "") {
           
            startdateError = "Field Required"
        }

        if (this.state.endDate === "") {

            enddateError = "Field Required"
        }

        if (this.state.adsize === "") {
        
            sizeError = "Field Required"
        }

        if (this.state.location === "") {
    
            locationError = "Field Required"
        }

        if (this.state.adfeeperday === "") {
        
            feeError = "Field Required"
        }

        if (this.state.adtotalcost === "") {
            
            totalcostError = "Field Required"
        }

        if(this.state.imagedata.length == 0){
    
            imageError = "Field Required"
        }


        if (startdateError || enddateError || sizeError || locationError || feeError || totalcostError || imageError) {
            this.setState({
                startdateError,
                enddateError,
                sizeError,
                locationError,
                feeError,
                totalcostError,
                imageError

            })

            return false
        }

        return true
    }


    handleDrop = (data) => {
        if (data === 1) {
            this.setState({
                location: 1
            }, () => this.getRate(data,this.state.adsize))
        }

        if (data === 2) {
            this.setState({
                location: 2
            }, () => this.getRate(data,this.state.adsize))
        }
    }



    getRate = (data,size) => {
        console.log(data,size,"helloo")
        var ratedata = {
            "vendor_type_id": 2,
            "placement_location_id": data,
            "size_id": size
        }

        Axios({
            method: "POST",
            url: apiurl + '/get_ad_rate_vendor',
            data: ratedata
        }).then((response) => {
           
            this.setState({ adfeeperday: response.data.data[0].rate },() => this.checkHours())
        
        }).catch((err) => {

        })
    }




    handleSubmit = () => {

        console.log("sfjsdfjdshfjdshfsfdhsdf", this.state.imagedata)


        let formdata = new FormData();


        if (this.state.imageChanged === true) {
             formdata.append('imageArray',this.state.imagedata)
            // for (let i in this.state.imagedata) {
            //     formdata.append('imageArray', this.state.imagedata[i].originFileObj)
            //     console.log("formdafdsfsdf", this.state.imagedata[i].originFileObj)
            // }

        }

        console.log("adfeee",this.state.adfeeperday)
        // this.state.startdate = dateformat(data.ad_start_date, "yyyy-mm-dd")
        // this.state.endDate = dateformat(data.ad_end_date, "yyyy-mm-dd")

        formdata.set('adtitle', "Nurse")
        formdata.set('startdate', dateformat(this.state.startdate,"yyyy-mm-dd"))
        this.state.edit ? formdata.set('enddate', dateformat(this.state.endDate,"yyyy-mm-dd")) : formdata.set('endDate', dateformat(this.state.endDate, "yyyy-mm-dd"))
        formdata.set('adtotaldays', this.state.totalDays)
        formdata.set('adsize', this.state.adsize)
        formdata.set('adlocationId', this.state.location)
        formdata.set('adfeeperday', this.state.adfeeperday)
        formdata.set('adtotalcost', this.state.adtotalcost)

        !this.state.imageChanged && formdata.append('imageArray', [])
        !this.state.edit && formdata.set('advendorId', 2)
        !this.state.edit && formdata.set('createdby', 1)

        formdata.set('ipaddress', "126.183.0.1")

        !this.state.edit && formdata.set('activeflag', 1)

        formdata.set('modifiedby', 1)
        this.state.edit && formdata.set('ad_id', this.state.editData.id)


        const isValid = this.validation()


        if (this.state.edit === false && isValid && !this.state.dateError) {

            this.insertAdBooking(formdata)
        }

        if (this.state.edit === true && isValid && !this.state.dateError) {
            this.editAdBooking(formdata)
        }

        console.log("creator", formdata)
    }


    resetFormValue = () => {
             this.state.adfeeperday = "";
            this.state.location = "";
            this.state.adtotalcost = "";
            this.state.imageName = "";
            this.state.adsize = "";
            this.state.imagedata=[];
            this.state.startdate=this.state.minDate;
            this.state.endDate = this.state.minDate;
            this.state.feeError = false;
            this.state.totalcostError = false;
           
            this.state.filename = "";
            this.state.edit = false;

            this.handlePlacement()


            this.setState({})
    }

    // insert api
    insertAdBooking = (details) => {
    
        
      
        this.setState({clickControl:true})
        Axios({
            method: 'POST',
            url: apiurl + '/insertAdBooking',
            data: details
        }).then((response) => {

          
            this.getAdBooking();
            
            this.props.generateAlert("Advertisement added successfully")

            this.setState({clickControl:false})

            this.resetFormValue()

        


          
 
       

            this.setState({hidefilelist:true,recallget:true})

        }).catch((error) => {
            // alert(JSON.stringify(error))
        })
    }


    // Edit Api
    editAdBooking = (details) => {
        
        this.setState({clickControl:true})
        
        Axios({
            method: "POST",
            url: apiurl + "/editAdBooking ",
            data: details
        }).then((response) => {

            this.getAdBooking()
            this.props.generateAlert("Advertisement updated successfully")
            this.setState({activeKey:"2",edit:false,clickControl:false})
            this.resetFormValue()
           

        }).catch((error) => {
            // alert(JSON.stringify(error))
        })
    }


    //   get the ad details
    getAdBooking = () => {
        Axios({
            method: 'POST',
            url: apiurl + '/Common/getAd_Booking',
            data: {
                "vendor_id":"2",
                "limit": "10",
                "pageno": "1"
            }
        }).then((response) => {
            console.log("sdfjhsdfjhsdjfhsdjlfhdf", response.data.data)
            this.setState({
                ad_details: response.data.data[0].details
            }, () => console.log("sfdshfjsdhfjsdhfsdf", this.state.ad_details))
        }).catch((error) => {
            // alert(JSON.stringify(error))
        })
    }

    // 
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }





    changeData = (e, key) => {
        console.log("asfkjsdfhjskdhflkjsd", e)
        if (key === 'fee') {
            this.setState({
                adfeeperday: e.target.value
            }, () => this.setState({ feeError: false }))
        }

        if (key === 'total') {
            this.setState({
                adtotalcost: e.target.value
            }, () => this.setState({ totalcostError: false }))
        }


        if (key === 'location') {
            if (e === 'Category') {
                this.setState({
                    location: 2
                })
            }

            if (e === 'AppHome') {
                this.setState({
                    location: 1
                })
            }

        }

    }

    checkHours = () => {

        // this.getRate(this.state.location,this.state.adsize)

        var startDate = moment(this.state.endDate).format('DD')
        var endDate = moment(this.state.startdate).format('DD')
        var fromMonth = moment(this.state.startdate).format('MM');
        var toMonth = moment(this.state.endDate).format('MM');
        var current_year  =  moment().year();
        var to_year = moment(this.state.endDate).year()
    
    console.log("asfjsdhfjkshldfkhsdfljdsf",this.state.adfeeperday)
       
        console.log("sdfhsdjlk",fromMonth)
        console.log("sdfhsdjlk",toMonth)
    
       if(parseInt(fromMonth) < parseInt(toMonth)){
         
           var monthDiff = moment(this.state.endDate).format('MM') - moment(this.state.startdate).format('MM')
       }else if(parseInt(toMonth) < parseInt(fromMonth)){
           
        var monthabs = moment(this.state.startdate).format('MM') - moment(this.state.toDate).format('MM') - (12 * (to_year - current_year))
    
        var monthDiff = Math.abs(monthabs)
       }else if(parseInt(fromMonth) == parseInt(toMonth)) {
           var monthDiff = 0;
       }
    

        console.log("asfjksdhfjsdfhljsdfsd",monthDiff)
    
        var daysInMonth = 0;
        for(let i=0;i<monthDiff;i++){
          var filteredMonth = parseInt(fromMonth) + parseInt(i);
           daysInMonth += new Date(current_year,filteredMonth,0).getDate();
        }
    
       
    
    
       console.log("sdfjsdhfjsdhfljsdfhsdkjf",daysInMonth)
    
    
        
    
        if(parseInt(endDate) < parseInt(startDate)){
           var totalDays = moment(this.state.endDate).format('DD') - moment(this.state.startdate).format('DD') + daysInMonth+1;
           console.log("sdjfhsdlkjfhdsjf",totalDays)

           this.setState({totalDays})
        }else{
            console.log("sdjfhsdlkjfhdsjf",totalDays)
          var totalDays = daysInMonth+1 - (moment(this.state.startdate).format('DD') - moment(this.state.endDate).format('DD'));

          this.setState({totalDays})
        }
    
    
    
        var totalcost = totalDays * this.state.adfeeperday;
        console.log("asfkhsfksgdfhgdshgsdf",totalcost)

  
        this.setState({adtotalcost:totalcost})


       


      }
    


    datepickerChange = (data, key) => {
        if (key === 'startdate') {
            this.setState({
                startdate: data
            },() => this.compareDate())
        }
        if (key === 'enddate') {
            this.setState({
                endDate: data
            },() => this.compareDate())
        }
    }

    compareDate = () => {
        console.log(this.state.startdate,"arjsirusiodfsdjfsak;dfj")
        if(dateformat(this.state.startdate,'mm-dd-yyyy') <= dateformat(this.state.endDate,'mm-dd-yyyy')) {
             this.setState({dateError:false})
             this.checkHours()
        }else{
            this.setState({dateError:true})
        }
    }

    placementLocation = () => {
        let locations = [];
        for (let i = 0; i < this.state.placementLocation.length; i++) {
            console.log("asflsdhfljshdf", this.state.placementLocation[i])
            locations.push(<Option key={i + 1} value={this.state.placementLocation[i].id}>{this.state.placementLocation[i].placement_location}</Option>)
        }

        return locations;
    }


    storeadSize = (data) => {
        
        console.log("sdfjdshfjksdhfkjsdhf",data)
        this.setState({ adsize: data }, () =>  this.getRate(this.state.location,this.state.adsize),this.setState({sizeError:false}) )
       
    }



    render() {
        console.log("sdfkjsdfksdf", this.state.imagedata)
        const { TabPane } = Tabs;
        const props = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: this.handleChange,
            multiple: true,
          };

        return (
            <div className="booking_createlist booking_createlist--advertisement">
                <Grid container className="calendar_container" spacing={3}>
                    <Grid item xs={12} md={7} >

                        <Calendar
                            getDate={(data) => this.getRangeData(data)}
                            aftertwodays = {true}
                        />

                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Tabs defaultActiveKey="1" activeKey={this.state.activeKey} onChange={this.callback}>
                            <TabPane tab="Create Ad" key="1">
                                <Grid container>
                                    <Grid item xs={12} md={6} className="create_container">
                                        <div className="date_box_sizing">
                                            <Labelbox type="datepicker" labelname="Start Date" value={this.state.startdate}
                                            changeData={(date) => this.datepickerChange(date,'startdate')} minDate={this.state.minDate}
                                            /></div>
                                        <div className="validation__error">{this.state.startdateError && this.state.startdateError}</div>

                                        <div className="half_full_container">

                                            {
                                                this.state.sizeData.length > 0 && this.state.sizeData.map(checkingsize =>
                                                
                                                    <div className="ad__size">
                                                        <Checkbox checked={this.state.adsize == checkingsize.id ? true : false} value={this.state.edit ? this.state.adsize : checkingsize.ad_size} onChange={() => this.storeadSize(checkingsize.id)}

                                                        >
                                                        </Checkbox>
                                                        {checkingsize.size}
                                                    </div>
                                                   
                                                )}


                                        </div>

                                        <div className="validation__error--size">{this.state.sizeError && this.state.sizeError}</div>

                                        <div className="advertise_cost" style={{ marginTop: "2.3rem" }}>
                                            {/* <div style={{marginTop:"2rem"}}> */}
                                            <label className="fees_cost" >Fee / Day (KWD)</label>
                                            <input type="number" className="html__input" value={this.state.adfeeperday}></input>
                                        </div>

                                        <div className="validation__error">{this.state.adfeeperday === "" && this.state.feeError && this.state.feeError}</div>
                                    </Grid>

                                    <Grid item xs={12} md={6} className="create_container">
                                        <div className="date_box_sizing">
                                            <Labelbox type="datepicker" labelname="End Date" minDate={this.state.minDate}
                                                value={this.state.endDate} 
                                                changeData={(data) => this.datepickerChange(data,'enddate')}/>
                                        </div>
                                        <div className="validation__error--minus">{this.state.dateError && "enddate should be greater than startdate"}</div>
                                        <div className="validation__error">{this.state.enddateError && this.state.enddateError}</div>


                                        <div className="advertise_location">
                                            <label className="location_label">Placement Location</label>

                                            <Select className="select_location" onChange={(data) => this.handleDrop(data, 'location')}
                                                value={this.state.location}>

                                                {this.placementLocation()}
                                                
                                            </Select>
                                        </div>

                                        <div className="validation__error">{this.state.locationError && this.state.locationError}</div>

                                        <div className="advertise_cost--unique" >
                                            <p className="fees_cost">Total Cost (KWD)</p>
                                            <input type="number" className="html__input" value={this.state.adtotalcost} ></input>
                                        </div>
                                        <div className="validation__error">{this.state.adtotalcost === "" && this.state.totalcostError && this.state.totalcostError}</div>
                                    </Grid>

                                 
                                <Grid item xs={12} md={12} className="create_container">
                                <div className={`${this.state.hidefilelist && "advertise_uploadfile"} advertise_upload`}>
                                    <label>Upload Advertisement</label>
                                <span><FiInfo className="info_icon" onClick={this.handleOpen} /></span>

                                </div>



                                <div className="upload__container_advertise">
                                <input type="text" value={this.state.filename} className="html__input-box" placeholder="My image.jpg"  onClick={() => document.getElementById('getFile').click()} />
                                <div className="upload__container--btn">

                                <Button className="button_browse upload__pics--btn" onClick={() => document.getElementById('getFile').click()} >Browse</Button>
                                </div>
                                <input type="file" id="getFile" onChange={this.uploadFile} className="hideFile" />

                                </div>
                                <div className="validation__error">{this.state.imageError && this.state.imageError}</div>



                                </Grid>


                                    <Grid item xs={12} md={12} className="create_container">
                                        <div className="datebook_container">
                                            <Button className="datebook_button" onClick={!this.state.clickControl ? this.handleSubmit : null}

                                            > {this.state.edit === true ? "Update" : "Book"} </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </TabPane>

                            <TabPane tab="Ad List" key="2">
                                <AdvertiseList
                                    ad_details={this.state.ad_details} // list data
                                    getAdvertiseList={this.getAdBooking} // get api function
                                    changeTab={(data) => this.changeTabFun(data)}
                                />
                            </TabPane>
                        </Tabs>
                        <div></div>
                    </Grid>
                </Grid>

                <Modalcomp xswidth={"xs"} clrchange="textclr" title="UPLOAD INSTRUCTIONS" visible={this.state.open} closemodal={this.handleClose}>
                    <UploadMedia />
                </Modalcomp>
            </div>
        )
    }
}