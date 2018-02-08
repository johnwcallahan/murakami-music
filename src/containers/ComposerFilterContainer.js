import { connect } from "react-redux";
import { setFilter } from "../actions";

import ComposerFilter from "../components/ComposerFilter";

const mapStateToProps = state => ({
  filter: state.composerFilter,
});

const mapDispatchToProps = dispatch => ({
  handleChange: filter => dispatch(setFilter(filter))
});

const ComposerFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposerFilter);

export default ComposerFilterContainer;