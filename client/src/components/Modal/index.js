import React from "react";
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import "./style.css";

export function OpponentModal(props) {
    
    return (
          <>
          <Modal show={props.show} onHide={props.handleClose3}>
            <Modal.Header closeButton>
              <Modal.Title className="court">Opponent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate validated={props.validated} onSubmit={props.handleClose}>
            <Form.Group as={Row} controlId="validationCustom01">
            <Col>
            <Form.Control required className="court" onChange={props.onChange} type="text" placeholder="Opposing Team Name" />
            <Form.Control.Feedback type="invalid">Please provide an opponent.</Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Button className="mt-3" style={{fontFamily: 'Red Rose', boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)", backgroundColor: "#26004d"}} type="submit" >
                Save
              </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              
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
              <Modal.Title className="court">Score</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form noValidate validated={props.validated} onSubmit={props.handleSavingGameData}>
            <Row>
              <Col>
                <Form.Group controlId="validationCustom02">
                <Form.Control required type="number" className="court"onChange={props.teamScoreInput} placeholder="Team Score" />
                <Form.Control.Feedback type="invalid">Please provide an opponent.</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="validationCustom03">
                <Form.Control required type="number" className="court" onChange={props.oppScoreInput} placeholder="Opponent's Score" />
                <Form.Control.Feedback type="invalid">Please provide an opponent.</Form.Control.Feedback> 
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-3" style={{fontFamily: 'Red Rose', color:"#ffffff", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)", backgroundColor: "#26004d"}} type="submit">
                Save
              </Button>
          </Form>
          
            </Modal.Body>

            <Modal.Footer>
              
            </Modal.Footer>
          </Modal>
          </>
    );
  }
  
  