import React, { Component } from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import { connect } from "react-redux";
import { addTask, deleteTask, updateTask } from "../actions/tasksActions";
import classnames from "classnames";
import { Icon, Grid, Fab } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { icon } from "../styles/config-styles";

const styles = theme => ({
  icon: {
    ...icon,
  },
  addButton: {
    bottom: "5px",
    right: "5px",
    position: "fixed",
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      color: "#000",
      backgroundColor: theme.palette.primary.dark,
    },
  },
});
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNew: false,
    };
    this.addUserTask = this.addUserTask.bind(this);
    this.editUserTask = this.editUserTask.bind(this);
    this.deleteUserTask = this.deleteUserTask.bind(this);
    this.addEmptyTask = this.addEmptyTask.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
    this.createTasks = this.createTasks.bind(this);
    this.getObjectKeysCount = this.getObjectKeysCount.bind(this);
    this.getTaskColor = this.getTaskColor.bind(this);
  }

  addUserTask(taskData) {
    this.props.addTask(taskData);
    this.setState({
      addNew: false,
    });
  }

  editUserTask(taskData) {
    this.props.updateTask(taskData);
  }

  deleteUserTask(taskData) {
    this.props.deleteTask(taskData);
  }

  handleAddNew() {
    this.setState({
      addNew: true,
    });
  }

  addEmptyTask() {
    return <Task key={0} mode={"add"} addTask={this.addUserTask} />;
  }

  getObjectKeysCount(myObj) {
    if (myObj === null) {
      return -1;
    }
    return Object.keys(myObj).length;
  }

  getTaskColor(taskType) {
    const types = this.props.types;
    let type = types.find(
      type => taskType.toLowerCase() === type.title.toLowerCase()
    );
    return type.color;
  }

  createTasks() {
    let taskComponents = [];
    this.props.tasks.forEach(task => {
      let color = this.getTaskColor(task.type);
      taskComponents.push(
        <Task
          key={task._id}
          taskData={task}
          color={color}
          mode={"default"}
          handleDelete={this.deleteUserTask}
          addTask={this.addUserTask}
          editTask={this.editUserTask}
          handleEdit={this.handleEditOpen}
        />
      );
    });
    return taskComponents;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container justify="center">
          {this.state.addNew ? this.addEmptyTask() : null}
          {this.createTasks()}
        </Grid>
        <Fab
          className={classes.addButton}
          onClick={this.handleAddNew}
          variant="extended"
          size="large"
        >
          <Icon className={classnames(classes.icon, "fas fa-plus")} />
          ADD NEW
        </Fab>
      </div>
    );
  }
}

Dashboard.propTypes = {
  addTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  types: state.types.types,
});

export default connect(
  mapStateToProps,
  { addTask, deleteTask, updateTask }
)(withStyles(styles)(Dashboard));
