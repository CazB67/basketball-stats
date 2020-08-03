import React from "react";
import LoginForm from "../components/LoginForm";
import{ StatsNav} from "../components/Navbar";
import Footer from "../components/Footer";
//import { Spinner } from 'react-bootstrap';

function Login() {
    return (
      <>
      <StatsNav/>
      <LoginForm signin="SIGN IN">
      
      </LoginForm>
      
      <Footer/>
      </>
    );
  }

export default Login;