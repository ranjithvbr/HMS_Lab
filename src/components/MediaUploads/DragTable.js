import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AppsIcon from '@material-ui/icons/Apps';
// import Modalcomp from "../../helper/Modalcomp";
// import DeleteMedia from "../../helper/deletemodel";
import { Icon, message, Popconfirm } from "antd";
import { Spin } from 'antd';
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


// standard icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import NotfoundIcon from "../../Images/NotFound.svg"
import { apiurl } from "../../../src/App.js";




import "../../helpers/TableComponent/TableComp.css";
import "./DragTable.css"
// import { arrayRemoveAll } from "redux-form";
const axios = require('axios');




function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  console.log("sort", array);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    console.log("order", order);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}



function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  // const headRows = [
  //   { id: "sno", label: "S.No" },
  //   { id: "patient", label: "Customer" },
  //   { id: "gender", label: "Gender" },
  //   { id: "age", label: "Age" },
  //   { id: "time", label: "Time" },
  //   { id: "service", label: "Service" },
  //   { id: "action", label: "Action" }
  // ];
  // console.log(props.heading, "heading")

  return (

    <TableHead className={props.alignheading}>
      <TableRow>
        {props.heading.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding={row.disablePadding ? "none" : "default"}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};


const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 3;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging && "#becbda",
  // backgroundImage:isDragging && "linear-gradient(90deg, #028ce1 0%, #6acbe0 100%)",
  // border:isDragging && "1px solid #5776af",
  borderRadius: 5,
  height: 52,

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  // width: "100%",
});


