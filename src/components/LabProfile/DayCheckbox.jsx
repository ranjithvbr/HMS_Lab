import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import './DayCheckbox.css'
import CloseIcon from '@material-ui/icons/Close';
import Labelbox from '../../helpers/labelbox/labelbox';
import './ProfileModal.css';
import Button from '@material-ui/core/Button';
import { apiurl } from '../../App';
import Axios from 'axios';
import dateFormat from 'dateformat';
import moment from 'moment';
import { notification } from "antd"


const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default class WorkingHours extends React.Component {
  constructor(props) {
    super(props)
    this.state =
    {
      Friday: [], Saturday: [], Sunday: [], Monday: [], Tuesday: [], Wednesday: [], Thursday: [],
      countArray: [], count: 0, addMoreHours: false, checkedA: false, checkedB: false, checkedC: false, checkedD: false, checkedE: false, checkedF: false, checkedG: false,
      time: false, showtimepicker: false, timeout: false, choosetime: false, checkList: [], addMoreHoursList: [],
      basicDetails: {
        'fromTimeValue': {
          'value': '',
          validation: [{ 'name': 'required' }, { 'name': 'address' }],
          error: null,
          errmsg: null
        },
        'toTimeValue': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
      },
      "checkedAday": {
        "fromTime": dateFormat(new Date(), "hh:MM TT"),
        "toTime": dateFormat(new Date(), "hh:MM TT")
      },
      "checkedBday": {
        "fromTime": false,
        "toTime": false
      },
      "checkedCday": {
        "fromTime": false,
        "toTime": false
      },
      "checkedDday": {
        "fromTime": false,
        "toTime": false
      },
      "checkedEday": {
        "fromTime": false,
        "toTime": false
      },
      "checkedFday": {
        "fromTime": false,
        "toTime": false
      },
      "checkedGday": {
        "fromTime": false,
        "toTime": false
      },

    };
  }

  handleChange = name => event => {
    console.log([name])
    console.log('sdf', name)
    if (this.state.time === false) (
      this.setState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checkedD: true,
        checkedE: true,
        checkedF: true,
        checkedG: true,
        time: true,
      }))

    if (!this.state.time === false) (
      this.setState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
        checkedF: false,
        checkedG: false,
        time: false,
      }))
  };
  handleChangebox = name => event => {
    this.state.checkList.unshift(name)
    this.setState({})
    this.setState({ ...this.state, [name]: event.target.checked });
    this.handleChange(this.label);
  };
  timepickershow = () => {
    this.setState({ showtimepicker: !this.state.showtimepicker })
  }
  timepickerclose = () => {
    this.setState({ timeout: !this.state.timeout })
  }

  getTime = (time, label, key) => {
    console.log(time, label, "sdfasdfas")
    if (key === 'from') {
      this.state[label + 'day'].fromTime = time
    } else {
      this.state[label + 'day'].toTime = time
    }
    this.setState({})
  }

  getAllTime = (time, key) => {
    var apiKeys = ["checkedA", "checkedB", "checkedC", "checkedD", "checkedE", "checkedF", "checkedG"];
    for (var i in apiKeys) {
      if (key === "from") {
        this.state[apiKeys[i] + 'day'].fromTime = time
      } else {
        this.state[apiKeys[i] + 'day'].toTime = time
      }
    }
  }

  sendToApi = () => {
    var apiData = {
      "hc_vendorId": '15',
      "wh": []
    }
    var apiKeys = ["checkedA", "checkedB", "checkedC", "checkedD", "checkedE", "checkedF", "checkedG"];
    var days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    for (var i in apiKeys) {
      // console.log(this.state[apiKeys[i]+`${i}`].fromTime,"checkingData")
      if (this.state[apiKeys[i]] === true) {
        apiData.wh.push({
          "weekday": days[i],
          "session": "1",
          "fromtime": this.state[apiKeys[i] + 'day'].fromTime,
          "totime": this.state[apiKeys[i] + 'day'].toTime,
          "active_flag": "1",
          "created_by": "1"
        })
      }
    }
    for (var i in days) {
      if (this.state[days[i]].length > 0) {
        this.state[days[i]].map((val, index) => {
          console.log(this.state[val].fromTime, "checkingData")
          return (
            apiData.wh.push({
              "weekday": days[i],
              "session": `${index + 2}`,
              "fromtime": this.state[val].fromTime,
              "totime": this.state[val].toTime,
              "active_flag": "1",
              "created_by": "1"
            })
          )
        })
      }
    }

    console.log(apiData, "MyApiData")

    // Axios({
    //   method: 'POST',
    //   url: apiurl + 'edithealthcheckupworkinghours',
    //   data: {
    //     ...apiData
    //   }
    // }).then((response) => {
    //   this.props.onClose()
    //   this.props.ProfileGetApi()
    //   console.log(response, "responseCheckProfile")
    // }).catch((error) => {
    //   console.log(error)
    // })
  }

  addHours = (days) => {
    var count = this.state.count++;
    // this.setState({
    //   [days]:[]
    // },()=>this.state[days].push("checkedA" + count))
    this.state[days].push("checkedA" + count)
    this.setState({})
    this.setState({
      addMoreHours: true,
      count: this.state.count++,
      ["checkedA" + count]: {
        'fromTime': '',
        'toTime': ''
      }
    })
  }

  getAddMoreTime = (time, label, key) => {
    // this.setState({
    //   [label]:{
    //     'fromTime':'',
    //     'toTime':''
    //   }
    // })
    if (key === "fromTime") {
      this.state[label][key] = time;
      this.setState({})
    } else {
      this.state[label][key] = time;
      this.setState({})
    }
    console.log(time, label, key, "getAddMoreTime")
    this.setState({})
  }

  getWorkingTime = (time, check) => {
    if (check === "from") {
      this.state.basicDetails.fromTimeValue.value = time
    } else {
      this.state.basicDetails.toTimeValue.value = time
    }
    this.setState({})
  }

  sendToApiDemo = () => {
    var whData = []
    var days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    for (var i in days) {
      whData.push({
        "weekday": days[i],
        "session": "1",
        "fromtime": this.state.basicDetails.fromTimeValue.value,
        "totime": this.state.basicDetails.toTimeValue.value,
        "active_flag": "1",
        "created_by": "1"
      })
    }
    Axios({
      method: 'POST',
      url: apiurl + '/Lab/editlabworkinghours',
      data: {
        "labId": 2,
        "wh": whData
      }
    }).then((response)=>{
      this.props.ProfileGetApi()
      this.props.onClose()
      notification.info({
        description:
          "Working Hours Updated Successfully",
        placement: "topRight",
      });
    })
  }

  render() {
    return (
      <div className="workinghours_details">
        <div className="select_timepicker">
          <div className="timepicker_container">
            <Labelbox
              type="timepicker"
              labelname={"From Time"}
              className="start_time"
              changeData={(time) => this.getWorkingTime(time, 'from')}
              changeFormat={'HH:MM'}
              value={this.state.basicDetails.fromTimeValue.value}
            />
            <p className="time-">-</p>
            <Labelbox
              type="timepicker"
              labelname={"To Time"}
              changeData={(time) => this.getWorkingTime(time, "to")}
              changeFormat={'HH:MM'}
              value={this.state.basicDetails.toTimeValue.value}
            />
          </div>
        </div>


        <div className="buttons_container">
          <div>
            <div>
              <Button className="cancel_button" variant="contained" onClick={this.props.onClose}>Cancel</Button>
            </div>
          </div>
          <div>
            <div>
              <Button className="update_button" variant="contained" color="primary" onClick={this.sendToApiDemo}>Update</Button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
