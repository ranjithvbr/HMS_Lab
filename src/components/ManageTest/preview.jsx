import React from "react";
import CloseIcon from '@material-ui/icons/Close';
import './TestView.css';
import axios from 'axios';
import { apiurl } from "../../App";


class Preview extends React.Component {
    componentWillReceiveProps() {
        console.log("checkingprops", this.props)
    }
    deleterow = (id, index) => {
        // this.setState({ props_loading: true })
        var self = this
        axios({
            method: 'delete',
            url: apiurl + '/delete_mas_lab_test',
            data: {
                "lab_test_id": id,
            }
        })
            .then(function (response) {
                self.props.deleteCard(index)
            })
            .catch(function (error) {
            });
        this.setState({ props_loading: false })
    }
    render() {
        return (
            <div className="row">
                {
                    this.props.previewData.length > 0 ? this.props.previewData.map((val, index) => {
                        return (
                            <div className="col-md-6">
                                <div className="card manageCard">
                                    <div className="col-md-12 p-0">
                                        <div className="col-md-3 left_content">
                                            <div className="left_header">{val.lab_test_name}</div>
                                            <div className="left_header">{val.lab_cost} KWD</div>
                                            <div className="left_headeractive">{val.is_active === 1 ? "Active" : "Inactive"}</div>
                                        </div>
                                        <div className="col-md-9 right_content">
                                            <div className="testInstruction">{val.test_instruction}</div>
                                            
                                            <CloseIcon className="closeIconRightContent" onClick={() => this.deleterow(val.lab_test_category_id, index)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                        :
                        <div className="previewNoRecord">
                            No Records Found
                    </div>
                }
            </div>
        )
    }
}

export default Preview;