export default class DragdropTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "",
      open: false,
      orderBy: "media_title",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      viewmodal: false,
      rows: this.props.rowdata,
      viewdata: null,
      type: "",
      title: "",
      items: getItems(10),
      loader:this.props.props_loading
    };
  }


  handleRequestSort = (event, property) => {
    const isDesc =
      this.state.orderBy === property && this.state.order === "desc";
    this.setState({ order: isDesc ? "asc" : "desc" });
    this.setState({ orderBy: property });
  };

  closemodal = () => {
    this.setState({ view: false, DeleteView: false });
  };

  handleClick = (event, name) => {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected.push(this.state.selected, name);
    } else if (selectedIndex === 0) {
      // newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      // newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      // newSelected = newSelected.concat(
      //   selected.slice(0, selectedIndex),
      //   selected.slice(selectedIndex + 1),
      // );
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  handleChangeDense(event) {
    this.setState({ dense: event.target.checked });
  }

  receiveapprovaldata = (data, data1) => {
    console.log("receiveapproval", data);
    console.log("data1", data1);
    if (data1 == 1) {
      this.setState({ viewmodal: false });
      message.success("Your Leave Approved");
      this.loadVendorDetails();
    } else if (data1 == 2) {
      this.setState({ viewmodal: false });
      message.success("Your Leave Rejected");
      this.loadVendorDetails();
    }
  };
  receivedocdelete = data => {
    console.log("receivedocdelete", data);
    if (data.status == 0) {
      this.setState({ viewmodal: false });
      message.success(data.msg);
      this.loadDoctorDetails();
    }
  };
  sendapprovadata = data => {
    if (data.status == 0) {
      this.setState({ viewmodal: false });
      message.success(data.msg);
      this.loadDoctorDetails();
    }
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    console.log(newProps, "componentWillReceivePropsrowdata")
    let tablebodydata = this.props.rowdata
    this.setState({
      rows: newProps.rowdata,
      loader:newProps.props_loading
    })
    console.log("current state", this.state.rows)
  }

  onDragEnd = (result) => {
    this.setState({loader:true})
    console.log(result, "result")

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const rows = reorder(
      //   this.state.items,
      this.state.rows,
      result.source.index,
      result.destination.index,
    );

    console.log(rows, "dragrows")

    var dragid = []

    for (let i = result.source.index; i <= result.destination.index; i++) {
      dragid.push({ "media_id": rows[i].id, "sort_order": i })
    }

    for (let j = result.destination.index; j <= result.source.index; j++) {
      dragid.push({ "media_id": rows[j].id, "sort_order": j })
    }

    var self = this

    axios({
      method: 'put', //get method 
      url: apiurl + '/mediaSortOrder',
      data: {
        "vendor_id": "2",
        "sorting": dragid
      }
    })
      .then((response) => {
        console.log(response, "response")
        self.setState({loader:false})
      })

    console.log(dragid, "dragid")


    this.setState({
      rows,
    });
  }

  render() {
    const isSelected = name => this.state.selected.indexOf(name) !== -1;
    const { rows, rowsPerPage, page } = this.state;
    console.log(this.props.rowdata, "rowdata")

    return (
      <Spin className="spinner_align" spinning={this.state.loader}>
        <div className={`dragMasterClass VendorDetailsDiv`}>
          <Paper className="paper">
            <div className="tableWrapper">
              {/* <Table
              className="table"
              aria-labelledby="tableTitle"
              size={this.state.dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={this.state.selected.length}
                order={this.state.order}
                orderBy={this.state.orderBy}
                // onSelectAllClick={this.handleSelectAllClick}
                heading={this.props.heading}
                onRequestSort={this.handleRequestSort}
                rowCount={this.state.rows &&this.state.rows.length}
                alignheading={this.props.alignheading}
              /> */}

              <EnhancedTableHead
                numSelected={this.state.selected.length}
                order={this.state.order}
                orderBy={this.state.orderBy}
                // onSelectAllClick={this.handleSelectAllClick}
                heading={this.props.heading}
                onRequestSort={this.handleRequestSort}
                rowCount={this.state.rows && this.state.rows.length}
                alignheading={this.props.alignheading}
              />
              {
                this.state.rows.length === 0 && <TableCell className={"noFoundIconCenter"} colSpan={12}><img src={NotfoundIcon} /><div>No Data Found</div></TableCell>
              }
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {
                        this.state.rows.slice(
                          this.state.page * this.state.rowsPerPage,
                          this.state.page * this.state.rowsPerPage +
                          this.state.rowsPerPage
                        ).map((row, index) => (
                          <Draggable key={row.indexid} draggableId={row.indexid} index={index}>

                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                // {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <Table
                                  className="table"
                                  aria-labelledby="tableTitle"
                                  size={this.state.dense ? "small" : "medium"}
                                >

                                  <TableBody>
                                    <TableRow
                                      hover
                                      role="checkbox"
                                      tabIndex={-1}
                                      key={index}>

                                      <TableCell key={index} >
                                        {page === 0 ? <span {...provided.dragHandleProps}>
                                          <AppsIcon style={{ fontSize: "22px" }} />
                                        </span> : <AppsIcon style={{ fontSize: "22px" }} />}
                                      </TableCell>
                                      <TableCell>
                                        {this.state.rowsPerPage * this.state.page - 1 + index + 2}
                                      </TableCell>
                                      <TableCell key={index}>{row.title}</TableCell>
                                      <TableCell key={index}>{row.type}</TableCell>
                                      <TableCell key={index}>{row.uploaded}</TableCell>
                                      <TableCell key={index}>{row.status == 1 ? "Active" : "Inactive"}</TableCell>

                                      <TableCell className={"dragIconFelx"}>
                                        <VisibilityIcon className="tableeye_icon" onClick={() => this.props.modelopen("view", row.id)} />
                                        <EditIcon className="tableedit_icon" onClick={() => this.props.modelopen("edit", row.id)} />
                                        <DeleteIcon className="tabledelete_icon" onClick={() => this.props.deleteopen("delete", row.id)} />
                                      </TableCell>

                                    </TableRow>
                                  </TableBody>
                                </Table>

                              </div>
                            )}
                          </Draggable>
                        ))
                      }
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

            </div>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                native: true,
              }}
              component="div"
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActionsWrapped}
            />

          </Paper>

        </div>
      </Spin>
    );
  }
}
