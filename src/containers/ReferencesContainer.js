import { connect } from "react-redux";

import getReferences from "../logic/getReferences";
import References from "../components/References";

const mapStateToProps = state => ({
  references: getReferences(state)
});

const ReferencesContainer = connect(
  mapStateToProps
)(References);

export default ReferencesContainer;