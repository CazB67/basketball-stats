import React from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stats from "./pages/Stats";
import DonutChart from "./pages/DonutChart";
import Charts from "./pages/Charts";
import Display from "./pages/Display";
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
                <Route exact path="/donut" component={DonutChart} />
                <Route exact path="/charts" component={Charts} />
                </Switch>
          </GlobalStore.GlobalProvider>
          
          </Container>
    </Router>
  );
}

export default App;