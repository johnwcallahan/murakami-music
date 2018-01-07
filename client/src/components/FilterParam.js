import React from "react";
import PropTypes from "prop-types";

export default class FilterParam extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.setActiveFilter(this.props.type, e.target.value);
  }

  render() {
    return (
      <input placeholder="Filter composers..." className="filterParam" onChange={this.handleChange} />
    );
  }
}

FilterParam.propTypes = {
  setActiveFilter: PropTypes.func,
  type: PropTypes.string
};