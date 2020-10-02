import React, { Component } from 'react';
import 'antd/dist/antd.css';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import './BasicDetails.css';
import './ProfileModal.css';
import axios from 'axios';
import ValidationLibrary from "../../helpers/validationfunction";
import { apiurl } from '../../App';
import {notification} from 'antd';

export default class BasicDetails extends React.Component {
  state = {
    open: "",
    basicDetails: {
      'address': {
        'value': '',
        validation: [{ 'name': 'required' },{'name':'address'}],
        error: null,
        errmsg: null
      },
      'contactPerson': {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
      'website': {
        'value': '',
        validation: [{ 'name': 'required' }, { 'name': 'webUrl' }],
        error: null,
        errmsg: null
      },
      'mobileNumber': {
        'value': '',
        validation: [{ 'name': 'required' }, { 'name': 'mobile' }],
        error: null,
        errmsg: null
      },
      'email': {
        'value': '',
        validation: [{ 'name': 'required' }, { 'name': 'email' }],
        error: null,
        errmsg: null
      },
      "ContactNumber":{
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      }
    }
  }

  componentDidMount() {
    // const {EditData,EditOpen}=this.props
    console.log("ProfileGetdata", this.props.ProfileGetdata)
    this.setProfileData();
  }

  setProfileData = () => {
    this.state.basicDetails.address.value = this.props.ProfileData[0].vendor_address
    this.state.basicDetails.contactPerson.value = this.props.ProfileData[0].vendor_contact
    this.state.basicDetails.website.value = this.props.ProfileData[0].vendor_website
    this.state.basicDetails.mobileNumber.value = this.props.ProfileData[0].vendor_phone
    this.state.basicDetails.email.value = this.props.ProfileData[0].vendor_contact_email
    this.state.basicDetails.ContactNumber.value = this.props.ProfileData[0].vendor_contact_mobile
    this.setState({})
  }

  checkValidation = () => {
    var basicDetails = this.state.basicDetails;
    var basicDetailsKeys = Object.keys(basicDetails);
    console.log(basicDetailsKeys);
    for (var i in basicDetailsKeys) {
      var errorcheck = ValidationLibrary.checkValidation(basicDetails[basicDetailsKeys[i]].value, basicDetails[basicDetailsKeys[i]].validation);
      console.log(errorcheck);
      basicDetails[basicDetailsKeys[i]].error = !errorcheck.state;
      basicDetails[basicDetailsKeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = basicDetailsKeys.filter((obj) =>
      basicDetails[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
      this.onSubmitData()
    }
    this.setState({ basicDetails })
  }
  changeDynamic = (data, key) => {
    var basicDetails = this.state.basicDetails;
    var errorcheck = ValidationLibrary.checkValidation(data, basicDetails[key].validation);
    basicDetails[key].value = data;
    basicDetails[key].error = !errorcheck.state;
    basicDetails[key].errmsg = errorcheck.msg;
    this.setState({ basicDetails });
    this.setState({})
  }


  onSubmitData = () => {
    var formData = new FormData()
    if (this.props.imageChanged === true) {

      for (let i in this.props.imageData) {
        formData.append('uploadFile', this.props.imageData[i].originFileObj)
        console.log("formdafdsfsdf", this.props.imageData[i].originFileObj)
      }

    } else {
      formData.append('uploadFile', '')
    }
    formData.set('address', this.state.basicDetails.address.value)
    formData.set('mobile', this.state.basicDetails.ContactNumber.value)
    formData.set('email', this.state.basicDetails.email.value)
    formData.set('website', this.state.basicDetails.website.value)
    formData.set('contact', this.state.basicDetails.contactPerson.value)
    formData.set('phone', this.state.basicDetails.mobileNumber.value)

    formData.set('labId', 2)
    formData.set('modifiedby', 1)
    axios({
      method: 'POST',
      url: apiurl + '/Lab/editlabprofiledetails',
      data: formData
    }).then((response) => {
      this.props.onClose()
      this.props.ProfileGetApi()
      notification.info({
        description:
          "Profile Updated Successfully",
        placement: "topRight",
      });
      console.log(response, "responseCheckProfile")
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    const ProfileGetdata = this.props
    console.log(ProfileGetdata, "ProfileGetdata")
    return (
      <div className="basic_details_container">
        <div className="row">
          <div className="col-md-6 basicdetails_child">
            <Labelbox type="text" labelname="Address"
              changeData={(data) => this.changeDynamic(data, 'address')}
              value={this.state.basicDetails.address.value}
              error={this.state.basicDetails.address.error}
              errmsg={this.state.basicDetails.address.errmsg}
            />
          </div>
          <div className="col-md-6 basicdetails_child">
            <Labelbox type="text" labelname="Vendor Mobile Number"
              changeData={(data) => this.changeDynamic(data, 'mobileNumber')}
              value={this.state.basicDetails.mobileNumber.value}
              error={this.state.basicDetails.mobileNumber.error}
              errmsg={this.state.basicDetails.mobileNumber.errmsg}
            />
          </div>
          <div className="col-md-6 basicdetails_child">
            <Labelbox type="text" labelname="Contact Person"
              changeData={(data) => this.changeDynamic(data, 'contactPerson')}
              value={this.state.basicDetails.contactPerson.value}
              error={this.state.basicDetails.contactPerson.error}
              errmsg={this.state.basicDetails.contactPerson.errmsg}
            />
          </div>
          <div className="col-md-6 basicdetails_child">
            <Labelbox type="text" labelname="Email Id"
              changeData={(data) => this.changeDynamic(data, 'email')}
              value={this.state.basicDetails.email.value}
              error={this.state.basicDetails.email.error}
              errmsg={this.state.basicDetails.email.errmsg}
            />
          </div>
          <div className="col-md-6 basicdetails_child">
            <Labelbox type="text" labelname="Website"
              changeData={(data) => this.changeDynamic(data, 'website')}
              value={this.state.basicDetails.website.value}
              error={this.state.basicDetails.website.error}
              errmsg={this.state.basicDetails.website.errmsg}
            />
          </div>
          <div className="col-md-6 basicdetails_child">
            <Labelbox type="text" labelname="Contact Person Mobile Number"
              changeData={(data) => this.changeDynamic(data, 'ContactNumber')}
              value={this.state.basicDetails.ContactNumber.value}
              error={this.state.basicDetails.ContactNumber.error}
              errmsg={this.state.basicDetails.ContactNumber.errmsg}
            />
          </div>
        </div>
        {/* <Grid container>
          <Grid item xs={12} md={6} className="basicdetails_container">
            <div className="basicdetails_firstgrid">
              <div className="basicdetails_child">
                <Labelbox type="text" labelname="Address"
                  changeData={(data) => this.changeDynamic(data, 'address')}
                  value={this.state.basicDetails.address.value}
                  error={this.state.basicDetails.address.error}
                  errmsg={this.state.basicDetails.address.errmsg}
                />
                <Labelbox type="text" labelname="Contact Person"
                  changeData={(data) => this.changeDynamic(data, 'contactPerson')}
                  value={this.state.basicDetails.contactPerson.value}
                  error={this.state.basicDetails.contactPerson.error}
                  errmsg={this.state.basicDetails.contactPerson.errmsg}
                />
                <Labelbox type="text" labelname="Website"
                  changeData={(data) => this.changeDynamic(data, 'website')}
                  value={this.state.basicDetails.website.value}
                  error={this.state.basicDetails.website.error}
                  errmsg={this.state.basicDetails.website.errmsg}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="basicdetails_container">
            <div className="basicdetails_firstgrid">
              <div className="basicdetails_child">
                <Labelbox type="text" labelname="Mobile Number"
                  changeData={(data) => this.changeDynamic(data, 'mobileNumber')}
                  value={this.state.basicDetails.mobileNumber.value}
                  error={this.state.basicDetails.mobileNumber.error}
                  errmsg={this.state.basicDetails.mobileNumber.errmsg}
                />
                <Labelbox type="text" labelname="Email Id"
                  changeData={(data) => this.changeDynamic(data, 'email')}
                  value={this.state.basicDetails.email.value}
                  error={this.state.basicDetails.email.error}
                  errmsg={this.state.basicDetails.email.errmsg}
                />
              </div>
            </div>
          </Grid>
        </Grid> */}
        <div className="buttons_container">
          <div>
            <div>
              <Button className="cancel_button" variant="contained" onClick={() => this.props.onClose()}>Cancel</Button>
            </div>
          </div>
          <div>
            <div>
              <Button className="update_button" variant="contained" color="primary" onClick={this.checkValidation}>Update</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}