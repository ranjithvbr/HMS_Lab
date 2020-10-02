import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import ValidationLibrary from "../../helpers/validationfunction";
import CloseIcon from '@material-ui/icons/Close';
import { apiurl } from "../../App";
import axios from 'axios';
import dateFormat from 'dateformat';
import { Tabs, } from 'antd';
import Checkbox from '@material-ui/core/Checkbox';

import "./TestView.css";
import Preview from "./preview";


export default class TestView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testList:[],
      categoryList: [],
      testActive: false,
      btnDisable:false,
      activeKey: "1",
      name: "",
      testCost: [],
      lab_test_list: [],
      labmanage_test: {
        'lab_test_category': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null,
        },
      },
      labmanage_addtestcost: {
        'lab_test_category': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null,
        },
        lab_test_name: {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null,
        },
        lab_cost: {
          'value': '',
          validation: [{ 'name': 'required' }, { "name": "allowNumaricOnly" }],
          error: null,
          errmsg: null,
        },
        lab_instruction: {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null,
        },
      }
    }
  }

  componentDidMount() {
    console.log(this.props, "checing")
    if (this.props.edithide) {
      this.state.labmanage_addtestcost.lab_test_category.value = this.props.editdata[0].lab_test_category_id
      this.state.labmanage_addtestcost.lab_test_name.value = this.props.editdata[0].lab_test_name
      this.state.labmanage_addtestcost.lab_cost.value = this.props.editdata[0].cost
      this.state.labmanage_addtestcost.lab_instruction.value = this.props.editdata[0].test_instruction
      this.state.testActive = this.props.editdata[0].is_active === 1 ? true : false
      this.setState({})
    }
    this.getTestCategory()
  }

  getTestCategory = () => {
    axios({
      method: 'POST',
      url: apiurl + '/get_mas_lab_test_category',
      data: {
        lab_vendor_id: "2"
      }
    }).then((response) => {
      console.log(response.data.data.map((val) => { return { id: val.test_category_id, category: val.lab_test_category } }),
        "sadfasdf")
      this.setState({
        categoryList: response.data.data.map((val) => {
          return { id: val.test_category_id, category: val.lab_test_category }
        })
      })
      this.setState({})
    }).catch((error) => {
      alert(JSON.stringify(error))
    })
  }


  deletetag = (id) => {
    this.state.testCost.splice(id, 1)
    this.state.lab_test_list.splice(id, 1)

    var testcostdelarr = []
    var labcostobjarr = []
    this.state.lab_test_list.map((data, index) => {

      testcostdelarr.push(<div className={"texttag"}>{data.lab_test_name}<span className="bar_tag">-</span><span>{data.lab_cost}<CloseIcon className={"closeicontestview"} onClick={() => this.deletetag(index)} /></span></div>)

      labcostobjarr.push({
        "lab_test_name": data.lab_test_name,
        "lab_cost": data.lab_cost
      })
    })

    this.setState({ testCost: testcostdelarr, lab_test_list: labcostobjarr })

  }

  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);

    var labmanage_test = this.state.labmanage_test;
    var targetkeys = Object.keys(labmanage_test);
    var errorcheck = ValidationLibrary.checkValidation(data, labmanage_test[key].validation);
    labmanage_test[key].value = data;
    labmanage_test[key].error = !errorcheck.state;
    labmanage_test[key].errmsg = errorcheck.msg;
    this.setState({ labmanage_test });
    var filtererr = targetkeys.filter((obj) =>
      labmanage_test[obj].error == true || labmanage_test[obj].error == null);
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false
      })
    } else {
      this.setState({ error: false })
    }
  }


  checkValidation = () => {
    var labmanage_test = this.state.labmanage_test;
    var targetkeys = Object.keys(labmanage_test);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(labmanage_test[targetkeys[i]].value, labmanage_test[targetkeys[i]].validation);
      console.log(errorcheck);
      labmanage_test[targetkeys[i]].error = !errorcheck.state;
      labmanage_test[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter((obj) =>
      labmanage_test[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    }
    else {
      this.setState({ error: false })
      if (this.props.edithide) {
        this.update()
      } else {
        this.props.closemodal(true)
        var self = this
        axios({
          method: 'POST',
          url: apiurl + '/insert_mas_lab_test',
          data: {
            "lab_test_category_id": this.state.labmanage_test.lab_test_category.value,
            "lab_test_list": this.state.lab_test_list,
            "lab_vendor_id": "2",
            "lab_created_on": dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
            "lab_modified_on": dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
            "cost": "1",
            "active_flag": this.state.testActive === true ? 1 : 0,
            "lab_id": "2",
            "lab_modified_by": "19",
            "lab_created_by": "19",
          }
        })
          .then((response) => {
            console.log(response, "response_checkingg")
            this.props.callget("Added")
          })
      }
    }
    this.setState({ labmanage_test })
  }

  addtestcostchangedyn = (data, key) => {
    console.log("key", key);
    console.log("data", data);

    var labmanage_addtestcost = this.state.labmanage_addtestcost;
    var targetkeys = Object.keys(labmanage_addtestcost);
    var errorcheck = ValidationLibrary.checkValidation(data, labmanage_addtestcost[key].validation);
    labmanage_addtestcost[key].value = data;
    labmanage_addtestcost[key].error = !errorcheck.state;
    labmanage_addtestcost[key].errmsg = errorcheck.msg;
    this.setState({ labmanage_addtestcost });
    var filtererr = targetkeys.filter((obj) =>
      labmanage_addtestcost[obj].error == true || labmanage_addtestcost[obj].error == null);
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false
      })
    } else {
      this.setState({ error: false })
    }
    this.setState({})
  }


  addtestcostcheckValidation = () => {
    var labmanage_addtestcost = this.state.labmanage_addtestcost;
    var targetkeys = Object.keys(labmanage_addtestcost);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(labmanage_addtestcost[targetkeys[i]].value, labmanage_addtestcost[targetkeys[i]].validation);
      labmanage_addtestcost[targetkeys[i]].error = !errorcheck.state;
      labmanage_addtestcost[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter((obj) =>
      labmanage_addtestcost[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    }
    else {
      this.setState({ error: false })

      var testCost = []
      var lab_test_list = []
      var customid = this.state.testCost.length

      testCost.push(...this.state.testCost,
        <div className={"texttag"}>{this.state.labmanage_addtestcost.lab_test_name.value}<span className="bar_tag">-</span><span>{this.state.labmanage_addtestcost.lab_cost.value}<CloseIcon className={"closeicontestview"} onClick={() => this.deletetag(customid)} /></span></div>
      )

      lab_test_list.push(...this.state.lab_test_list, {
        "lab_test_name": this.state.labmanage_addtestcost.lab_test_name.value,
        "lab_cost": this.state.labmanage_addtestcost.lab_cost.value,
        "lab_test_instruction": this.state.labmanage_addtestcost.lab_instruction.value,
        "active": this.state.testActive === 1 ? "true" : "false"
      })
      this.setState({ testCost: testCost, lab_test_list: lab_test_list, btnDisable:true }, () => this.submitData())

    }

    this.setState({ labmanage_addtestcost })
  }

  submitData = () => {
    if (this.props.edithide) {
      this.update()
    } else {
      // this.props.closemodal(true)
      var self = this
      axios({
        method: 'POST',
        url: apiurl + '/insert_mas_lab_test',
        data: {
          "lab_vendor_id": "2",
          "lab_test_category_id": this.state.labmanage_addtestcost.lab_test_category.value,
          "lab_test_name": this.state.labmanage_addtestcost.lab_test_name.value,
          "test_instruction": this.state.labmanage_addtestcost.lab_instruction.value,
          "lab_cost": this.state.labmanage_addtestcost.lab_cost.value,
          "is_active": this.state.testActive === true ? 1 : 0,
        }
      })
        .then((response) => {
          this.state.testList.push({
            "lab_test_category_id": this.state.labmanage_addtestcost.lab_test_category.value,
            "lab_test_id": response.data.data.insertId,
            "lab_test_name": this.state.labmanage_addtestcost.lab_test_name.value,
            "test_instruction": this.state.labmanage_addtestcost.lab_instruction.value,
            "lab_cost": this.state.labmanage_addtestcost.lab_cost.value,
            "is_active": this.state.testActive === true ? 1 : 0,
          })
          this.setState({
            btnDisable:false
          })
          console.log(response, "response_checkingg")
          this.props.callget("Added")
          this.resetForm()
        })
    }

  }


  update = () => {
    this.props.closemodal(true)
    var self = this
    axios({
      method: 'PUT',
      url: apiurl + '/edit_mas_lab_test',
      data: {
        "lab_vendor_id": "2",
        "lab_test_id": this.props.editdata[0].lab_test_id,
        "lab_test_category_id": this.state.labmanage_addtestcost.lab_test_category.value,
        "lab_test_name": this.state.labmanage_addtestcost.lab_test_name.value,
        "test_instruction": this.state.labmanage_addtestcost.lab_instruction.value,
        "lab_cost": this.state.labmanage_addtestcost.lab_cost.value,
        "is_active": this.state.testActive === true ? 1 : 0,
      }
    })
      .then((response) => {
        console.log(response, "response_data")
        this.setState({
          btnDisable:false
        })
        self.props.callget("Updated")
        this.resetForm()
      })
  }

  resetForm = () => {
    this.state.labmanage_addtestcost.lab_test_name.value = ""
    this.state.labmanage_addtestcost.lab_cost.value = ""
    this.state.labmanage_addtestcost.lab_instruction.value = ""
    this.state.testActive = false
    this.setState({})
  }

  callback = (key) => {
    this.setState({
      activeKey: key
    })
  }

  deleteCard = (index) => {
    this.state.testList.splice(index, 1)
    this.setState({})
  }

  testActiveCheck = (e) => {
    this.setState({
      testActive: e.target.checked
    })
  }


  render() {
    const { TabPane } = Tabs;
    console.log(this.state.lab_test_list, "lab_test_list")
    return (
      <div className="tabControlTest">
        <Tabs className="" defaultActiveKey={"1"} activeKey={this.state.activeKey} onChange={this.callback}>
          <TabPane tab="Entry" key={"1"}>
            <div className="testentry_container mt-4">
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <div className="instruction_area">
                    <Labelbox
                      type="select"
                      labelname="Test Category"
                      valuelabel={'category'}
                      valuebind={"id"}
                      dropdown={this.state.categoryList}
                      changeData={(data) => this.addtestcostchangedyn(data, 'lab_test_category')}
                      value={this.state.labmanage_addtestcost.lab_test_category.value}
                      error={this.state.labmanage_addtestcost.lab_test_category.error}
                      errmsg={this.state.labmanage_addtestcost.lab_test_category.errmsg} />
                    {/* <Labelbox
                      type="text"
                      labelname="Test Category"
                      changeData={(data) => this.changeDynamic(data, 'lab_test_category')}
                      value={this.state.labmanage_test.lab_test_category.value}
                      error={this.state.labmanage_test.lab_test_category.error}
                      errmsg={this.state.labmanage_test.lab_test_category.errmsg} /> */}
                  </div>



                </Grid>

                <Grid item xs={12} md={7} className="package_containerthird">
                  <>

                    <div className="add_test_container">
                      <div className="add_div">
                        <div className="add_test">
                          <Labelbox
                            type="text"
                            labelname="Test Name"
                            changeData={(data) => this.addtestcostchangedyn(data, 'lab_test_name')}
                            value={this.state.labmanage_addtestcost.lab_test_name.value}
                            error={this.state.labmanage_addtestcost.lab_test_name.error}
                            errmsg={this.state.labmanage_addtestcost.lab_test_name.errmsg} />
                        </div>
                        <div className="add_test">
                          <Labelbox
                            type="text"
                            labelname="Cost (KWD)"
                            changeData={(data) => this.addtestcostchangedyn(data, 'lab_cost')}
                            value={this.state.labmanage_addtestcost.lab_cost.value}
                            error={this.state.labmanage_addtestcost.lab_cost.error}
                            errmsg={this.state.labmanage_addtestcost.lab_cost.errmsg} />
                        </div>

                      </div>
                      <div className="">
                        <Labelbox
                          type="textarea"
                          labelname="Patient Instruction"
                          changeData={(data) => this.addtestcostchangedyn(data, 'lab_instruction')}
                          value={this.state.labmanage_addtestcost.lab_instruction.value}
                          error={this.state.labmanage_addtestcost.lab_instruction.error}
                          errmsg={this.state.labmanage_addtestcost.lab_instruction.errmsg} />
                        <Checkbox className="Deal_active_check" checked={this.state.testActive} onChange={(e) => this.testActiveCheck(e)} /><span>Active</span>
                      </div>
                      {

                        < div className="addBtn">
                          <button className="btn btn-success" disabled={this.state.btnDisable} onClick={this.addtestcostcheckValidation}>{
                            this.props.visible === true ? "Add" : "Update"
                          }</button>
                        </div>
                      }

                      {/* <div className="test_viewtag_div">
                        {this.state.testCost}
                      </div> */}
                    </div>
                  </>
                </Grid>
                {/* <div className={`${this.props.visible === true ? "manage_test_button-containeredit" : "manage_test_button-container"}`}>
                  <Button className="manage_test_Cancel" onClick={() => this.props.closemodal(false)}>Cancel</Button>
                  <Button className="manage_test_Submit" onClick={this.checkValidation} >
                    {
                      this.props.visible === true ? "Submit" : "Update"
                    }
                  </Button>
                </div> */}

              </Grid>

            </div>
          </TabPane>
          {
            this.props.visible === true &&
            <TabPane tab="Preview" key="2">
              <Preview
                previewData={this.state.testList}
                deleteCard={this.deleteCard}
              />
            </TabPane>
          }
        </Tabs >
      </div>
    );
  }
}
