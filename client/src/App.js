import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'


function App() {
  return (
    <Router>
      
          <Container>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          </Container>
    </Router>
  );
}

export default App;