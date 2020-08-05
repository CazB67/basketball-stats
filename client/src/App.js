import React from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stats from "./pages/Stats";
import Display from "./pages/Display";
import Share from "./pages/Share";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import GlobalStore from "./utils/context/GlobalStore";

function App() {
  
  return (
    <Router>
          <Container>
          <GlobalStore.GlobalProvider>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/stats" component={Stats} />
                <Route exact path="/display" component={Display} />
                
                </Switch>
          </GlobalStore.GlobalProvider>
          <Route exact path="/share/:id" component={Share} />
          </Container>
    </Router>
  );
}

export default App;