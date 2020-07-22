import React from "react";
import "./style.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function LoginForm(props) {
    
  return (
    <>
        <h1 className="text-center">{props.heading}</h1>
        <p className="text-center">{props.account} <a href={props.linkto}>{props.link}</a></p>
        <Form className="p-4" style={{backgroundColor: "#26004d", color:"white"}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="timer">Email address</Form.Label>
            <Form.Control className="timer" type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="timer">Password</Form.Label>
            <Form.Control className="timer" type="password" placeholder="Password" />
          </Form.Group>
          <Button className="timer" variant="light" type="submit" size="sm"active>
            {props.signin}
          </Button>
        </Form>
    </>
  );
}

export default LoginForm;