import React from "react";
import { Modal } from 'react-bootstrap';

class ErrModal extends React.Component {
  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.hideModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Aww, Jeeez. What did you do?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ErrModal;