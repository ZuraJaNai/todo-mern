import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addType, deleteType } from "../actions/typesActions";
import { FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  selectMenu: {
    width: "150px",
  },
});
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.getTypeItems = this.getTypeItems.bind(this);
  }

  getTypeItems() {
    return this.props.types.map(type => (
      <MenuItem key={type.title} value={type.title}>
        {type.title}
      </MenuItem>
    ));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="title">Type</InputLabel>
          <Select
            classes={{
              selectMenu: classes.selectMenu,
            }}
            value={this.props.title}
            onChange={this.props.handleChange}
            name="type"
            className={classes.selectType}
          >
            {this.getTypeItems()}
          </Select>
        </FormControl>
      </div>
    );
  }
}

Dashboard.propTypes = {
  types: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  types: state.types.types,
});

export default connect(
  mapStateToProps,
  { addType, deleteType }
)(withStyles(styles)(Dashboard));
