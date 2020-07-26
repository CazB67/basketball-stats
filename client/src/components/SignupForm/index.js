import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function SignupForm() {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [payload, setPayload] = useState({});

    const handleChange = async (event) => {
        const type = event.target.name;
        setPayload({
            ...payload,
            [type]: event.target.value  // dynamically set the type of payload
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        // check if password submitted are the same 
        if(payload.password !== payload.password_again){
            return setErrors([
                'Passwords do not match!'
            ])
        }

    // call api to login
    console.log(payload);
    axios.post("/register", payload, {
            withCredentials: true
        })
        .then((res) => {
            history.push("/Login");
        })
        .catch((err) => {
            console.log(err.response);
            const errorMsg = err.response.data.errors.map(err => err.msg)
            // failed to register
            setErrors([...errorMsg]);
        });
};
  return (
    <>
        <h1 className="text-center mt-5">Create an account</h1>
        <p className="text-center mb-5">Already have an account? <a href="/login">Sign in.</a></p>
        <Form onSubmit={onSubmit} className="p-4" style={{backgroundColor: "#26004d", color:"white"}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="timer">Email address</Form.Label>
            <Form.Control name="email" onChange={handleChange} className="timer" type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="timer">Password</Form.Label>
            <Form.Control  name="password" onChange={handleChange} className="timer" type="password" placeholder="Password"  />
          </Form.Group>
          <Form.Group controlId="formBasicPassword-check">
            <Form.Label className="timer">Password</Form.Label>
            <Form.Control name="password_again" onChange={handleChange} className="timer" type="password" placeholder="Password Again" />
            {errors.map((error) => (
            <Form.Text key={error}>{error}</Form.Text> 
            ))}
          </Form.Group>
          <Button onClick={onSubmit} className="timer" variant="light" type="submit" size="sm"active>
          SIGN UP
          </Button>
        </Form>
    </>
  );
}

export default SignupForm;