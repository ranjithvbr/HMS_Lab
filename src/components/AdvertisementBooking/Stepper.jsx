
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import Check from '@material-ui/icons/Check';
// import SettingsIcon from '@material-ui/icons/Settings';
// import GroupAddIcon from '@material-ui/icons/GroupAdd';
// import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import { MdDone } from "react-icons/md";
import "./Stepper.css";
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import dateformat from "dateformat";
// import Typography from '@material-ui/core/Typography';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(117, 232, 155) 0%,rgb(117, 232, 155 ) 50%,rgb(117, 232, 155 ) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(117, 232, 155 ) 0%,rgb(117, 232, 155 ) 50%,rgb(117, 232, 155 ) 100%)',
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
    backgroundImage:
      'linear-gradient( 136deg,rgb(117, 232, 155 ) 0%, rgb(117, 232, 155 ) 50%, rgb(117, 232, 155 ) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(117, 232, 155 )  0%, rgb(117, 232, 155 )  50%, rgb(117, 232, 155 ) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <div className="icon_settings"><MdDone /></div>,
    2: <div className="icon_settings"><MdDone /></div>,
    3: <div className="icon_settings"><MdDone /></div>
    // 2: <GroupAddIcon />,
    // 3: <VideoLabelIcon />,
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
}));

function getSteps() {

  return ['Booked', 'Approved', 'Ad posted'];
}

export default function CustomizedSteppers(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep - 1);
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };
  // if(props.businessDays){

  // }
  console.log(props.businessDays, "businessDays")
  return (
    <div className="steeper_Container">

      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map(label => (
          <Step key={label} className="booked_text_edit">
            <StepLabel StepIconComponent={ColorlibStepIcon} >{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {
        <div className="steeper_info">
          <div className="">
            {props.businessDays.ad_start_date && dateformat(props.businessDays.ad_start_date,"dd mmm yyyy")}
          </div>

          <div className="">
            {props.businessDays.ad_approval_time && props.businessDays.ad_approval_time}
            {/* {"11 jun 2020"} */}
          </div>
          <div className="">
            {props.businessDays.ad_start_date && dateformat(props.businessDays.ad_start_date,"dd")}{"\xa0-\xa0"}{props.businessDays.ad_end_date && dateformat(props.businessDays.ad_end_date,"dd mmm yy")}
          </div>
        </div>
      }
                <div className="stepper__days">
            <label>{props.businessDays.business_days} Business Days</label>
          </div>
    </div>
  );
}

{/* <div className="btn_par_hide" >
        {activeStep === steps.length ? (
          <div>
         
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div> */}