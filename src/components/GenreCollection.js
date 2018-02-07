import React from "react";
import PropTypes from "prop-types";

const GenreCollection = ({genres, onClick}) => {
  let genreArr = [];
  for (let g in genres) {
    genreArr.push(genres[g]);
  }
  let genreCollection = genreArr.map(g => {
    return (
      <li key={g.genre}>
        <button onClick={() => onClick(g.genre)}
                className={g.selected ? "selected" : "not-selected"}>
          {g.genre}  
        </button>
      </li>
    );
  });

  if (genres.length == 0) {
    return <div className="no-results">No results</div>;
  }
  
  return (
    <div>
      <button className="collection-header">Composers</button>
      <ul className="collection genre-collection">{genreCollection}</ul>
    </div>
  );
};

GenreCollection.propTypes = {
  genres: PropTypes.object,
  onClick: PropTypes.func
};

export default GenreCollection;