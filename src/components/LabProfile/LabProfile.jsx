import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Profile from '../../Images/12.jpg'
import { Upload, Icon, message } from 'antd';
import Labelbox from '../../helpers/labelbox/labelbox'
import CheckboxLabels from './DayCheckbox'
import ClearIcon from '@material-ui/icons/Clear';
import './ProfileModal.css';
import { Tabs } from 'antd';
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
function callback(key) {
  console.log(key);
}

class Modalcomp extends React.Component {
  constructor(props) {
    super(props);
  console.log(props);
    this.state = {open: false,basicdetails:true,Workingdetails:false};
  }
  
        handleChange = info => {
          if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
          }
          if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
              this.setState({
                imageUrl,
                loading: false,
              }),
            );
          }
        };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  basicdetailsfn=()=>
  {
    this.setState({basicdetails:false}) 
  }
  Workingdetailsfn=()=>
  { 
    this.setState({Workingdetails:!this.state.Workingdetails})

  }
  handleClose = (value) => {
    // this.props.closemodal(false);
    this.setState({ open: false });
    console.log(this.state.open)
  };
  handleClickClose=()=>
  {
    this.setState({open:false})
  }
  Cancel=()=>
  {
    this.setState({open:false})   
    console.log(this.state.open)  
  }

  render() {
     const uploadButton = (
          <div>
            <div className="upload-icon"><i class="fa fa-user-plus"></i></div>
          </div>
        );
       const { imageUrl } = this.state; 
       const { TabPane } = Tabs;
    return (
      <div className="modaldiv">
       
        <Dialog className="Dialogmodal"
          onClose={this.props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
           maxWidth={this.props.xswidth ? 'xs' : 'md'}
           fullWidth={true}
           disableBackdropClick={true}
        >
          
          <DialogContent dividers className="DialogContent">
            <div className="dialog_title">
            <div className="clearicon"><ClearIcon className="clear"  onClose={this.handleClose}/></div>
          
             <div className="profile_container"> <div className="profile_imagediv"> <div className="User-upload-container"><Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} className="upload-img-circle" alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload></div></div>
              <div className="profile_image_container">
              <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
           </TabPane>
           </Tabs>
              </div>
          </div>
           </div>
              <div className="dialog_contentdiv">
             {this.state.basicdetails ==true?
         <Grid container>
         <Grid item xs={12} md={6}>
        <Labelbox type="text" labelname="Name"/>
        <Labelbox type="text" labelname="Address Line1"/>
        <Labelbox type="text" labelname="Address Line2"/>
        <Labelbox type="text" labelname="Pincode"/>
        <Labelbox type="text" labelname="Website"/>
      </Grid>
      <Grid item xs={12} md={6}>
          <Labelbox type="text" labelname="Mobile Number"/>
          <Labelbox type="text" labelname="Contact Person"/>
          <Labelbox type="text" labelname="Contact Person Mobile Number"/>
          <Labelbox type="text" labelname="Email Id"/>
          </Grid>
     
      </Grid>
       :this.state.Workingdetails == true &&<CheckboxLabels />}
       <div className="buttons_container"><div><div><Button className="cancel_button" variant="contained" onClick={this.handleClose}>Cancel</Button></div></div>
          <div><div><Button className="save_button" variant="contained" color="primary">Update</Button></div></div> 
          </div>
      </div>
          </DialogContent>
          {/*<DialogActions>
          <div>
           <Button className="closebtn" >
              Close
            </Button>
            <Button className="createbtn"  >
              Create 
            </Button>
            </div>
          </DialogActions>*/}
        </Dialog>
      </div>
    );
  }
}

export default Modalcomp;
