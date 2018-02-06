import { connect } from "react-redux";
import { toggleComposer } from "../actions";

import ComposerCollection from "../components/ComposerCollection";

const mapStateToProps = state => ({
  composers: state.composers,
  genres: state.genres
});

const mapDispatchToProps = dispatch => ({
  onClick: composer => dispatch(toggleComposer(composer))
});

const ComposerCollectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposerCollection);

export default ComposerCollectionContainer;