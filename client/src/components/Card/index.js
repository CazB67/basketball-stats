import React from "react";
import { Card } from 'react-bootstrap'
import basketball from '../../images/basketball.png'

function StatsCard() {

  return (
    
<>
  <Card>
    <Card.Img variant="top" src={basketball} />
    <Card.Body>
      <Card.Text>
        Fouls
      </Card.Text>
    </Card.Body>
  </Card>
  
    
  
</>

      
  );
}

export default StatsCard;
