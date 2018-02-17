import { connect } from "react-redux";
import { setTrack } from "../actions";

import getReferences from "../logic/getReferences";
import References from "../components/References";

const mapStateToProps = state => ({
  references: getReferences(state)
});

const mapDispatchToProps = dispatch => ({
  onClick: track => dispatch(setTrack(track))
});

const ReferencesContainer = connect(
  mapStateToProps,
  mapDispatchToProps

)(References);

export default ReferencesContainer;