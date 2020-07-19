import React from "react";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";


function Login() {
    return (
      <>
     <Navbar/>
      <LoginForm signin="SIGN IN" heading="Sign in to your account" account="Need an account?" link="Create one." linkto="/Signup"/>
     <Footer/>
      </>
    );
  }

export default Login;