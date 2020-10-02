import React, { Component } from "react";
import "antd/dist/antd.css";
import "./ProfileComp.css";
import Paper from "@material-ui/core/Paper";
import Trainee from "../../Images/11.jpg";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import "./Profilepage.css";
import { TiLocation, MdLocationOn, MdLocalPhone,MdEmail } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import ProfileModal from "./ProfileModal";
import Axios from "axios";
import dateFormat from 'dateformat';
import moment from 'moment';
import { apiurl } from "../../App";

const styles = {};
class ProfileComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",
      cancel: null,
      ProfileData: []
    };
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open = () => {
    this.setState({ view: true });
  };
  onclose = () => {
    this.setState({ view: false });
  };
  ProfileGetApi = () => {
    var ProfileData=''
    Axios({
      method: 'post',
      url: apiurl + '/Lab/getlabprofiledetails',
      data: {
        labId: "2",
      }
    })
      .then((response) => {
        console.log(response, "profile_check_lab")
        ProfileData = response.data.data
        this.setState({
          ProfileData: ProfileData
        })
        console.log(ProfileData, "profilr_datacheck")
      this.props.ProfileGetApi()
      })
      .catch((error) => {
      })
  }
  componentDidMount() {
    this.ProfileGetApi()
  }

  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    // console.log(this.state.ProfileData[0]&&this.state.ProfileData[0].workinghoursofhealthcheckup && moment(this.state.ProfileData[0].workinghoursofhealthcheckup[0].wh_fromtime).format("hh:MM TT"),"cjec")

    // console.log(this.state.ProfileData[0]&&this.state.ProfileData[0].workinghoursofhealthcheckup && ,"cjec")
    return (
      <div className="deal_listcreatead">
        <Paper className="profile_background">
          <div className="profileback_first">PROFILE</div>

          <div className="profilepaper_container">
            <Paper className="profilebackground">
              {this.state.ProfileData.map((val) => {

                return (
                  <Grid container className="total">
                    <Grid item xs={12} md={5}>
                      <div className="trainee_image_container">
                        <div className="trainee_image_div">
                          <img className="trainee_image" src={val.vendor_filename} />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={7} className="addtrainee_gridcontainer">
                      <div className="addtraineee_containerdiv">
                        <div className="icon_edit">
                          <EditIcon className="icon" onClick={this.open} />
                        </div>
                        <div>
                          <h1 className="trainee_detail">{val.vendor_name}</h1>
                          <div className="age_details">
                            <h5>
                              <MdLocationOn className="group_icons" />
                            </h5>
                            <p className="trainee_text">
                              {val.vendor_address}
                            </p>
                          </div>
                          <div className="age_details">
                            <h5>
                              <MdLocalPhone className="group_icons" />
                            </h5>
                            <p className="trainee_text">{val.vendor_phone}</p>
                          </div>
                          
                          <div className="age_details">
                            <h5>
                              <MdEmail className="group_icons" />
                            </h5>
                            <p className="trainee_text">{val.vendor_contact_email}</p>
                          </div>
                          <div className="age_details">
                            <h5>
                              <IoIosGlobe className="group_icons" />
                            </h5>
                            <p className="trainee_text">{val.vendor_website}</p>
                          </div>
                          <div>
                            <h4 className="working_hour">
                              <b>{`Working Hours`}</b>
                            </h4>
                          </div>
                          {
                            val.workinghoursoflab.length > 0 && val.workinghoursoflab.map((wrkHrs) => {
                              return (
                                <div>
                                  <div className="working_detail">
                                    <h4 className="working_hour_detail">{wrkHrs.wh_weekday}</h4>
                                    <p className="working_time_detail">
                                      {
                                        dateFormat(new Date("1970-01-01T" + wrkHrs.wh_fromtime), "hh:MM TT")
                                      }
                                      -
                                      {
                                        dateFormat(new Date("1970-01-01T" + wrkHrs.wh_totime), "hh:MM TT")
                                      }
                                    </p>
                                  </div>
                                </div>
                              )
                            })

                          }
                        </div>
                      </div>
                      <Divider className="divider_profile" />
                      <div>
                        <div className="package_details_container">
                          <div className="package_details">
                            <div className="package_details_list">
                              <p>Contact Person</p>
                            </div>
                          </div>
                          <div>
                            <p>{val.vendor_contact}</p>
                          </div>
                        </div>
                      </div>

                      <div className="package_container">
                        <div className="package_details_container">
                          <div className="package_details">
                            <div className="package_details_list">
                              <p> Mobile Number</p>
                            </div>
                            <div>
                              <p></p>
                            </div>
                          </div>
                          <div>
                            <p>{val.vendor_contact_mobile}</p>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                )
              })}
            </Paper>
          </div>
        </Paper>

        <ProfileModal
          open={this.state.view}
          onClose={this.onclose}
          ProfileGetApi={() => this.ProfileGetApi()}
          ProfileData={this.state.ProfileData}
        />
      </div>


    );

  }

}

export default ProfileComp;
