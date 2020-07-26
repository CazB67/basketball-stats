import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function LoginForm(props) {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [payload, setPayload] = useState({});

  const handleChange = async (event) => {
    const type = event.target.name;
    console.log(type);
    setPayload({
        ...payload,
        [type]: event.target.value, // dynamically set the type of payload
    });
    console.log(payload);
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
            history.push("/stats");
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
        <h1 className="text-center mt-5">Sign in to your account</h1>
        <p className="text-center mb-5">Need an account? <a href="/signup">Create one.</a></p>
        <Form onSubmit={onSubmit} className="p-4" style={{backgroundColor: "#26004d", color:"white"}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="timer">Email address</Form.Label>
            <Form.Control name="email" onChange={handleChange}className="timer" type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="timer">Password</Form.Label>
            <Form.Control name="password"onChange={handleChange} className="timer" type="password" placeholder="Password" />
            {errors.map((error) => (
            <Form.Text key={error}>{error}</Form.Text> 
            ))}
          </Form.Group>
          <Button onClick={onSubmit} className="timer" variant="light" type="submit" size="sm"active>
          SIGN IN
          </Button>
        </Form>
    </>
  );
}

export default LoginForm;