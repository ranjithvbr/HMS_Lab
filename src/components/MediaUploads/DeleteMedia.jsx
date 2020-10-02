import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import './ViewMedia.css'
import uploadimage from '../../Images/upload-button.png'
import Profile from '../../Images/11.jpg' 
export default class DeleteMedia extends Component {
    render() {
        return (
            <div className="record_delete_container"> 
                <Grid container>
                    <Grid item xs={12} md={12} className="media_title_container">
                      <div className="mediadelete_container"><p className="delete_para">Are You Sure Want to Delete This Record?</p></div>
                           <div className="mediadelete_container"><Button className="detete_no">No</Button>
                           <Button className="detete_yes">Yes</Button></div>
                      
                    </Grid>
                </Grid>
            </div>
        )
    }
}
