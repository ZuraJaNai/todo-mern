import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  Icon,
  Paper,
  Fab,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { icon, visible, hidden } from "../styles/config-styles";
import TypeChooser from "./TypeChooser";
import theme from "../styles/theme";

const styles = theme => ({
  paper: {
    width: "275px",
    height: "180px",
    margin: "15px",
    padding: "10px",
  },
  icon: {
    ...icon,
  },
  title: {
    fontSize: "1.1em",
  },
  text: {
    overflowY: "auto",
    height: "90px",
  },
  button: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.light,
    margin: "5px",
    "&:hover": {
      color: "#000",
    },
  },
  textGroup: {},
  btnGroup: {
    width: "20%",
  },
  actions: {
    transition: "opacity 0.5s linear",
    width: "75px",
  },
  visible: {
    ...visible,
  },
  hidden: {
    ...hidden,
  },
});

const empty = {
  type: "default",
  text: "",
};

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      mode: this.props.mode,
      task: { ...this.props.taskData } || empty,
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeHover = this.changeHover.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.submitTask = this.submitTask.bind(this);
  }

  handleChange(e) {
    let task = { ...this.state.task };
    task[e.target.name] = e.target.value;
    this.setState({
      task: task,
    });
  }

  changeHover(value) {
    this.setState({
      hover: value,
    });
  }

  changeMode(newMode) {
    this.setState({
      mode: newMode,
    });
  }

  submitTask() {
    if (this.state.mode === "add") {
      this.props.addTask(this.state.task);
    } else if (this.state.mode === "edit") {
      this.props.editTask(this.state.task);
      this.changeMode("default");
    }
  }

  formatDate(rawDate) {
    let date = rawDate.slice(0, 10);
    let time = rawDate.slice(11, 16);
    return `[${date}]  [${time}]`;
  }

  render() {
    const { classes } = this.props;
    var cardStyle = {
      backgroundColor: this.props.color,
    };
    if (this.state.mode === "default") {
      var NoneModeButtons = this.state.hover ? classes.visible : classes.hidden;
      var type = (
        <Typography className={classes.title}>
          {this.state.task.type}
        </Typography>
      );
      var date = (
        <Typography className={classes.title} gutterBottom>
          {this.formatDate(this.state.task.date)}
        </Typography>
      );
      var text = (
        <div className={classes.text}>
          <Typography>{this.state.task.text}</Typography>
        </div>
      );
      var submitBtn = null;
    } else {
      NoneModeButtons = classes.hidden;
      type = (
        <TypeChooser
          title={this.state.task.type}
          handleChange={this.handleChange}
        />
      );
      date = null;
      text = (
        <TextField
          name="text"
          label="Text"
          multiline
          rows="4"
          value={this.state.task.text}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
        />
      );
      submitBtn = (
        <Fab
          size="small"
          className={classes.button}
          variant="round"
          onClick={this.submitTask}
        >
          <Icon className={classnames(classes.icon, "fas fa-check")} />
        </Fab>
      );
    }
    return (
      <div>
        <div className="firstDiv">
          <p>par1</p>
          <p>par12</p>
          <p>par123</p>
        </div>
        <Paper
          className={classes.paper}
          onMouseOver={() => this.changeHover(true)}
          onMouseOut={() => this.changeHover(false)}
          style={cardStyle}
        >
          <Grid
            container
            justify="space-between"
            wrap="nowrap"
            className={classes.textGroup}
          >
            <Grid container direction="column" justify="flex-start">
              {type}
              {date}
              {text}
            </Grid>
            <Grid
              container
              className={classes.btnGroup}
              direction="column"
              justify="flex-start"
              alignContent="flex-end"
            >
              <div className={classnames(NoneModeButtons)}>
                <Fab
                  size="small"
                  className={classes.button}
                  variant="round"
                  onClick={() => this.changeMode("edit")}
                >
                  <Icon className={classnames(classes.icon, "fas fa-edit")} />
                </Fab>
                <Fab
                  size="small"
                  className={classes.button}
                  variant="round"
                  onClick={() => this.props.handleDelete(this.state.task)}
                >
                  <Icon
                    className={classnames(classes.icon, "fas fa-trash-alt")}
                  />
                </Fab>
              </div>
              {submitBtn}
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

Task.propTypes = {
  handleDelete: PropTypes.func,
  addTask: PropTypes.func,
  editTask: PropTypes.func,
  taskData: PropTypes.object,
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  mode: PropTypes.oneOf(["default", "add"]),
};

Task.defaultProps = {
  color: theme.palette.secondary.white,
};

export default withStyles(styles)(Task);
