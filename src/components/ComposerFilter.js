import React from "react";
import PropTypes from "prop-types";

const ComposerFilter = ({filter, handleChange}) => {
  return (
    <input placeholder="Filter..." 
          className="composer-filter" 
          onChange={e => handleChange(e.target.value)}
          value={filter} />
  );

};

ComposerFilter.propTypes = {
  filter: PropTypes.string,
  handleChange: PropTypes.func
};

export default ComposerFilter;