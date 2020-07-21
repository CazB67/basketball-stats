import React from "react";
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import "./style.css";

export function OpponentModal(props) {
    
    return (
          <>
          <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header>
              <Modal.Title className="court">Opponent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group as={Row}>
            <Col>
            <Form.Control className="court" onChange={props.onChange} type="text" placeholder="Opposing Team Name" />
            </Col>
          </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{fontFamily: 'Red Rose', boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)", backgroundColor: "#26004d"}} onClick={props.handleClose}>
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
            <Modal.Header>
              <Modal.Title className="court">Score</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
            <Row>
              <Col>
                <Form.Control className="court"onChange={props.teamScoreInput}placeholder="Your Team's Score" />
              </Col>
              <Col>
                <Form.Control className="court" onChange={props.oppScoreInput}placeholder="Opponent's Score" />
              </Col>
            </Row>
          </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{fontFamily: 'Red Rose', color:"#ffffff", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)", backgroundColor: "#26004d"}} onClick={props.handleSavingGameData}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
          </>
    );
  }

  
  