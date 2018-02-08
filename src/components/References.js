import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

const References = ({references}) => {
  
  references = references.map(ref => {
    return (
      <li key={shortid.generate()}>
        <p className="ref-title">{ref.book} | {ref.composer} | {ref.piece}</p>
        <p>{ref.quote} <small>{ref.page}</small></p>

      </li>
    );
  });

  return (
    <ul className="ref-list">{references}</ul>
  );
};

References.propTypes = {
  references: PropTypes.array
};

export default References;