import React from "react";
import { Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import "./style.css";

const FooterPage = () => {
  return (
    <footer className="font-small pt-4 mt-3 footer text-white">
      <Container fluid className="text-center text-md-left">
        <Row>
          <Col md="6">
            <h5 className="title">Basketball Stats</h5>
            <p>
              BASKETBALL STATS is where you can record your performance, recognise your strengths and weaknesses; and view your progress over time. Use BASKETBALL STATS to be the best player you can be!
            </p>
          </Col>
        </Row>
      </Container>
      <div className="footer-copyright text-center py-3">
        <Container fluid>
          &copy; {new Date().getFullYear()} Copyright: Basketball Stats
        </Container>
        <hr style={{width:"98%", height:"5px", color:"white", backgroundColor:"white"}}></hr>
      </div>
    </footer>
  );
}

export default FooterPage;