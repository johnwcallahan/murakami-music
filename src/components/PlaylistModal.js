import React from "react";
import PropTypes from "prop-types";
import { Modal, Table } from "react-bootstrap";
import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { toggleGenre, createPlaylist } from "../actions";
import { getArtists, getDurationInMinutesAndSeconds } from "../util/helpers";

const DEFAULT_PLAYLIST_NAME = "Murakami Music Mix";

class PlaylistModal extends React.Component {
  constructor() {
    super();
    this.state = {
      input: DEFAULT_PLAYLIST_NAME
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getPlaylistName = this.getPlaylistName.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  getPlaylistName() {
    return this.state.input || DEFAULT_PLAYLIST_NAME;
  }

  render() {
    let trackInfo = this.props.playlist.trackInfo.map((track, i) => {
      return (
        <tr key={track.id+i}>
          <td>{i+1}</td>
          <td>{track.name}</td>
          <td>{getArtists(track)}</td>
          <td className="duration">{getDurationInMinutesAndSeconds(track)}</td>
        </tr>
      );
    });

    return (
      <Modal onEntered={() => this.nameInput.select()}
            keyboard={true}
            show={this.props.show}
            className="playlist-modal">
        <Modal.Header>
          <label htmlFor="playlist-input">Playlist name:</label>
          <input id="playlist-input"
                onChange={(e) => this.handleInputChange(e)}
                type="text"
                placeholder="Playlist name"
                defaultValue={this.state.input}
                ref={input => this.nameInput = input }
          />
        </Modal.Header>

        <Modal.Body>
        {this.props.playlist.error
          ? <p className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              <span className="error-text">
                {this.props.playlist.error.text}
              </span>
            </p>
          : <Table condensed>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {trackInfo}
              </tbody>
            </Table>
        }
        </Modal.Body>

        <Modal.Footer>
          <button className="close-modal shrink" onClick={this.props.handleHide}>Close</button>
          <button className="create grow float-right"
                  onClick={() => {
                    let playlistName = this.getPlaylistName();
                    this.props.createPlaylist(playlistName);
                  }}>Create</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

PlaylistModal.propTypes = {
  handleHide: PropTypes.func,
  createPlaylist: PropTypes.func,
  show: PropTypes.bool.isRequired,
  playlist: PropTypes.object
};

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
export default class PlaylistModalContainer extends React.Component {
  render() {
    const { name } = this.props;
    const WrappedPlaylistModal = connectModal({ name })(PlaylistModalInner);
    return <WrappedPlaylistModal />;
  }
}

PlaylistModalContainer.propTypes = {
  name: PropTypes.string
};