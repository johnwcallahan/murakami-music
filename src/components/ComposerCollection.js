import React from "react";
import PropTypes from "prop-types";

const ComposerCollection = ({composers, genres, onClick}) => {
  let composerArr = [];
  for (let c in composers) {
    let genre = composers[c].genre;
    if (genres[genre].selected)
      composerArr.push(composers[c]);
  }
  let composerCollection = composerArr.map(c => {
    return (
      <li key={c.composer}>
        <button 
          onClick={() => onClick(c.composer)}
          className={c.selected ? "selected" : "not-selected"}>
        {c.composer}
        </button>
      </li>
    );
  });

  if (composers.length == 0) {
    return <div className="no-results">No results</div>;
  }
  
  return <ul className="collection composer-collection">{composerCollection}</ul>;
};

ComposerCollection.propTypes = {
  composers: PropTypes.object,
  genres: PropTypes.object,
  onClick: PropTypes.func
};

export default ComposerCollection;
