import React from "react";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "../ManageTest/LabTestTable.css";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import axios from 'axios';
import { apiurl } from "../../App";
import DeleteMedia from '../../helpers/ModalComp/deleteModal';
import { notification } from "antd"
import CategoryForm from "./CategoryForm";


var moment = require('moment');

class LabTestCategory extends React.Component {
    state = {
        openview: false,
        tableData: [],
        responseAllData: [],
        viewdata: [],
        editdata: []
    };

    componentDidMount() {
        this.getTableData()
    }

    // UNSAFE_componentWillReceiveProps(newProps) {
    //     alert("gotfinal")
    //     if (newProps.getdatacall) {
    //         this.props.falsegetmethod()
    //     }
    // }
    

    handleClickclose = () => {
        this.setState({ open: false });
    }

    getTableData = (notifyMsg, deleteData) => {
        this.setState({ props_loading: true })
        var self = this
        axios({
            method: 'POST', //get method 
            url: apiurl + '/get_mas_lab_test_category',
            data: {
                "lab_vendor_id": "2"
            }
        })
            .then((response) => {
                console.log(response, "response_data")

                var tableData = [];
                var responseAllData = [];
                response.data.data.map((val) => {
                    tableData.push({
                        test: val.lab_test_category, active: val.is_active === 1 ? "Active":"Inactive",
                        id: val.test_category_id
                    })
                    responseAllData.push(val)
                })
                self.setState({
                    tableData: tableData,
                    responseAllData: tableData,
                    props_loading: false
                })
                if (notifyMsg) {
                    notification.info({
                        description:
                            deleteData === true ? notifyMsg : 'Record ' + notifyMsg + ' Successfully',
                        placement: "topRight",
                    });
                }
            })
    }

    modelopen = (data, id) => {
        var editdataval = []
        if (data === "edit") {
             this.state.responseAllData.filter((editdata) => {
            console.log(editdata, "editdata")

                if(editdata.id === id){
                    editdataval.push(editdata)
                }
            })

            this.setState({ editopen: true, editdata: editdataval });
        }
    };

    closemodal = (editbol) => {
        this.setState({ openview: false, editopen: false, props_loading: false, deleteopen: false });
    };

    deleteopen = (type, id) => {
        this.setState({
            deleteopen: true,
            iddata: id
        })
    }

    deleterow = () => {
        this.setState({ props_loading: true })
        var self = this
        axios({
            method: 'delete',
            url: apiurl + '/delete_mas_lab_test_category',
            data: {
                "test_category_id": this.state.iddata,
            }
        }).then(function (response) {
                if (response.data.msg === "Success") {
                    self.getTableData("Deleted")
                } else {
                    self.getTableData("Test name already existes for this category", true)
                }
            })
            .catch(function (error) {
            });
        this.setState({ props_loading: false })
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.getdatacall) {
            this.getTableData(newProps.getdatacall)
            this.props.falsegetmethod()
        }
        this.setState({
            search: newProps.searchData,
        })
    }

    render() {
        const searchdata = []
        this.state.responseAllData.filter((data, index) => {
            console.log(data, "datadata")

            if (this.state.search === undefined || this.state.search === null) {
                searchdata.push({
                    test: data.test,
                    active: data.active,
                    id: data.id
                })
            }
            else if (data.test !== null && data.test.toLowerCase().includes(this.state.search.toLowerCase()) || data.active !== null && data.active.toLowerCase().includes(this.state.search.toLowerCase())) {
                console.log(data, "datadata")
                searchdata.push({
                    test: data.test,
                    active: data.active,
                    id: data.id
                })
            }
        })
        // console.log(searchdata, "datadata")


        return (
            <div>
                <Tablecomponent
                    heading={[
                        { id: "", label: "S.No" },
                        { id: "test", label: "Test Category" },
                        { id: "active", label: "Status" },
                        { id: "", label: "Action" },
                    ]}
                    rowdata={searchdata}
                    modelopen={(e, currentid) => this.modelopen(e, currentid)}
                    props_loading={this.state.props_loading}
                    deleteopen={this.deleteopen}
                    VisibilityIcon={"close"}
                />
                <Modalcomp
                    visible={this.state.editopen}
                    title={"MANAGE CATEGORY"}
                    closemodal={(e) => this.closemodal(e)}
                    xswidth={"xs"}
                    modelwidthClass={"managecat_width"}
                >
                    <CategoryForm
                        visible={this.state.open}
                        closemodal={this.handleClickclose}
                        edithide={"edithide"}
                        editdata={this.state.editdata}
                        callget={this.getTableData}
                        closemodal={(editbol) => this.closemodal(editbol)}
                    />
                </Modalcomp>

                <Modalcomp visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} xswidth={"xs"}>
                    <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal} />
                </Modalcomp>

            </div>
        );
    }
}

export default LabTestCategory;
