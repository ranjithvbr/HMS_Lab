import React, { Component } from "react";
import { notification } from "antd";
import Moment from "react-moment";
import "./RevenueTable.css";
import './RevenueMaster.css';
import Paper from "@material-ui/core/Paper";
import { Input } from "antd";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import ReactToPrint from "react-to-print";
import ReactExport from 'react-data-export';
import PrintData from "./printdata";
import ReactSVG from 'react-svg';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { apiurl } from "../../App";
import dateFormat from 'dateformat';
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import RevenueTestDetails from "./RevenueTestDetails";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class RevenueMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData:[],
      testDetails:[],
      openTestDetails:false,
      search:null,
      fromDate: dateFormat(new Date(),"yyyy-mm-dd"),
      toDate: dateFormat(new Date(),"yyyy-mm-dd")
    };
  }

  componentDidMount() {
    this.getRevenueData()
  }

  searchChange = (e) => {
    this.setState({
      search: e.target.value
    })
    this.setState({})
  }

  // PDF FUNCTION
  generatepdf = () => {
    if(this.state.tableData.length===0){
      notification.info({
        description:
          'No Data Found',
          placement:"topRight",
      });
    }
    else{
    const doc = new jsPDF("a3")
    var bodydata = []
    this.state.tableData.map((data, index) => {
      bodydata.push([index + 1, data.customer, data.test.props.children, data.book_date, data.totalcharge])
    })
    doc.autoTable({
      beforePageContent: function (data) {
        doc.text("Uploaded Details", 15, 23); // 15,13 for css
      },
      margin: { top: 30 },
      showHead: "everyPage",
      theme: "grid",
      head: [['S.No', 'Customer', 'Test', 'Book Date','Total Charge']],
      body: bodydata,
    })

    doc.save('UploadDetails.pdf')
  }
  }

  getTestDetails = (booking_id) => {
    axios({
      method:'post',
      url:apiurl+'/getLabTestDetails',
      data:{
        "booking_id":booking_id
      }
    }).then((response)=>{
      console.log(response.data.data)
      this.setState({
        testDetails:response.data.data,
        openTestDetails:true,

      })
    }).catch((error)=>{
      console.log(error)
    })
    
  }

  getRangeDate = (item) => {
    console.log(item,"checking Date")
    this.setState({
      fromDate:dateFormat(item[0].startDate,"yyyy-mm-dd"),
      toDate:dateFormat(item[0].endDate,"yyyy-mm-dd")
    },()=>this.getRevenueData())
  }

  getRevenueData = () => {

    this.setState({
      props_loading:true,
    })
    axios({
      method: 'POST',
      url: apiurl +'/getLabRevenueDetails',
      data: {
        "lab_vendor_id": "2",
        "from_date": this.state.fromDate,
        "to_date": this.state.toDate,
        "period": "day"
      }
    }).then((response) => {
      console.log(response.data.data.result, "res")
      var tableData = [];
      response.data.data.result.map((val) => {
        console.log("sdfkshdfgsdhs", val)
        tableData.push({
          customer: val.customer,
          test: <div className="labTest" onClick={()=>this.getTestDetails(val.booking_id)}>{val.lab_test_category}</div>,
          book_date: val.book_date,
          totalcharge: val.total_charge,
          id:val.booking_id
        })
      })
      this.setState({
        props_loading:false,
        tableData: tableData,
        enableSearch: false,
      })
      this.setState({})

    }).catch((error) => {

    })
  }

  closemodal = () => {
    this.setState({
      openTestDetails:false
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
    console.log(dateFormat(new Date(), "dd mmm yyyy"))
    const { Search } = Input;
    const tableDatas = this.state.tableData.filter((data) => {
      console.log(data, "Search_data")
      if (this.state.search === null)
        return data
      else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase())
        || (data.test != null && data.test.props.children.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.book_date != null && data.book_date.toString().includes(this.state.search.toString()))
        || (data.totalcharge != null && data.totalcharge.toString().includes(this.state.search.toString()))
      ) {
        return data
      }
    })
    // EXCEL FUNCTION
    var multiDataSetbody = []
    this.state.tableData.map((xldata, index) => {
      console.log(xldata.test.props.children,"xldata")
      if (index % 2 !== 0) {
        multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } },
        { value: xldata.customer },
        { value: xldata.test.props.children },
        { value: xldata.book_date },
        { value: xldata.totalcharge,style: { alignment: { horizontal: "center" } }}])
      } else {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.customer, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.test.props.children, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.book_date, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          // { value: xldata.card, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.totalcharge, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },])
      }
    })
    const multiDataSet = [
      {
        columns: [
          { title: "S.No", width: { wpx: 35 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Customer", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Test", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Book Date", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Total Charge", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
        ],
        data: multiDataSetbody
      }
    ];
    return (
      <Paper>
        <div className="dashboard_header">
          <div className="dashboard_title">REVENUE</div>
          <div style={{ fontSize: "14px", display: "flex", alignItems: "center", }} >
            <DateRangeSelect dynalign={"dynalign"} rangeDate={(item) => this.getRangeDate(item)} />
            <Search
              placeholder="Search"
              onChange={(e) => this.searchChange(e)}
              style={{ width: 150 }}
              className="mr-2 ml-2"
            />

            <div className="icon_head">
                  <ReactSVG
                    onClick={this.generatepdf}
                    src={pdf}
                    style={{ marginRight: "15px", marginLeft: "15px" }}
                  />
                {this.state.tableData.length===0?<ReactSVG  onClick={this.Notification} src={excel} style={{ marginRight: "15px" }} />:
                  <ExcelFile element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
                    <ExcelSheet dataSet={multiDataSet} name="Uploaded Details" />
                  </ExcelFile>}

                  {this.state.tableData.length===0?
                <ReactSVG src={print} onClick={this.Notification} />:
                  <ReactToPrint
                    trigger={() => <ReactSVG src={print} />}
                    content={() => this.componentRef}
                  />}
                  <div style={{ display: "none" }}><PrintData printTableData={this.state.tableData} ref={el => (this.componentRef = el)} /></div>
                </div>
          </div>
        </div>
        <div>
          <Tablecomponent
            heading={[
              { id: "", label: "S.no" },
              { id: "customer", label: "Customer" },
              { id: "test", label: "Test Category" },
              { id: "book_date", label: "Book Date" },
              { id: "totalcharge", label: "Total Charge (KWD)" },
            ]}
            props_loading={this.state.props_loading}
            rowdata={tableDatas.length === 0 ? [] : tableDatas}
            tableicon_align={""}
            modelopen={(e) => this.modelopen(e)}
            EditIcon="close"
            DeleteIcon="close"
            VisibilityIcon="close"
            subheading="enable"
          />

          <Modalcomp visible={this.state.openTestDetails} title={"GENERAL TEST"} closemodal={(e) => this.closemodal(e)}
            xswidth={"xs"}
          >
            <RevenueTestDetails testDetails={this.state.testDetails}/>
          </Modalcomp>
        </div>
      </Paper>
    );
  }
}
export default RevenueMaster;






