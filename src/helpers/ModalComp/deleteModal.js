import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import './Modalcomp.css'

export default class DeleteMedia extends Component {
    render() {
        return (
            <div className="record_delete_container"> 
                <Grid container>
                    <Grid item xs={12} md={12} className="media_title_container">
                      <div className="mediadelete_container mb-5"><p className="delete_para">Are You Sure Want to Delete This Record?</p></div>
                           <div className="mediadelete_container" onClick={()=>this.props.closemodal()}><Button className="detete_no">No</Button>
                           <Button className="detete_yes" onClick={()=>this.props.deleterow()}>Yes</Button></div>
                      
                    </Grid> 
                </Grid>
            </div>
        )
    }
}
