import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
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
  p: {
    margin: "0",
    lineHeight: "5vh",
  },
  errorText: {
    color: theme.palette.secondary.error,
  },
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
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
          <h2>Register</h2>
        </Grid>
        <Grid container justify="center" alignContent="flex-end">
          <Grid item>
            <p className={classes.p}>Already have an acount?&nbsp;</p>
          </Grid>
          <Link className={classes.link} to="/login">
            <p className={classes.p}>Login</p>
          </Link>
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
                error={errors.name ? true : false}
                id="name"
                onChange={this.handleChange}
                label="Name"
                className={classes.textField}
                type="text"
                margin="normal"
              />
            </Grid>
            <Grid item>
              <span className={classes.errorText}>{errors.name}</span>
            </Grid>
            <Grid item>
              <TextField
                required
                error={errors.email ? true : false}
                id="email"
                onChange={this.handleChange}
                label="Email"
                className={classes.textField}
                type="email"
                margin="normal"
              />
            </Grid>
            <Grid item>
              <span className={classes.errorText}>{errors.email}</span>
            </Grid>
            <Grid item>
              <TextField
                required
                error={errors.password1 ? true : false}
                id="password1"
                onChange={this.handleChange}
                label="Password"
                className={classes.textField}
                type="password"
                margin="normal"
              />
            </Grid>
            <Grid item>
              <span className={classes.errorText}>{errors.password1}</span>
            </Grid>
            <Grid item>
              <TextField
                required
                error={errors.password2 ? true : false}
                id="password2"
                onChange={this.handleChange}
                label="Confirm password"
                className={classes.textField}
                type="password"
                margin="normal"
              />
            </Grid>
            <Grid item>
              <span className={classes.errorText}>{errors.password2}</span>
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
                Register
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
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
  { registerUser }
)(withRouter(withStyles(styles)(Register)));
