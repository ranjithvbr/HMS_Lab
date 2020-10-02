// import React, { Component } from "react";
// import { Steps } from 'antd';
// import { render } from 'react-dom';
// import './Status.css'
// const { Step } = Steps;
// export default class Stepper extends React.Component{
//   constructor(props){
//       super(props)
//       this.state={name:""}
//   }  

// render(){

// return(
//     <div>
//     <div className="status_bar_container">    
//  <div className="satus_container"><label>Order Approved</label><label>Packed</label><label>Out for Delivery</label><label>Expected Delivery</label><label>Delivered</label></div>
//  <div>
//   <Steps current={2}>
    
//     <Step />
//     <Step />
//     <Step />
//     <Step />
//     <Step />
//   </Steps>
//   </div>
//   <div className="timesatus_container">
//       <div><label>08 Dec 2020</label><p>10.00AM</p></div>
//       <div><label>08 Dec 2020</label><p>10.00AM</p></div>
//       <div><label>08 Dec 2020</label><p>10.00AM</p></div>
//       <div><label>08 Dec 2020</label><p>10.00AM</p></div>
//       <div><label>08 Dec 2020</label><p>10.00AM</p></div>
//  </div>
//   </div>
//   </div>
// )
// }
// }




import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import './Status.css'
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
      backgroundColor:'red',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
      backgroundColor:'red',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#2B97F2',
  },
  completed: {
    color: '#84FCAC',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,#84FCAC 0%,#84FCAC 50%,#4FB571 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient(180deg, #84FCAC 0%, #4FB571 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage: 'linear-gradient(180deg, #84FCAC 0%, #4FB571 100%)' ,
  },
  completed: {
    backgroundImage: 'linear-gradient(180deg, #84FCAC 0%, #4FB571 100%)' ,
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <CheckIcon  className="comp_sta_icon"/>,
    2: <CheckIcon className="comp_sta_icon"/>,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  // return [
  // <div><label>11 Dec 2010</label><div>09.30AM</div></div>, 
  // <div><label>11 Dec 2010</label><div>09.40AM</div></div>, 
  // <div><label>12 Dec 2010</label><div>10.00AM</div></div>,
  // <div><label>13 Dec 2010</label><div>12.00AM</div></div>,
  // <div><label>14 Dec 2010</label><div>13.00AM</div></div>  ];
  return[{tp_val:<div><label>Booked</label></div>,dw_val:<div><label>11 Dec 2010</label><div>09.30AM</div></div>},
    // {tp_val:<div><label>Packed</label></div>,dw_val:<div><label>11 Dec 2010</label><div>09.30AM</div></div>},
    {tp_val:<div><label>Approved</label></div>,dw_val:<div><label>11 Dec 2010</label><div>09.30AM</div></div>},
    // {tp_val:<div><label>Expected Delivery</label></div>,dw_val:<div><label>11 Dec 2010</label><div>09.30AM</div></div>,},
    {tp_val:<div><label>Ad Posted</label></div>,dw_val:<div><label>11 Dec 2010</label><div>09.30AM</div></div>}]
}


function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="stepper_container">
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>

        {steps.map(label => (
          <Step key={label.dw_val}>

            {/* {topsteps.map(toplabel=>(<p className="top_step" key={toplabel}>{toplabel}</p>))} */}
          <p style={{fontSize:"10px"}}>{label.dw_val}</p>
            
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <p className="top_step" key={label.tp_val}>{label.tp_val}</p>

              </StepLabel>

          </Step>

        ))}

      
      </Stepper>
     

    </div>
    </div>
  );
}