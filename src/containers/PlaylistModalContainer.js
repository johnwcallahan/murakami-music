import React, { Component } from "react";
import PropTypes from "prop-types";
import { connectModal } from "redux-modal";
import { connect } from "react-redux";

import { toggleGenre, createPlaylist } from "../actions";
import PlaylistModal from "../components/PlaylistModal";

// =============================================================================
// Connect PlaylistModal Component
// =============================================================================
const mapStateToProps = state => ({
  playlist: state.playlist
});

const mapDispatchToProps = dispatch => ({
  createPlaylist: name => dispatch(createPlaylist(name)),
  onClick: genre => dispatch(toggleGenre(genre))
});

const PlaylistModalInner = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistModal);

// =============================================================================
// Wrap PlaylistModal component via redux-modal
// =============================================================================
export default class PlaylistModalContainer extends Component {
  render() {
    const { name } = this.props;
    const WrappedPlaylistModal = connectModal({ name })(PlaylistModalInner);
    return <WrappedPlaylistModal />;
  }
}

PlaylistModalContainer.propTypes = {
  name: PropTypes.string
};