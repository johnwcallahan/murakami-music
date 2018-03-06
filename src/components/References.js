import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import { connect } from "react-redux";
import { setCurrentlyPlayingTrack, closeSpotifySettings } from "../actions";
import { getReferences } from "../util/helpers";

export const References = ({references, onClick}) => {

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

const mapStateToProps = state => ({
  references: getReferences(state)
});

const mapDispatchToProps = dispatch => ({
  onClick: uri => {
    dispatch(setCurrentlyPlayingTrack(uri));

    // Slight delay to smooth animation
    setTimeout(() => {
      dispatch(closeSpotifySettings());
    }, 400);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(References);

function insertLineBreaks(text) {
  return text.split("\n").map((item, index) => {
    return index == 0
      ? item
      : [<br key={shortid.generate()} />, item];
  });
}