import React from "react";
import "./style.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function LoginForm() {
    
  return (
    <>
        <h1 className="text-center">Sign in to your account</h1>
        <p className="text-center">Need an account? <a href="/Login">Create one.</a></p>
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
            Submit
          </Button>
        </Form>
    </>
  );
}

export default LoginForm;