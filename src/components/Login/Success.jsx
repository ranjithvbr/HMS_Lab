import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import './ResetPassword.css'
export default class SuccessMsg extends Component {
    render() {
        return (
            <div> 
                <div className="success">Your Password has been successfully changed</div>
            </div>
        )
    }
}
