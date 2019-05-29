import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button, Icon } from "@material-ui/core";
import { icon, button } from "../../styles/config-styles";

const styles = theme => ({
  root: {
    fontFamily: theme.fontFamily,
    minHeight: "60vh",
  },
  description: {
    textAlign: "center",
    color: theme.palette.primary.dark,
  },
  icon: {
    ...icon,
  },
  button: {
    ...button,
    margin: "1vh 5vw",
  },
});

class Landing extends Component {
  onRegistertClick = e => {
    e.preventDefault();
    this.props.history.push("/register");
  };

  onLoginClick = e => {
    e.preventDefault();
    this.props.history.push("/login");
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        alignItems="center"
        justify="center"
      >
        <Grid className={classes.description} item xs={12}>
          <h2>2DO App</h2>
          <p className={classes.p}>
            Small and usefull application to save notes
          </p>
        </Grid>
        <Button
          variant="outlined"
          onClick={this.onRegistertClick}
          className={classes.button}
          xs={6}
          sm={12}
        >
          <Icon className={classnames(classes.icon, "fas fa-address-book")} />
          Register
        </Button>
        <Button
          variant="outlined"
          onClick={this.onLoginClick}
          className={classes.button}
          xs={6}
          sm={12}
        >
          <Icon className={classnames(classes.icon, "fas fa-sign-in-alt")} />
          Login
        </Button>
      </Grid>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Landing);
