import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import UploadTable from "./UploadTable";
import PendingTable from './PendingTable';

import "./UploadDetails.css"

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class UploadDetails extends React.Component {
  state = {
    value: 0,
    weekMonthYearData:[],
    weekMonthYearDatapending:[],
    wk_Mn_Yr_Full_DataPending:[],
    wk_Mn_Yr_Full_DataUpload:[],
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.tabindex(value)

  };

  callmaster=(data)=>{
    this.props.tabledataFun(data)
  }

    UNSAFE_componentWillReceiveProps(newProps){
      console.log(newProps.searchData,"rowDetails")
      this.setState({
        searchData:newProps.searchData
      })
      if(newProps.propsopen){
      if(this.state.value){
        this.setState({
          weekMonthYearDatapending:newProps.weekMonthYearData,
          wk_Mn_Yr_Full_DataPending:newProps.wk_Mn_Yr_Full_Data,
          // searchDataPending:newProps.searchData,
          propsopen:newProps.propsopen,
          selectedDatepen:newProps.selectedDatepen
        })
    }else{
      this.setState({
        weekMonthYearData:newProps.weekMonthYearData,
        wk_Mn_Yr_Full_DataUpload:newProps.wk_Mn_Yr_Full_Data,
        // searchDataUpload:newProps.searchData,
        propsopen:newProps.propsopen,
        selectedDatepen:newProps.selectedDatepen
      })
    }
  }
    }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    console.log(this.state.searchData,"rowDetails")


    return (
      <div className={`${classes.root} tabfontUploadResult`}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} centered>
            <Tab label="Uploaded" />
            <Tab label="Pending" />
          </Tabs>
        </AppBar>
        {value === 0 && 
          <TabContainer>
          <UploadTable tabledataFun={(data)=>this.callmaster(data)} weekMonthYearData={this.state.weekMonthYearData} wk_Mn_Yr_Full_Data={this.state.wk_Mn_Yr_Full_DataUpload} searchData={this.state.searchData} propsopen={this.state.propsopen} selectedDatepen={this.state.selectedDatepen} />
          </TabContainer>}
        {value === 1 && 
          <TabContainer>
          <PendingTable tabledataFun={(data)=>this.callmaster(data)} weekMonthYearDatapending={this.state.weekMonthYearDatapending} wk_Mn_Yr_Full_Data={this.state.wk_Mn_Yr_Full_DataPending} searchData={this.state.searchData} propsopen={this.state.propsopen} selectedDatepen={this.state.selectedDatepen} />
          </TabContainer>}
      </div>
    );
  }
}

UploadDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadDetails);
