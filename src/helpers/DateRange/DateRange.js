import React from "react";
import { DateRangePicker } from 'react-date-range';
import Labelbox from "../../helpers/labelbox/labelbox";
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import Button from "@material-ui/core/Button";
import dateformat from 'dateformat';


import "./DateRange.css"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


export default class DateRangeSelect extends React.Component {

    state = {
        item: [{
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }],
        onCount: 1,
        openDateRange: false,
        SelectRange:dateformat(new Date(), "dd-mm-yyyy") + "\xa0\xa0\xa0" + "-- >" + "\xa0\xa0\xa0" + dateformat(new Date(), "dd-mm-yyyy"),
        tabchange:0,
    }
    
    onday = (item) => {
        if (this.state.onCount === 1) {
            this.setState({
                item: [item.selection],
                onCount: this.state.onCount + 1
            })
        } else {
            this.setState({
                item: [item.selection],
                onCount: 1
            })
        }
    }

    OKFUN = () => {
        // if(this.state.onCount===1){
        console.log(this.state.item, "item")
        this.props.rangeDate(this.state.item)
        var startdate = dateformat(this.state.item[0].startDate, "dd-mm-yyyy")
        var enddate = dateformat(this.state.item[0].endDate, "dd-mm-yyyy")
        this.setState({ SelectRange: startdate + "\xa0\xa0\xa0" + "-- >" + "\xa0\xa0\xa0" + enddate,openDateRange:!this.state.openDateRange })
        // }
    }

    CancelFun = () => {
        this.setState({
            openDateRange:!this.state.openDateRange
        })
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        console.log(newProps, "newProps")

        if(newProps.setselectedDate!==this.state.tabchange){
        this.setState({
            item: [{
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            }],
            SelectRange: dateformat(new Date(), "dd-mm-yyyy") + "\xa0\xa0\xa0" + "-- >" + "\xa0\xa0\xa0" + dateformat(new Date(), "dd-mm-yyyy"),
            tabchange:newProps.setselectedDate,
        })
    }
    }

    render() {
        console.log(this.state.item, "rangedate")
        return (
            <div>
                <div className="rangePicker_Master">
                    <div className="rangePicker_Label">
                        Select Range:
            </div>
                    <div title={this.state.SelectRange} className="rangePicker_InpputIconAlign" onClick={()=>this.setState({openDateRange:!this.state.openDateRange})}>
                        <Labelbox
                            type="text"
                            value={this.state.SelectRange}
                            placeholder={"\xa0" + "Start Date" + "\xa0\xa0\xa0" + "-- >" + "\xa0\xa0\xa0" + "End Date"} />
                        <InsertInvitationIcon className="rangePicker_Calendericon" />
                    </div>
                </div>
                {this.state.openDateRange && 
                // <div className="rangePicker_positionCenter" onClick={()=>this.props.DateRange()}>
                <div className={`${this.props.dynalign} daterangeMaster`}>
                    <DateRangePicker
                        editableDateInputs={true}
                        onChange={(item) => this.onday(item)}
                        moveRangeOnFirstSelection={false}
                        ranges={this.state.item}
                        // showDateDisplay={false}
                        months={1}
                        direction="horizontal"
                    />
                    <div className="rangePicker_btncontainer">
                        <Button className="rangePicker_cancelbtn" onClick={this.CancelFun}>Cancel</Button>
                        <Button className="rangePicker_okbtn" onClick={this.OKFUN}>Ok</Button>
                    </div>
                </div>
                // </div>
                }
            </div>
        )
    }
}