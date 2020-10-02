import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import './MediaUploadsModal.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Upload } from 'antd';
import { FiInfo } from "react-icons/fi";
import uploadimage from '../../Images/upload-button.png'
import Modalcomp from '../../helpers/ModalComp/Modalcomp';
import UploadMedia from './UploadMedia';
import axios from 'axios';
import {message } from 'antd';
import { apiurl } from "../../App";
import dateformat from 'dateformat';
import ValidationLibrary from "../../helpers/validationfunction";
import UploadPic from '../../Images/uploadfile.png';


var result = [];
export default class MediaUploadsModal extends Component {
    constructor(props){
        super(props)
        this.state={
            open:false,
            mediaError:false,
            imageurl: this.props.editData && this.props.editData.media_filename ? this.props.editData.media_filename : "",
            mediaupload_lab: {
              'media_title': {
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null,
              },
              'media_description':{
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null,
              },
      },
      'mediaupload_active':false,
      'upload_browser':{},
      type:"",
      mediatype:  this.props.editData && this.props.editData.media_type ? this.props.editData.media_type : "",
      sortorder:this.props.editData && this.props.editData.media_sortorder ? this.props.editData.media_sortorder : 1,
      filename: this.props.editData && this.props.editData.media_filename ? this.props.editData.media_filename : "",
}

console.log("sdfjhsdfjkhdsfjkdfs",this.state.filename)
}
    handleOpen=()=>
    {
        this.setState({open:true})
    }
    handleClose=()=>
    {
        this.setState({open:false})
    }

