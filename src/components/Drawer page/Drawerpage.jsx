import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { BrowserRouter as Router, Switch, Route,NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "./Drawerpage.css";
import { Dropdown } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../Images/avatar.jpg";
import Badge from "@material-ui/core/Badge";
import bell from "../../Images/bell.png";
import Logo from "../../Images/Logo.png";
import home_svg from "../../Images/home_svg.svg";
import Appoint from "../../Images/Appoint.svg";
// import schedule_svg from '../../Images/schedule_svg.svg';
import {
  Menulist,
  MenuItem,
  ListItemText,
  ListItemIcon,
  MenuList,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import uploadresult from "../../Images/uploadresult.svg";
import deals from "../../Images/deals.svg";
import managetest from "../../Images/managetest.svg";
import upload_svg from "../../Images/upload_svg.svg";
import appointmentlist from "../../Images/lab/appointmentlist.svg";
import cancelledappointments from "../../Images/lab/cancelledappointments.svg";
import advertisementbooking from "../../Images/lab/advertisementbooking.svg";
import revenue from "../../Images/lab/revenue.svg";
import report from "../../Images/lab/report.svg";
import profile from "../../Images/lab/profile.svg";
import DashboardMaster from "../Dashboard/DashboardMaster";
import AppointmentList from "../AppointmentsList/AppointmentsMaster";
import UploadMaster from "../UploadResult/UploadMaster";
import CancelAppointmentMaster from "../CancelAppointments/CancelAppointmentMaster";
import AdvertisementMaster from "../AdvertisementBooking/AdvertisementMaster";
import DealsMaster from "../Deals/DealsMaster";
import RevenueMaster from "../Revenue/RevenueMaster";
import LabTestMaster from "../ManageTest/LabTestMaster";
import MediaUploadsMaster from "../MediaUploads/MediaUploadsMaster";
import ProfileComp from "../LabProfile/ProfileComp";
import PaymentReceived from "../PaymentReceived/PaymentReceived";
import CancelPayment from "../CancelPayment/CancelPayment";
import { apiurl } from "../../App";
import Axios from "axios";
import {notification} from 'antd';
import Noimageavailable from "../../Images/Noimageavailable.png"
import ManageCategory from "../ManageCategory";


const drawerWidth = 260;
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 100,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

var today = new Date();

var date=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })

class Drawerpage extends React.Component {

