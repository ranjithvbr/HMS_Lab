import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Upload, Icon, message } from 'antd';
import Labelbox from '../../helpers/labelbox/labelbox'
import CheckboxLabels from './DayCheckbox'
import BasicDetails from './BasicDetails'
import './ProfileModal.css';
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
          <CloseIcon className="closeicon_title" />
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

class Modalcomp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openprofile: false,
      basicdetails: true,
      Workingdetails: false,
      imageChanged: false,
      imageData: []
    };
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        imageData: info
      }, () => console.log("sdfdsfsdhfjhsdfhsdfd", this.state.imageData))
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
          imageChanged: true
        }),
      );
    }
  };


  basicdetailsfn = () => {
    this.setState({ basicdetails: true, Workingdetails: false })
  }

  Workingdetailsfn = () => {
    this.setState({ Workingdetails: true, basicdetails: false })
  }

  closemodel = () => {
    this.setState({ openprofile: false })
  }

  componentWillReceiveProps() {
    this.state.imageUrl = this.props.ProfileData.length > 0 && this.props.ProfileData[0].vendor_filename
  }

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    const uploadButton = (
      <div>
        <div className="upload-icon"><i class="fa fa-user-plus"></i></div>
      </div>
    );
    const { imageUrl } = this.state;

    return (
      <div className="labmodaldiv_profile">
        <Dialog
          className="Dialogmodaltitle"
          onClose={this.props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
          maxWidth={this.props.xswidth ? 'xs' : 'md'}
          fullWidth={true}
        >
          <DialogTitle
            id="customized-dialog-title"
            className="labModaltitle"
          >
            <div className="profile_container">
              <div className="profile_imagediv">
                <div className="User-upload-container">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}>
                    {imageUrl ? <img src={imageUrl} className="upload-img-circle" alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </div>
              </div>
              <div className="profile_image_container">
                <div>
                  <h3 className="basic_details"
                    onClick={this.basicdetailsfn}>
                    Basic Details
                  </h3>
                  {this.state.basicdetails == true ? <div className="tab_line"></div> : ""}
                </div>
                <div>
                  <h3 className="basic_details"
                    onClick={this.Workingdetailsfn}>
                    Working Hours
                </h3>
                  {this.state.Workingdetails == true ? <div className="tab_line"></div> : ""}
                </div>
              </div>
            </div>
          </DialogTitle>
          <DialogContent dividers className="DialogContent">

            <div>
              {this.state.basicdetails === true ?
                <BasicDetails
                  onClose={() => this.props.onClose(false)}
                  ProfileData={this.props.ProfileData}
                  ProfileGetApi={() => this.props.ProfileGetApi()}
                  imageData={this.state.imageData}
                  imageChanged={this.state.imageChanged}
                />
                : this.state.Workingdetails === true && <CheckboxLabels ProfileGetApi={() => this.props.ProfileGetApi()} onClose={() => this.props.onClose(false)}/>}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default Modalcomp;
