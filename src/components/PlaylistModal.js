import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, Table } from "react-bootstrap";

import getArtists from "../logic/getArtists";
import getDuration from "../logic/getDuration";

class PlaylistModal extends React.Component {
  constructor() {
    super();
    this.state = {
      input: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  render() {
    let trackInfo = this.props.currentPlaylist.map((track, i) => {
      return (
        <tr key={track.id+i}>
          <td>{i+1}</td>
          <td>{track.name}</td>
          <td>{getArtists(track)}</td>
          <td>{getDuration(track)}</td>
        </tr>
      );
    });

    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title>Create playlist</Modal.Title>
          <input onChange={(e) => this.handleInputChange(e)}
                type="text"
                placeholder="Playlist name" 
          />
        </Modal.Header>
    
        <Modal.Body>
          <Table hover condensed>
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
          <Button onClick={this.props.handleHide}>Close</Button>
          <Button bsStyle="primary" 
                  onClick={() => this.props.createPlaylist(this.state.input)}>Create</Button>
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