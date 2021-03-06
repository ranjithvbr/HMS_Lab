import React from "react";
import "./printdataAppoinment.css"

export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printTableData,"printTableData")
        var printBodyData = this.props.printTableData.map((printdata,index)=>{
            return(
                <tr>
              <td>{index+1}</td>
              <td>{printdata.name}</td>
              <td>{printdata.date}</td>
              <td>{printdata.time}</td>
            </tr>
            )
        })

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Appoinment Details</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }