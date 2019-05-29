import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { initializeTasks } from "../../actions/tasksActions";
import { initializeTypes } from "../../actions/typesActions";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button, Icon, TextField } from "@material-ui/core";
import { icon, button, link, authForm } from "../../styles/config-styles";

const styles = theme => ({
  root: {
    ...authForm,
  },
  icon: {
    ...icon,
  },
  button: {
    ...button,
    marginTop: "10vh",
  },
  link: {
    ...link,
  },
  errorText: {
    color: theme.palette.secondary.error,
  },
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.initializeTypes();
      this.props.initializeTasks();
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  }

  render() {
    // TODO: on enter submin
    // TODO: on backspace go back
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} alignContent="flex-start">
        <Grid container justify="flex-start">
          <Link className={classes.link} to="/">
            <Icon
              className={classnames(classes.icon, "fas fa-long-arrow-alt-left")}
            />
            Main Page
          </Link>
        </Grid>
        <Grid container justify="center">
          <h2 className={classes.title}>Login</h2>
        </Grid>
        <Grid container justify="center">
          <form
            onSubmit={this.handleSubmit}
            className={classes.form}
            noValidate
          >
            <Grid item>
              <TextField
                required
                error={errors.email || errors.emailnotfound ? true : false}
                id="email"
                onChange={this.handleChange}
                label="Email"
                className={classes.textField}
                type="email"
                autoComplete="current-email"
                margin="normal"
              />
            </Grid>
            <Grid item>
              <span className={classes.errorText}>
                {errors.email}
                {errors.emailnotfound}
              </span>
            </Grid>
            <Grid item>
              <TextField
                required
                error={
                  errors.password || errors.passwordincorrect ? true : false
                }
                id="password"
                onChange={this.handleChange}
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
              />
            </Grid>
            <Grid item>
              <span className={classes.errorText}>
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </Grid>
            <Grid container justify="center">
              <Button
                variant="outlined"
                type="submit"
                className={classes.button}
                size="large"
                color="primary"
                fullWidth
              >
                Log In
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  initializeTasks: PropTypes.func.isRequired,
  initializeTypes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(
  mapStateToProps,
  { loginUser, initializeTasks, initializeTypes }
)(withStyles(styles)(Login));
