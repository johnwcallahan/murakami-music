import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleGenre } from "../actions";

export const GenreCollection = ({genres, onClick}) => {
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
      <div className="collection-header">Composers</div>
      <ul className="collection genre-collection">{genreCollection}</ul>
    </div>
  );
};

GenreCollection.propTypes = {
  genres: PropTypes.object,
  onClick: PropTypes.func
};

const mapStateToProps = state => ({
  genres: state.genres,
});

const mapDispatchToProps = dispatch => ({
  onClick: genre => dispatch(toggleGenre(genre))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenreCollection);