import React from "react";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

function Login() {
    return (
      <>
     <Navbar/>
      <LoginForm signin="SIGN UP" heading="Create an account" account="Already have an account?" link="Sign in." linkto="/Login"/>
     <Footer/>
      </>
    );
  }

export default Login;