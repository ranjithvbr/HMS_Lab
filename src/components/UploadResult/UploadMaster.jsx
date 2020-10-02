import React, { Component } from "react";
import { Select,notification } from "antd";
import Moment from "react-moment";
import UploadDetails from "./UploadDetails";
import Paper from "@material-ui/core/Paper";
import { Input } from "antd";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import ReactSVG from "react-svg";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ReactExport from 'react-data-export';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactToPrint from "react-to-print";
import PrintData from "./printdata";
import axios from 'axios';
import { apiurl } from "../../App";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ResultView from "./ResultView";
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import { Spin } from 'antd';
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import dateformat from 'dateformat';


import "./UploadMaster.css"


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


class UploadMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false,
      date: "rrr",
      tableData:[],
      weekMonthYearData:[],
      wk_Mn_Yr_Full_Data:[],
      uploaddata:[],
      spinner:false,
    };
  }

  generatepdf=()=>{
    var tabindex = this.state.tabindex
    if(this.state.weekMonthYearData.length===0){
      notification.info({
        description:
          'No Data Found',
          placement:"topRight",
      });
    }
    else{
    const doc = new jsPDF("a4")
    var bodydata  = []
    this.state.weekMonthYearData.map((data,index)=>{
      bodydata.push([index+1,data.name,data.date,data.time,data.status.props.children])
    })
    doc.autoTable({
      beforePageContent: function(data) {
        doc.text(`${tabindex?'Pending Details':'Upload Deatails'}`, 15, 23);
        },
      margin: { top: 30 },
      showHead:"everyPage",
      theme:"grid",
      head: [['S.No', 'Customer',`${tabindex?"Test Date":'Uploaded Date'}`,'Time','Status']],
      body:bodydata,
    })
     
    doc.save(`${tabindex?'PendingDetails.pdf':'UploadDeatails.pdf'}`)
  }
  }

  componentDidMount(){
    var endpoint = this.state.tabindex?"/getTestPendingResult":'/getTestUploadResult'
    var self = this
    axios({
        method: 'POST', //get method 
        url: apiurl + endpoint,
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
          if(endpoint==='/getTestUploadResult'){
            tableData.push({
              name: val.customer,
              // test: val.test,
              date: dateformat(val.test_date, "dd mmm yyyy"),
              time: this.formatTimeShow(val.test_time),
            status: <span className="uploader_clrgreen">{val.status}</span>,
            id:val.booking_id
            })
          }else{
            tableData.push({
              name: val.customer,
              // test: val.test,
              date: dateformat(val.test_date, "dd mmm yyyy"),
              time: val.test_time ? this.formatTimeShow(val.test_time) :'-',
            status: <span className="pending_clrred">{val.status}</span>,
            action:<div className="browseAndVisi"><OpenInBrowserIcon onClick={()=>this.openresultModel(index)} /><VisibilityIcon onClick={()=>this.openuploadForpending(index)}/></div>,
            id:val.booking_id
            })
          }
            tableDatafull.push(val)
        })

        self.setState({
          weekMonthYearData:tableData,
          wk_Mn_Yr_Full_Data:tableDatafull,
        })
    })
}

formatTimeShow=(h_24)=> {
  var h = Number(h_24.substring(0, 2)) % 12;
  if (h === 0) h = 12;
  return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
}

