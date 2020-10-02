import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Trainee from "../../Images/11.jpg";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import "./Profilepage.css";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import ProfileModal from './ProfileModal';
// import { BsThreeDots } from 'react-icons/bs';
import Axios from "axios";
import { apiurl } from "../../App";

const styles = {};
export default class Profilepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancel: null,
      see: true,
      open: false,
      ProfileGetdata: [],
      editIcon: false
    }
  }
  // DOT FUNC
  viewAddress = () => {
    this.setState({
      see: !this.state.see,
    })
  }

  handleopen = (id) => {
    this.setState({
      editid: id,
      editIcon: true,
      open: true,
    })
  }

  closemodelPage = () => {
    this.setState({
      editIcon: false,
    })
  }

  componentDidMount() {
    this.LabProfileGetapi()
  }
  LabProfileGetapi = () => {
    var ProfileGetdata = this
    Axios({
      method: 'post',
      url: apiurl + '/Lab/getlabprofiledetails',
      data: {
        labId: "2",
      }
    })
      .then((response) => {
        console.log(response, "profile_check_lab")
        ProfileGetdata = response.data.data
        this.setState({
          ProfileGetdata: ProfileGetdata
        })
        console.log(ProfileGetdata, "profilr_datacheck")
      })
      .catch((error) => {
      })
  }
  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    return (
      <div className="profileWidthFull">
      <div className="profileContainer">
          <Grid container className="total">
            <Grid item xs={12} md={5}>
              <div className="trainee_image_container">
                <div className="trainee_image_div">
                  <img className="trainee_image" src={Trainee} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={7} className="addtrainee_gridcontainer">
              <div className="addtraineee_containerdiv">
                {this.state.ProfileGetdata.map((val) => {
                  console.log(val, "val_check")
                  return (
                    <div>
                      <div className="icon_edit">
                        <EditIcon className="icon" onClick={() => this.handleopen(val.labId)} />
                      </div>
                      <h1 className="trainee_detail">{val.vendor_name}
                        {/* Lina Clinical Lab */}
                      </h1>
                      <div className="age_details">
                        <h5>
                          <MdLocationOn className="address_icons" />
                        </h5>
                        <div className="name_dot_parent">
                          <h5>Jabriya</h5>
                          <span>
                            {/* <BsThreeDots onClick={this.viewAddress} className="dot_icons"></BsThreeDots> */}
                            {this.state.see === false ?
                              <div>
                                <p className="trainee_text">
                                  {val.vendor_address}
                                  {/* PO Box 2, safari 13001, Kuwait City, Kuwait -54541 */}
                                </p>
                              </div> : null}
                          </span>
                        </div>
                      </div>
                      <div className="age_details">
                        <h5>
                          <MdLocalPhone className="group_icons" />
                        </h5>
                        <p className="trainee_text">{val.vendor_phone}
                          {/* +965 22000001 */}
                        </p>
                      </div>
                      <div className="age_details">
                        <h5>
                          <IoIosGlobe className="group_icons" />
                        </h5>
                        <p className="trainee_text">{val.vendor_website}
                          {/* tec@tec.com.kw */}
                        </p>
                      </div>
                      <div>
                        <h4 className="working_hour">
                          <b>Working Hours</b>
                        </h4>
                      </div>
                      <div className="working_detail">
                        <h4 className="working_hour_detail">Friday</h4>
                        <p className="working_time_detail">09.30 AM-12.30 PM</p>
                      </div>
                      <div>
                        <div className="working_detail">
                          <h4 className="working_hour_detail">Thursday</h4>
                          <p className="working_time_detail">09.30 AM-04.30 PM</p>
                        </div>
                      </div>
                      <div>
                        <div className="working_detail">
                          <h4 className="working_hour_detail">
                            Saturday-Wednesday
                      </h4>
                          <p className="working_time_detail">10.30 AM-05.30 PM</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Divider className="divider_profile" />
            </Grid>
          </Grid>
        <ProfileModal closemodelPage={this.closemodelPage} openmodel={this.state.editIcon} ProfileGetdata={this.state.ProfileGetdata}/>
      </div>
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(Profilepage);