import React from 'react'
import './Packagedetails.css';
import { Paper } from "@material-ui/core";



class Packagedetails extends React.Component {


    render() {

        const { viewdata } = this.props
        console.log(viewdata, "viewdata")

        return (
            <div className="">
                <div className="general_button">
                    <div className="textContent">{viewdata[0].lab_test_category}</div>
                </div>
                <div className="statusbtn">Active</div>
                <div className="row mainRow">
                    <div className="col-md-5 p-0">
                        <div className="instruction">
                            Instruction
                        </div>
                        <div className="d-flex">
                            <div className="instructiondot" />
                            <div className="instructionContent">
                                {
                                    viewdata[0].test_instruction
                                }
                            </div>
                        </div>
                    </div>
                    <div className="border_edit"></div>
                    <div className="col-md-5 p-0">
                        <span className="test">Test</span>
                        <div className="card">
                            <div className="row rowMinHeight">
                                <div className="col-md-4 testContentLeft">
                                    <div className="">
                                        <div>{viewdata[0].lab_test_name}</div>
                                        <div>{viewdata[0].cost + " KWD"}</div>
                                    </div>
                                </div>
                                <div className="col-md-8 testContentRight">
                                    {viewdata[0].test_instruction}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Packagedetails;