dayReport=(data)=>{
    this.setState({spinner:true,selectedDatepen:data})
  console.log(data,"itemdaterange")
  var startdate = dateformat(data[0].startDate, "yyyy-mm-dd")
  var enddate = dateformat(data[0].endDate, "yyyy-mm-dd")
  var endpoint = this.state.tabindex?"/getTestPendingResult":'/getTestUploadResult'
    var self = this
    axios({
        method: 'POST', //get method 
        url: apiurl + endpoint,
        data:{
          "lab_id": "2",
          "date": startdate,
          "period": "Day",
          "date_to":enddate
        }
    })
    .then((response) => {
      console.log(response,"response_data")

      var tableData = [];
      var tableDatafull = [];
        response.data.data.map((val,index) => {
          if(endpoint==='/getTestUploadResult'){
            tableData.push({
              name: val.customer,
              // test: val.test,
              date: dateformat(val.test_date, "dd mmm yyyy"),
              time: this.formatTimeShow(val.test_time),
            status: <span className="uploader_clrgreen">{val.status}</span>,
            id:val.booking_id
            })
          }else{
            tableData.push({
              name: val.customer,
              // test: val.test,
              date: dateformat(val.test_date, "dd mmm yyyy"),
              time: val.test_time ? this.formatTimeShow(val.test_time) :'-',
            status: <span className="pending_clrred">{val.status}</span>,
            action:<div className="browseAndVisi"><OpenInBrowserIcon onClick={()=>this.openresultModel(index)} /><VisibilityIcon onClick={()=>this.openuploadForpending(index)}/></div>,
            id:val.booking_id
            })
          }
            tableDatafull.push(val)
        })

        self.setState({
          weekMonthYearData:tableData,
          wk_Mn_Yr_Full_Data:tableDatafull,
          spinner:false,
          propsopen:true,
        })
    })
}

//   weekFun=()=>{
//     this.setState({spinner:true})
//     var self = this
//     var endpoint = this.state.tabindex?"/getTestPendingResult":'/getTestUploadResult'
//     axios({
//         method: 'POST', //get method 
//         url: apiurl + endpoint,
//         data:{
//           "lab_id":"2",
//           "date":"",
//           "period":"Week",  
//           }     
//     })
//     .then((response) => {
//       console.log(response,"response_dataweek")

//       var weekData = [];
//       var weekDatafull = [];
//       response.data.data.map((val,index) => {
//         weekDatafull.push(val)
//         if(endpoint==='/getTestUploadResult'){
//         weekData.push({
//           name: val.customer,
//           test: val.test,
//           date: val.test_date,
//           time: val.uploaded_time,
//         status: <span className="uploader_clrgreen">{val.status}</span>,
//         id:index
//         })
//       }else{
//         weekData.push({
//           name: val.customer,
//           test: val.test,
//           date: val.test_date,
//           time: val.uploaded_time ? val.uploaded_time : '-',
//         status: <span className="pending_clrred">{val.status}</span>,
//         action:<div className="browseAndVisi"><OpenInBrowserIcon onClick={()=>this.openresultModel(index)} /><VisibilityIcon /></div>,
//         id:index
//         })
//       }
//       })
//       self.setState({weekMonthYearData:weekData,tableData:weekData,wk_Mn_Yr_Full_Data:weekDatafull,spinner:false})
//   })
// }

// monthFun=()=>{
//   this.setState({spinner:true})

//   var self = this
//   var endpoint = this.state.tabindex?"/getTestPendingResult":'/getTestUploadResult'

//   axios({
//       method: 'POST', //get method 
//       url: apiurl + endpoint,
//       data:{
//         "lab_id":"2",
//         "date":"",
//         "period":"Month",  
//         }     
//   })
//   .then((response) => {
//     console.log(response,"response_data")

//     var MonthData = [];
//     var MonthDatafull = [];
//     response.data.data.map((val,index) => {
//       MonthDatafull.push(val)
//       if(endpoint==='/getTestUploadResult'){
//       MonthData.push({
//         name: val.customer,
//         test: val.test,
//         date: val.test_date,
//         time: val.uploaded_time,
//       status: <span className="uploader_clrgreen">{val.status}</span>,
//       id:index
//       })
//     }else{
//       MonthData.push({
//         name: val.customer,
//         test: val.test,
//         date: val.test_date,
//         time: val.uploaded_time ? val.uploaded_time : '-',
//       status: <span className="pending_clrred">{val.status}</span>,
//       action:<div className="browseAndVisi"><OpenInBrowserIcon onClick={()=>this.openresultModel(index)} /><VisibilityIcon /></div>,
//       id:index
//       })
//     }
//     })
    
