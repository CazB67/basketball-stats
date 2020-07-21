import React from "react";
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'

export function OpponentModal(props) {
    
    return (
          <>
          <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Opponent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group as={Row}>
            <Col>
            <Form.Control onChange={props.onChange} type="text" placeholder="Opposing Team Name" />
            </Col>
          </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{color:"#ffffff", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)", backgroundColor: "#26004d"}} onClick={props.handleClose}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
          </>
    );
  }

  export function ScoreModal(props) {
    return (
          <>
          <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Score</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
            <Row>
              <Col>
                <Form.Control onChange={props.teamScoreInput}placeholder="Your Team's Score" />
              </Col>
              <Col>
                <Form.Control onChange={props.oppScoreInput}placeholder="Opposing Team's Score" />
              </Col>
            </Row>
          </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{color:"#ffffff", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)", backgroundColor: "#26004d"}} onClick={props.handleSavingGameData}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
          </>
    );
  }

  
  