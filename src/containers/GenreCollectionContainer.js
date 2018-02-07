import { connect } from "react-redux";
import { toggleGenre } from "../actions";

import GenreCollection from "../components/GenreCollection";

const mapStateToProps = state => ({
  genres: state.genres,
});

const mapDispatchToProps = dispatch => ({
  onClick: genre => dispatch(toggleGenre(genre))
});

const GenreCollectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GenreCollection);

export default GenreCollectionContainer;