//     self.setState({weekMonthYearData:MonthData,tableData:MonthData,wk_Mn_Yr_Full_Data:MonthDatafull,spinner:false})
// })
// }

// yearFun=()=>{
//   this.setState({spinner:true})

//   var self = this
//   var endpoint = this.state.tabindex?"/getTestPendingResult":'/getTestUploadResult'

//   axios({
//       method: 'POST', //get method 
//       url: apiurl + endpoint,
//       data:{
//         "lab_id":"2",
//         "date":"",
//         "period":"YEAR",  
//         }     
//   })
//   .then((response) => {
//     console.log(response,"response_data")

//     var yearData = [];
//     var yearDatafull = [];
//     response.data.data.map((val,index) => {
//       yearDatafull.push(val)
//       if(endpoint==='/getTestUploadResult'){
//       yearData.push({
//         name: val.customer,
//         test: val.test,
//         date: val.test_date,
//         time: val.uploaded_time,
//       status: <span className="uploader_clrgreen">{val.status}</span>,
//       id:index
//       })
//     }
//     else{
//       yearData.push({
//         name: val.customer,
//         test: val.test,
//         date: val.test_date,
//         time: val.uploaded_time ? val.uploaded_time : '-',
//       status: <span className="pending_clrred">{val.status}</span>,
//       action:<div className="browseAndVisi"><OpenInBrowserIcon onClick={()=>this.openresultModel(index)} /><VisibilityIcon /></div>,
//       id:index
//       })
//     }
//     })
//     self.setState({weekMonthYearData:yearData,tableData:yearData,wk_Mn_Yr_Full_Data:yearDatafull,spinner:false})
// })
// }

openresultModel=(indexid)=>{
  var uploadcurrentdata = [this.state.wk_Mn_Yr_Full_Data[indexid]]
  this.setState({uploadview:true,uploaddata:uploadcurrentdata})
}

closemodal = () => {
  this.setState({uploadview: false });
};

tabhandle=(data)=>{
  this.setState({tabindex:data})

  var startdate = dateformat(new Date(), "yyyy-mm-dd")
  var enddate = dateformat(new Date(), "yyyy-mm-dd")
  var endpoint = data?"/getTestPendingResult":'/getTestUploadResult'
    var self = this
    axios({
        method: 'POST', //get method 
        url: apiurl + endpoint,
        data:{
          "lab_id": "2",
          "date": startdate,
          "period": "Day",
          "date_to":enddate
        }
    })
    .then((response) => {
      console.log(response,"response_data")

      var tableData = [];
      var tableDatafull = [];
        response.data.data.map((val,index) => {
          if(endpoint==='/getTestUploadResult'){
            tableData.push({
              name: val.customer,
              // test: val.test,
              date: dateformat(val.test_date, "dd mmm yyyy"),
              time: this.formatTimeShow(val.test_time),
            status: <span className="uploader_clrgreen">{val.status}</span>,
            id:val.booking_id
            })
          }else{
            tableData.push({
              name: val.customer,
              // test: val.test,
              date: dateformat(val.test_date, "dd mmm yyyy"),
              time: val.test_time ? this.formatTimeShow(val.test_time) :'-',
            status: <span className="pending_clrred">{val.status}</span>,
            action:<div className="browseAndVisi"><OpenInBrowserIcon onClick={()=>this.openresultModel(index)} /><VisibilityIcon onClick={()=>this.openuploadForpending(index)}/></div>,
            id:val.booking_id
            })
          }
            tableDatafull.push(val)
        })

        self.setState({
          weekMonthYearData:tableData,
          wk_Mn_Yr_Full_Data:tableDatafull,
        })
    })
}

