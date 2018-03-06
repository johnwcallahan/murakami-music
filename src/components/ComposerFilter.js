import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setFilter } from "../actions";

export const ComposerFilter = ({filter, handleChange}) => {
  return (
    <input placeholder="Filter..."
          className="composer-filter"
          onChange={e => handleChange(e.target.value)}
          value={filter}
    />
  );
};

ComposerFilter.propTypes = {
  filter: PropTypes.string,
  handleChange: PropTypes.func
};

const mapStateToProps = state => ({
  filter: state.composerFilter,
});

const mapDispatchToProps = dispatch => ({
  handleChange: filter => dispatch(setFilter(filter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposerFilter);