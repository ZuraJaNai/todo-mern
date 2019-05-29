import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Button, Icon } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  icon,
  link,
  button,
  visible,
  hidden,
} from "../../styles/config-styles";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.dark,
  },
  title: {
    color: "inherit",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    ...icon,
  },
  link: {
    ...link,
    color: theme.palette.primary.light,
  },
  button: {
    ...button,
    color: theme.palette.primary.light,
    width: "10vh",
  },
  visible: {
    ...visible,
  },
  hidden: {
    ...hidden,
  },
});

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { classes } = this.props;
    return (
      <nav className={classes.root}>
        <Link className={classnames(classes.title, classes.link)} to="/">
          <Icon className={classnames(classes.icon, "fas fa-list")} />
          2DO APP
        </Link>
        <Button
          className={classnames(
            classes.button,
            this.props.auth.isAuthenticated ? classes.visible : classes.hidden
          )}
          onClick={this.onLogoutClick}
        >
          Logout
        </Button>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(withStyles(styles)(Navbar));
