import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

const References = ({references}) => {
  
  references = references.map(ref => {
    return (
      <li key={shortid.generate()}>
        <p className="ref-title">
          <span className="composer">{ref.composer}: {ref.piece}&nbsp;
            <button title={"Listen to " + ref.piece} className="listen-button"><i className="fas fa-music"></i></button>
          </span>
          <br/>
          <span className="book">| {ref.book}</span>
          <br/>
        </p>
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