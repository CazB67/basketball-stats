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
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
          </Form.Group>
          <Button variant="light" type="submit" size="sm"active>
            {props.signin}
          </Button>
        </Form>
    </>
  );
}

export default LoginForm;