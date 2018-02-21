import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { connectModal } from "redux-modal";

const PlaylistModal = ({ show, handleHide }) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Hello</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Hello!
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleHide}>Close</Button>
        <Button bsStyle="primary" onClick={handleHide}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

PlaylistModal.propTypes = {
  handleHide: PropTypes.func,
  show: PropTypes.bool.isRequired
};

export default class PlaylistModalContainer extends Component {
  render() {
    const { name } = this.props;
    const WrappedPlaylistModal = connectModal({ name })(PlaylistModal);
    return <WrappedPlaylistModal />;
  }
}

PlaylistModalContainer.propTypes = {
  name: PropTypes.string
};