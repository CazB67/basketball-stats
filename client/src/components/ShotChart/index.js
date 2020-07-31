import React from "react";
import ImageMapper from 'react-image-mapper';
import court from "../../images/court.png";
import { Modal} from 'react-bootstrap'

function ShotChart(props) {
    return (
        

		<Modal show={props.show} onHide={props.onHide}>

            <Modal.Header closeButton>
              <Modal.Title className="court">Shot Chart</Modal.Title>
            </Modal.Header>

            <Modal.Body>
				<ImageMapper 
					onClick={props.onClick}
					src={court} 
					map={props.MAP}
				/>
            </Modal.Body>

            <Modal.Footer/>
              
          </Modal>
    );
  }

export default ShotChart;