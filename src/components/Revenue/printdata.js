import React from "react";
import "./printdata.css"

export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printTableData,"printTableData")

            var printBodyData = this.props.printTableData && this.props.printTableData.map((printdata,index)=>{
                return(
                    <tr>
                  <td>{index+1}</td>
                  <td>{printdata.customer}</td>
                  <td>{printdata.test.props.children}</td>
                  <td>{printdata.book_date}</td>
                  <td>{printdata.totalcharge}</td>
                </tr>
                )
            })
        

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Uploaded Details</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Customer</th>
            <th>Test</th>
            <th>Book Test</th>
            <th>Total Charge</th>
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }