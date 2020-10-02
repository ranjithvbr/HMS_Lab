import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import ValidationLibrary from "../../helpers/validationfunction";
import { apiurl } from "../../App";
import axios from 'axios';
import dateFormat from 'dateformat';
import Checkbox from '@material-ui/core/Checkbox';
import "../ManageTest/TestView.css";

export default class CategoryForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            testCategoryActive: false,
            manageCategory: {
                'lab_test_category': {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null,
                },
                // 'lab_test_category_instruction': {
                //     'value': '',
                //     validation: [{ 'name': 'required' }],
                //     error: null,
                //     errmsg: null,
                // }
            },
        }
    }

    componentDidMount() {
        console.log(this.props, "checing")
        if (this.props.edithide) {
            this.state.manageCategory.lab_test_category.value = this.props.editdata[0].test
            this.state.testCategoryActive=this.props.editdata[0].active==="Active"?true:false
            this.setState({})
        }
    }


    changeDynamic = (data, key) => {
        var manageCategory = this.state.manageCategory;
        var targetkeys = Object.keys(manageCategory);
        var errorcheck = ValidationLibrary.checkValidation(data, manageCategory[key].validation);
        manageCategory[key].value = data;
        manageCategory[key].error = !errorcheck.state;
        manageCategory[key].errmsg = errorcheck.msg;
        this.setState({ manageCategory });
        var filtererr = targetkeys.filter((obj) =>
            manageCategory[obj].error == true || manageCategory[obj].error == null);
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
        var manageCategory = this.state.manageCategory;
        var targetkeys = Object.keys(manageCategory);
        console.log(targetkeys);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(manageCategory[targetkeys[i]].value, manageCategory[targetkeys[i]].validation);
            console.log(errorcheck);
            manageCategory[targetkeys[i]].error = !errorcheck.state;
            manageCategory[targetkeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = targetkeys.filter((obj) =>
            manageCategory[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
        }
        else {
            this.setState({ error: false })
            if (this.props.edithide) {
                this.update()
            } else {
                this.addCategory();
            }
        }
        this.setState({ manageCategory })
    }

    addCategory = () => {
        this.props.closemodal(true)
        var self = this
        axios({
            method: 'POST',
            url: apiurl + '/insert_mas_lab_test_category',
            data: {
                "lab_test_category": this.state.manageCategory.lab_test_category.value,
                // "lab_instruction": this.state.manageCategory.lab_test_category_instruction.value,
                "lab_instruction":"",
                "lab_vendor_id": "2",
                "lab_created_by": "1",
                "lab_created_on": dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
                "lab_modified_by": "1",
                "lab_modified_on": dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
                "ipaddress": "122.165.141.121",
                "is_active": this.state.testCategoryActive === true ? 1 : 0,
            }
        })
            .then((response) => {
                console.log(response, "response_checkingg")
                self.props.callget("Added")
            })
    }


    update = () => {
        this.props.closemodal(true)
        var self = this
        axios({
            method: 'PUT',
            url: apiurl + '/edit_mas_lab_test_category',
            data: {
                "test_category_id": this.props.editdata[0].id,
                "lab_test_category": this.state.manageCategory.lab_test_category.value,
                // "lab_instruction": this.state.manageCategory.lab_test_category_instruction.value,
                "lab_instruction":'',
                "lab_modified_by": "19",
                "lab_modified_on": dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
                "ipaddress": "122.165.141.121",
                "is_active": this.state.testCategoryActive === true ? 1 : 0
            }
        })
            .then((response) => {
                console.log(response, "response_data")
                self.props.callget("Updated")
            })
    }

    testCategoryActiveCheck = (e) => {
        this.setState({
            testCategoryActive: e.target.checked
        })
    }

    render() {
        return (
            <div className="tabControlTest">
                <div className="testentry_container mt-4">
                    <Grid  spacing={2}>
                        <Grid item xs={12}>
                            <Labelbox
                                type="text"
                                labelname="Test Category"
                                changeData={(data) => this.changeDynamic(data, 'lab_test_category')}
                                value={this.state.manageCategory.lab_test_category.value}
                                error={this.state.manageCategory.lab_test_category.error}
                                errmsg={this.state.manageCategory.lab_test_category.errmsg} />
                            <Checkbox
                                className="Deal_active_check"
                                checked={this.state.testCategoryActive}
                                onChange={(e) => this.testCategoryActiveCheck(e)}
                            />
                            <span>Active</span>
                            <div className={`${this.props.visible === true ? "manage_test_button-containeredit" : "manage_test_button-container"}`}>
                            <Button className="manage_test_Cancel" onClick={() => this.props.closemodal(false)}>Cancel</Button>
                            <Button className="manage_test_Submit" onClick={this.checkValidation} >
                                {
                                    this.props.visible === true ? "Submit" : "Update"
                                }
                            </Button>
                        </div>
                        </Grid>
                        {/* <Grid item xs={12} md={6}>
                            <Labelbox
                                type="textarea"
                                labelname="Patient Instruction"
                                changeData={(data) => this.addtestcostchangedyn(data, 'lab_test_category_instruction')}
                                value={this.state.manageCategory.lab_test_category_instruction.value}
                                error={this.state.manageCategory.lab_test_category_instruction.error}
                                errmsg={this.state.manageCategory.lab_test_category_instruction.errmsg} />
                        </Grid> */}
                        
                    </Grid>
                </div>
            </div>
        );
    }
}