Notification=()=>{
  notification.info({
    description:
      'No Data Found',
      placement:"topRight",
  });
}



  render() {
    const { Option } = Select;
    const { Search } = Input;
    console.log(this.state.weekMonthYearData,"weekMonthYearData")

    var tabvalue = this.state.tabindex

    
    var multiDataSetbody = []
    this.state.weekMonthYearData.map((xldata,index)=>{
      if(index%2!==0){
        multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},{value:xldata.name},{value:xldata.date},{value:xldata.time},{value:xldata.status.props.children}])
      }else{
      multiDataSetbody.push([
        {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.name,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},{value:xldata.date,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},{value:xldata.time,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},{value:xldata.status.props.children,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}}])
      }
    })
    const multiDataSet = [
      {
          columns: [
{title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
{title: "Customer", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}}, 
{title: `${this.state.tabindex?'Test Date':"Uploaded Date"}`,width:{wpx: 100},style:{fill:{patternType: "solid", fgColor: {rgb: "86b149"}}}},
{title: "Time", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
{title: "Status", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
          ],
          data: multiDataSetbody      
      }
  ];

    return (
      <Spin className="spinner_align" spinning={this.state.spinner}>
      <Paper>
        <div className="dashboard_header">
          <div className="dashboard_title">UPLOAD RESULTS</div>
          <div
            style={{ fontSize: "14px", display: "flex", alignItems: "center" }}
          >
            <DateRangeSelect dynalign={"dynalign"} rangeDate={(item)=>this.dayReport(item)} setselectedDate={this.state.tabindex}/>
            {/* <ButtonGroup
              className="clinic_group_details"
              size="small"
              aria-label="small outlined button group"
            >
              <Button className="clinic_details" onClick={this.weekFun} >This Week</Button>
              <Button className="clinic_details" onClick={this.monthFun}>This Month</Button>
              <Button className="clinic_details" onClick={this.yearFun}>This Year</Button>
            </ButtonGroup>

            <Moment format="DD-MMM-YYYY" className="mr-5"></Moment> */}
            <Search
              placeholder="Search"
              onSearch={(value) => console.log(value)}
              style={{ width: 150 }}
              className="mr-2 ml-2"
              onChange={(e)=>this.setState({searchData:e.target.value})}
            />
            <div className="icon_head">
              <ReactSVG
                onClick={this.generatepdf}
                src={pdf}
                style={{ marginRight: "15px", marginLeft: "15px" }}
              />
                {this.state.weekMonthYearData.length===0?<ReactSVG  onClick={this.Notification} src={excel} style={{ marginRight: "15px" }} />:
              <ExcelFile element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
                    <ExcelSheet dataSet={multiDataSet} name="Uploaded Details"/>
                </ExcelFile>}
              
                {this.state.weekMonthYearData.length===0?
                <ReactSVG src={print} onClick={this.Notification} />:
              <ReactToPrint
          trigger={() => <ReactSVG src={print} />}
          content={() => this.componentRef}
        />}
        <div style={{ display: "none" }}><PrintData printTableData={this.state.weekMonthYearData} ref={el => (this.componentRef = el)} /></div>
            </div>
          </div>
        </div>
        <Paper>
          <UploadDetails tabledataFun={(data)=>this.setState({tableData:data})} weekMonthYearData={this.state.weekMonthYearData} tabindex={(data)=>this.tabhandle(data)} wk_Mn_Yr_Full_Data={this.state.wk_Mn_Yr_Full_Data} searchData={this.state.searchData} propsopen={this.state.propsopen} selectedDatepen={this.state.selectedDatepen} />
        </Paper>
      </Paper>
              <Modalcomp
              visible={this.state.uploadview}
              title={"UPLOAD TEST RESULTS"}
              closemodal={(e) => this.closemodal(e)}
              modelwidthClass={"resultviewModelWidth"}
            >
              <ResultView onClose={this.closemodal} uploaddata={this.state.uploaddata} />
            </Modalcomp>
        </Spin>
    );
  }
}
export default UploadMaster;