    componentWillMount() {

      if(this.props.editData){
      var imageurl = this.props.editData && this.props.editData.media_filename ?  this.props.editData.media_filename.split('/') : "";
       
      var imageurl = this.props.editData && this.props.editData.media_filename ? this.props.editData.media_filename : "";
      var imgarr = imageurl.split('/');
      var s = imgarr[imgarr.length - 1];
     
 
      var splitted = s.split('mediaDoc');
 
      this.setState({filename : this.props.editData.uploaded_file})
      }
    }
    changeDynamic = (data, key) => {
    //   if (key === 'profile_pic') {
    //     this.handleChange(data)
    // }
      var mediaupload_lab = this.state.mediaupload_lab;
      var errorcheck = ValidationLibrary.checkValidation(data, mediaupload_lab[key].validation);
      mediaupload_lab[key].value = data;
      mediaupload_lab[key].error = !errorcheck.state;
      mediaupload_lab[key].errmsg = errorcheck.msg;
      this.setState({ mediaupload_lab });
    }
// VALIDATION
    checkValidation = () => {
      var mediaupload_lab = this.state.mediaupload_lab;
      var medicineKeys = Object.keys(mediaupload_lab);
      // console.log(medicineKeys);
      for (var i in medicineKeys) {
        var errorcheck = ValidationLibrary.checkValidation(mediaupload_lab[medicineKeys[i]].value, mediaupload_lab[medicineKeys[i]].validation);
        // console.log(errorcheck);
        mediaupload_lab[medicineKeys[i]].error = !errorcheck.state;
        mediaupload_lab[medicineKeys[i]].errmsg = errorcheck.msg;
      }
      var filtererr = medicineKeys.filter((obj) =>
        mediaupload_lab[obj].error == true);
      // console.log(filtererr.length)
      if(this.state.imageurl == "") {
        this.setState({mediaError:true})
      }
      if (filtererr.length > 0 || this.state.mediaError) {
        this.setState({ error: true })
      } else {
        this.setState({ error: false })
        this.onSubmitData()
      }
      this.setState({mediaupload_lab})
    }
    onSubmitData = () => {
     

      if(this.props.editData){
        var formData = new FormData();
        console.log(this.state.imageurl,"checking_imageurl_value")
      
        formData.append('imageArray', this.state.imageurl)
        formData.set("mediatype",this.state.mediatype);
        formData.set("mediasortorder", this.state.sortorder)
        formData.set("mediavendorId", 2)
        formData.set("activeflag", 1)
        formData.set("createdby", 1)
        formData.set("created_on", dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"))
        formData.set("modifiedby", 1)
        formData.set("modifiedon", 1)
        formData.set("ipaddress", "192.144.23")
        formData.set("mediatitle", this.state.mediaupload_lab.media_title.value)
        formData.set("mediadescription", this.state.mediaupload_lab.media_description.value)
        formData.set("isactive", this.state.mediaupload_active == true ? 1:0)
        formData.set( "id",this.props.editData.id)
        this.mediaupload_labUpdateApi(formData)   // Update Api Call
      }else{
          var formData = new FormData();
       
      
      
        formData.append('imageArray', this.state.imageurl)
        formData.set("mediatype",this.state.mediatype);
        formData.set("mediasortorder", 1)
        formData.set("mediavendorId", 2)
        formData.set("activeflag", 1)
        formData.set("createdby", 1)
        formData.set("created_on", dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"))
        formData.set("modifiedby", 1)
        formData.set("modifiedon", 1)
        formData.set("ipaddress", "192.144.23")
        formData.set("mediatitle", this.state.mediaupload_lab.media_title.value)
        formData.set("mediadescription", this.state.mediaupload_lab.media_description.value)
        formData.set("isactive", this.state.mediaupload_active == true ? 1:0)
        this.mediaupload_labAddApi(formData)   // Insert Api Call
      }
      this.props.closemodal()
    }
    // POST API FOR ADD MEDIA
    mediaupload_labAddApi = (mediaupload_labApiData) => {
      this.props.getTableData()
      axios({
        method: 'POST',
        url: apiurl + '/insertMediaUpload',
        data: 
          mediaupload_labApiData
      })
      .then((response) => {
        console.log(response,"post_check_response")
        this.props.getTableData("Added")

      })

    }
    // for put api
   mediaupload_labUpdateApi = (mediaupload_labApiData) => {
    this.props.getTableData()
      axios({
        method:'PUT',
        url: apiurl+'/editMediaUpload',
        data:mediaupload_labApiData,
      })
      .then((response)=>{
        console.log(response,"response_checkingg")
        this.props.getTableData("Updated")
      }).catch((error)=>{
        alert(JSON.stringify(error))
      })
    }

  
componentDidMount(){
  

      const {editData,editopenModal} = this.props;
      if(editopenModal === true){
        this.state.editId= editData.id
        this.state.mediaupload_lab.media_title.value = editData.media_title
        // this.state.media_filename = editData.media_filename
        this.state.dataa = editData.dataa
        if(editData.media_filename != undefined && editData.media_filename != ''){  
          var it = editData.media_filename.split('/');
          var test = it[it.length-1].split('_')
          var dataa = test[test.length-1]
        }
        console.log(dataa,"dataa")
        // this.state.media_filename = editData.media_filename
        this.state.media_filename = dataa
        this.state.mediaupload_lab.media_description.value = editData.media_description
        this.state.mediaupload_active=editData.is_active === 1 ? true:false
        // console.log(this.state.mediaupload_lab.media_description.value,"descri_check")
      }
      this.setState({})
}
  // For checkbox api 
  dealActiveCheck = (e) => {
    this.setState({
      mediaupload_active: e.target.checked
    })
  }

    uploadFile=(e)=>{
      if(e.target.files[0].type == "image/png" || e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "video/mp4"){
       this.setState({
        imageurl:e.target.files[0],
        filename:e.target.files[0].name,
        type:e.target.files[0].type,
        mediaError:false
       },() => this.checkType())
      }else {
        this.setState({open:true})
     }
    }

    checkType = () => {
      if(this.state.type == "image/jpeg" || this.state.type == "image/png") {
        
        this.setState({mediatype:"Image"})
      }

      if(this.state.type == "video/mp4") {
        
        this.setState({mediatype:"Video"})
      }
    }

    render() {
   
      console.log("sdfljsdhfkjsdfhjdfjsk",this.state.filename)
    

   

      console.log(this.state.mediaupload_lab.media_description.value,"description")
      console.log(this.props.truegetmethod,"statevalue")
      const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: this.handleChange,
        headers: {
          authorization: 'authorization-text',
        },
    }

        return (
            <>
            <div className={`lab_mediauploads ${this.state.open === true && "d-none"}`}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
             <div className="media_title_head">
                 <Labelbox
                 type="text" 
                 labelname="Media Title"
                 changeData={(data) => this.changeDynamic(data,'media_title')}
                 value={this.state.mediaupload_lab.media_title.value}
                 error={this.state.mediaupload_lab.media_title.error}
                 errmsg={this.state.mediaupload_lab.media_title.errmsg}/>
            </div>
             </Grid>
             <Grid item xs={12} md={6}>
             <div className="clinicmedia_upload">Upload<span><FiInfo className="info_icon" onClick={this.handleOpen}/></span></div>
             <div className="labupload_container">
              
             </div>
            
               <div className={`${this.state.mediaError ? 'upload__container--err' : "upload__container"}`}>
                 <input type="text" value={this.state.filename} className="html__input-box" placeholder="Browse file"  onClick={() => document.getElementById('getFile').click()} />
                  <div className="upload__container--img">
                    <img src={UploadPic} className="upload__pic"  onClick={() => document.getElementById('getFile').click()} />
                  </div>
                    
               </div>

               <div>{this.state.mediaError && <span className="validation__error">Field Required</span> }</div>
            
             <input  type="file" id="getFile" className="fileupload" onChange={this.uploadFile}/>
         </Grid>
         <Grid item xs={12} md={12}>
         <div className="labmedia_checkbox">
           <Labelbox
            type="textarea"
             labelname="Description"
             changeData={(data) => this.changeDynamic(data,'media_description')}
             value={this.state.mediaupload_lab.media_description.value}
             error={this.state.mediaupload_lab.media_description.error}
             errmsg={this.state.mediaupload_lab.media_description.errmsg}/>
             </div>
         <div className="media_checkbox_container"><Checkbox checked={this.state.mediaupload_active}  onChange={(e) => this.dealActiveCheck(e)}/><span className="lab_active">Active</span></div>
        <div className="labmediabutton-container"><Button className="lab_Upload" onClick={this.props.closemodal}>Cancel</Button><Button className="labcancel-form"  onClick={this.checkValidation}>
          {this.props.editopenModal === true ? "update" : "upload"}
          </Button>
          </div>
        </Grid> 
           </Grid>
           </div>
         <Modalcomp clrgreen title="Upload Instructions" visible={this.state.open} closemodal={this.handleClose}>
             <UploadMedia/>
         </Modalcomp>
         </>
        )
    }
}
