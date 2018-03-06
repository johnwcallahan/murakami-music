import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleComposer } from "../actions";

export const ComposerCollection = ({composers, genres, composerFilter, onClick}) => {
  let composerArr = [];
  for (let c in composers) {
    let genre = composers[c].genre;
    if (genres[genre].selected)
      composerArr.push(composers[c]);
  }
  let composerCollection = composerArr.map(c => {

    if (!composerMatchesFilter(c.composer, composerFilter))
      return;

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

  return (
    <div className="composer-collection-wrap">
      <ul className="collection composer-collection">{composerCollection}</ul>
    </div>
  );
};

ComposerCollection.propTypes = {
  composers: PropTypes.object,
  composerFilter: PropTypes.string,
  genres: PropTypes.object,
  onClick: PropTypes.func
};

const mapStateToProps = state => ({
  composers: state.composers,
  genres: state.genres,
  composerFilter: state.composerFilter
});

const mapDispatchToProps = dispatch => ({
  onClick: composer => dispatch(toggleComposer(composer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposerCollection);

function composerMatchesFilter(composer, filter) {
  composer = composer.toLowerCase();
  filter = filter.toLowerCase();
  return (composer.indexOf(filter) > -1);
}