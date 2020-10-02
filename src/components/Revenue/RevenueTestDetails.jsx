import React from 'react';
import './RevenueMaster.css';

class RevenueTestDetails extends React.Component{
    render(){
        console.log(this.props,"sdfas")
        return(
            <div className="row">
                {
                    this.props.testDetails.length > 0 && this.props.testDetails.map((val)=>{
                        return(
                            <div className="col-md-4">
                                <div className="card testCard">
                                    <div className="testName">
                                        {
                                            val.test_name
                                        }
                                    </div>
                                    <div className="testAmount">
                                        {
                                            val.test_amount+' KWD'
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default RevenueTestDetails;