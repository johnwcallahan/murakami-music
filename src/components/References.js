import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

const References = ({references, onClick}) => {
  
  references = references.map(ref => {
    return (
      <li key={shortid.generate()}>
        <p className="ref-title">
          <span className="composer">{ref.composer}: {ref.piece}
            <button title={"Listen to " + ref.piece} 
                    className="listen-button"
                    onClick={() => onClick(ref.spotifyId[0])}>
              <i className="fas fa-music"></i>
            </button>
          </span>
          <br/>
          <span className="book">| {ref.book}</span>
          <br/>
        </p>
        <p>{insertLineBreaks(ref.quote)} <small>({ref.page})</small></p>
      </li>      
    );
  });

  return (
    <div className="ref-container">
      {references.length > 0
        ? <ul className="ref-list">{references}</ul>
        : <p className="no-results">No results! Try selecting something else</p>  
      }
    </div>
  );
};

References.propTypes = {
  references: PropTypes.array,
  onClick: PropTypes.func
};

export default References;

function insertLineBreaks(text) {
  return text.split("\n").map((item, index) => {
    return index == 0
      ? item
      : [<br key={shortid.generate()} />, item];
  });
}