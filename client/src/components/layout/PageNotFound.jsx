import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const styles = theme => ({
  container: {
    height: "70vh",
  },
  message: {
    fontSize: "2em",
    fontFamily: theme.fontFamily,
    color: theme.palette.primary.dark,
  },
});

const PageNotFound = props => {
  const { classes } = props;
  return (
    <Grid
      container
      className={classes.container}
      justify="center"
      alignItems="center"
    >
      <Typography className={classes.message}>404 PAGE NOT FOUND</Typography>
    </Grid>
  );
};

PageNotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageNotFound);
