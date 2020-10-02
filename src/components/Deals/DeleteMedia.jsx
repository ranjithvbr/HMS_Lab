import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./DeleteMedia.css";
import Axios from 'axios';
import { apiurl } from "../../App";
import {notification} from 'antd';



export default class DeleteMedia extends Component {



  constructor(props){
    super(props)
    this.state = {
      del_id:this.props.delid
    }
  }




 
  deleteRecord = () => {
      var data = {
          "id":this.state.del_id
      }
    Axios({
      method: 'DELETE',
      url: apiurl + "/" + this.props.apiendpoint,
      data:data
  }).then((response) => {
    
      this.props.listName === "deals" && this.props.getDealsList()
      this.props.closemodal()

      notification.info({
        description:
          'Record Deleted Successfully',
          placement:"topRight",
      });

      

      if(this.props.listName === "advertisement"){
     
        this.props.getAdvertiseList();
        this.props.generateAlert("Advertisement Deleted Successfully")
        this.props.closemodal()
       
      }
     
    
      
  }).catch((error) => {
      
  })
  }


  render() {
    console.log("fsdfjdshfjhsdf",this.props)
    return (
      <div className="record_delete_container">
        <Grid container>
          <Grid item xs={12} md={12} className="media_title_container">
            <div className="mediadelete_container">
              <p className="delete_para">
                Are You Sure Do You Want To Delete This Deal?
              </p>
            </div>
            <div className="mediadelete_container">
              <Button className="detete_no" onClick={() => this.props.closemodal()}>No</Button>
              <Button className="detete_yes" onClick={() => this.props.deleteitem()}>Yes</Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
