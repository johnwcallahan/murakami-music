import React from "react";
import PropTypes from "prop-types";
import { Modal, Table } from "react-bootstrap";

import getArtists from "../logic/getArtists";
import getDuration from "../logic/getDuration";

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
    let trackInfo = this.props.currentPlaylist.map((track, i) => {
      return (
        <tr key={track.id+i}>
          <td>{i+1}</td>
          <td>{track.name}</td>
          <td>{getArtists(track)}</td>
          <td className="duration">{getDuration(track)}</td>
        </tr>
      );
    });

    return (
      <Modal onEntered={() => this.nameInput.select()} 
            show={this.props.show}
            className="playlist-modal">
        <Modal.Header>
          {/* <Modal.Title>Create playlist</Modal.Title> */}
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
          <Table condensed>
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
        </Modal.Body>
    
        <Modal.Footer>
          <button className="close-modal" onClick={this.props.handleHide}>Close</button>
          <button className="create float-right" 
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
  currentPlaylist: PropTypes.array
};

export default PlaylistModal;