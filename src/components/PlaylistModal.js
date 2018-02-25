import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, Table } from "react-bootstrap";

import getArtists from "../logic/getArtists";
import getDuration from "../logic/getDuration";

const PlaylistModal = (props) => {
  
  let trackInfo = props.currentPlaylist.map((track, i) => {
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
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Create playlist</Modal.Title>
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
        <Button onClick={props.handleHide}>Close</Button>
        <Button bsStyle="primary" onClick={() => props.getTrackInfo()}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

PlaylistModal.propTypes = {
  handleHide: PropTypes.func,
  getTrackInfo: PropTypes.func,
  show: PropTypes.bool.isRequired,
  currentPlaylist: PropTypes.array
};

export default PlaylistModal;