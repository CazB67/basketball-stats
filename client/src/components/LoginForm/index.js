import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import Form from 'react-bootstrap/Form';
import {Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import basketballers from '../../images/basketballers.png';

function LoginForm(props) {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    setPayload({})
  }, [])

  const handleChange = async (event) => {
    const type = event.target.name;
    setPayload({
        ...payload,
        [type]: event.target.value, // dynamically set the type of payload
    });
};

const onSubmit = async (event) => {
    event.preventDefault();
    // call api to login
    await axios
        .post(
            "/login",
            {
                email: payload.email,
                password: payload.password,
            },
            {
                withCredentials: true
            }
        )
        .then((response) => {
            history.push("/display");
        })
        .catch((err) => {
            // not authenticated
            console.log(err.response);
            if (err.response.data.errors) {
                const errorMsg = err.response.data.errors.map(
                    (err) => err.msg
                );
                // failed to register
                setErrors([...errorMsg]);
            } else {
                setErrors(['Whoops please enter your credentials']);
            }
        });
};
  return (
    <>
    <Row className="text-center mb-3">
      <Col>
        <h1 className="text-center mt-2">Sign in to your account</h1>
        <p className="text-center">Need an account? <a href="/signup">Create one.</a></p>
        <img  className="img-responsive" alt="basketballers" src={basketballers}/>
        </Col>
        </Row>
        <Form onSubmit={onSubmit} className="p-4" style={{backgroundColor: "#26004d", color:"white"}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="errorMessage">Email address</Form.Label>
            <Form.Control name="email" style={{fontFamily: 'Red Rose'}}  onChange={handleChange} className="timer" type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="errorMessage">Password</Form.Label>
            <Form.Control style={{fontFamily: 'Red Rose'}} name="password" onChange={handleChange} className="timer" type="password" placeholder="Password" />
            {errors.map((error) => (
            <Form.Text style={{color:"orange"}} key={error}>{error}</Form.Text> 
            ))}
          </Form.Group>
          <Button onClick={onSubmit} className="timer" variant="light" type="submit" active>
          {props.signin}
          </Button>
        </Form>
    </>
  );
}

export default LoginForm;