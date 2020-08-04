import React from "react";
import LoginForm from "../components/LoginForm";
import{ StatsNav} from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
    return (
      <>
      <StatsNav/>
      <LoginForm signin="SIGN IN"/>
      <Footer/>
      </>
    );
  }

export default Login;