  generateAlert = (description) => {
    notification.success({
      // message: "Success",
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };


  state = {
    open: false,
    logout: false,
    custom_hide: true,
    ProfileData:[],
    date: date,
    time: time,
    current_location:""
  };

  componentDidMount(){
    this.ProfileGetApi()

    
      this.setState({
        current_location: window.location.href
      },() => console.log("sfdshfjsdhfjsdhfsdf", this.state.current_location))
  }
  ProfileGetApi=()=>{
    var self=this
    Axios({
      method: 'post',
      url: apiurl + '/Lab/getlabprofiledetails',
      data: {
        labId: "2",
      }
    })
  .then((response) => {
    var ProfileData=[]
    console.log(response,"getdetails")
    ProfileData=response.data.data
    this.setState({ProfileData}) 
  }).catch((error) => {
      })
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  viewmodalOpen = () => {
    this.setState({ viewmodal: true, profilecompopen: true });
  };
  viewmodalClose = () => {
    this.setState({ viewmodal: false });
  };
  logoutOpen = () => {
    this.setState({ logout: true });
  };
  logoutClose = () => {
    this.setState({ logout: false });
  };

  active_box = () => {
    this.setState({current_location:window.location.href},() => console.log("sfkjhdsfljkldhsfk",this.state.current_location))
  }
  render() {
    const { classes, theme, children } = this.props;
    if (this.state.custom_hide) {
      if (window.location.href.includes("/Home/profile")) {
        this.setState({
          viewmodal: true,
          custom_hide: false,
        });
      }
    }

    console.log(this.state.ProfileData,"ProfileData")

    return (
      <div className="drawerpage_container">
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <div className="drawer-logo-container">
                <img className="logo" src={Logo} alt="logo" />
              </div>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <div
                className={`${
                  this.state.open
                    ? "dropdown-container"
                    : "dropdown-container_close"
                }`}
              >
                <Dropdown>
                  <Badge
                    color="secondary"
                    variant="dot"
                    className={classes.margin}
                  >
                    <div className="notification-icon">
                      {" "}
                      <img className="notification" src={bell} />
                    </div>
                  </Badge>
                  <Dropdown.Toggle
                    variant="my_style"
                    id="dropdown-basic"
                    // onClick={this.logoutOpen}
                  >
                    {/* My Profile */}
                    {this.state.ProfileData && this.state.ProfileData[0] && this.state.ProfileData[0].vendor_name}
                  </Dropdown.Toggle>

                  {/* <Dropdown.Menu className="dropdown-menu" > */}
                  {/* <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
     <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
     <Dropdown.Item href="#/action-3">Log out</Dropdown.Item>  */}

                  {/* </Dropdown.Menu>   */}
                  {/* {this.state.logout === true && (
                    <div>
                      <ProfileLogout
                        open={this.state.logout}
                        onClose={this.logoutClose}
                      />
                    </div>
                  )} */}
               <Dropdown.Menu className="dropdown-menu">
                  {this.state.ProfileData.map((val)=>{
               return(
                    <div className="dropdown-img">
                    {/* <NavLink activeClassName="active" to="/Home/profilepage"> */}
                   
                      <img
                      
                        className="Avatar"
                        alt="avatar-missing"
                        src={val.vendor_filename ? val.vendor_filename : Noimageavailable }
                      />
             
                      {/* </NavLink> */}
                      
                     
                    </div>
                    )})}
                    {this.state.ProfileData.map((val)=>{
               return(
                    <div className="name_email">
                      <NavLink activeClassName="active" to="/Home/profile">
                   <div className="username" style={{color:'black',textDecoration:'none'}}>{val.vendor_name}</div>
                   </NavLink>
                   <NavLink activeClassName="active" to="/Home/profile">

                   <div style={{color:'#757575',textDecoration:'none'}}>{val.vendor_email}</div>
                   </NavLink>
                   </div>
               )})}
                    <Divider />
                    <div className="profile_logout_butt">
                    <NavLink activeClassName="active" to="/Home/profile">
                      <p>Profile</p>
                      </NavLink>
                      {/* <Button
                        className="logout_butt"
                        // onClick={this.handleClose}
                        onClose={this.props.onClose}
                        onClick={this.logoutclick}
                      >
                        Logout
                      </Button> */}
                      <a
                        component={NavLink}
                        href="/labmodule/?/"
                        className="logout_butt"
                        // onClick={this.handleClose}
                        onClose={this.props.onClose}
                      >
                        Logout
                      </a>
                    </div>
                    <Divider />
                    <div className="profile_logout_privacy ">
                      <p>Privacy Policy Terms of Service</p>
                    </div>
                  </Dropdown.Menu>

                </Dropdown>

                <div className="date-wrapper1">
                  <div className="date-wrapper2">
                  <large className="date">{this.state.date+" "+this.state.time}</large>
                  </div>
                </div>
              </div>
              {/* <Avatar
                className="Avatar-image"
                alt="avatar-missing"
                src={avatar}
                onClick={this.viewmodalOpen}
                className={classes.avatar}
              /> */}
      {this.state.ProfileData.map((val)=>{
               return(
              <Avatar
                className="Avatar-image"
                alt="avatar-missing"
                src={val.vendor_filename?val.vendor_filename:Noimageavailable}
                className={classes.avatar}
              />
               )})}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />

            <MenuList className="appbar_sideicons" onClick={this.active_box}>
              <MenuItem className={`${this.state.current_location.includes("/Dashboard" || "/dashboard") && "active_text_heading"}`} component={Link} to="/Home/Dashboard">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={home_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </MenuItem>
              <MenuItem component={Link} to="/Home/AppointmentsList" className={`${this.state.current_location.includes("/AppointmentsList") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={Appoint} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Appointment List" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/uploadresults" className={`${this.state.current_location.includes("/uploadresults") && "active_text_heading"}`} >
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={uploadresult} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Upload Results" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/CancelAppointments" className={`${this.state.current_location.includes("/CancelAppointments") && "active_text_heading"}`} >
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={cancelledappointments} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Cancelled Appointments" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/Advertisementbooking" className={`${this.state.current_location.includes("/Advertisementbooking") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={advertisementbooking} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Advertisement Booking" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/Deal" className={`${this.state.current_location.includes("/Deal") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={deals} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Deals" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/Revenue" className={`${this.state.current_location.includes("/Revenue") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={revenue} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Revenue" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/Category"  className={`${this.state.current_location.includes("/Category") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={managetest} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Manage Category" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/Test"  className={`${this.state.current_location.includes("/Test") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={managetest} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Manage Test" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/mediauploads" className={`${this.state.current_location.includes("/mediauploads") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={upload_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Media Uploads" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/profile" className={`${this.state.current_location.includes("/profile") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={profile} onClick={this.viewmodalOpen} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>

              <MenuItem component={Link}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={report} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Report" />
              </MenuItem>
            </MenuList>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Route
              path={`${this.props.match.path}/dashboard`}
              component={DashboardMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/AppointmentsList`}
              component={AppointmentList}
              exact
            />
            <Route
              path={`${this.props.match.path}/uploadresults`}
              component={UploadMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/CancelAppointments`}
              component={CancelAppointmentMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/advertisementbooking`}
              render={(props) => <AdvertisementMaster {...props} generateAlert={this.generateAlert} />}
              exact
            />
            <Route
              path={`${this.props.match.path}/Cancelpayment`}
              component={CancelPayment}
              exact
            />

            <Route
              path={`${this.props.match.path}/Deal`}
              component={DealsMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/Revenue`}
              component={RevenueMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/Category`}
              component={ManageCategory}
              exact
            />

            <Route
              path={`${this.props.match.path}/Test`}
              component={LabTestMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/mediauploads`}
              component={MediaUploadsMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/profile`}
              // component={ProfileComp}
              render={(props) => <ProfileComp {...props} ProfileGetApi={this.ProfileGetApi} />}
              exact
            />
            <Route
              path={`${this.props.match.path}/Paymentreceived`}
              component={PaymentReceived}
              exact
            />
            <div>
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }
}
Drawerpage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Drawerpage);
