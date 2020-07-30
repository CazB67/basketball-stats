import React from "react";
import ImageMapper from 'react-image-mapper';
import court from "../../images/court.png";
import { Modal} from 'react-bootstrap'

function ShotChart(props) {
    const MAP = {
        name: "my-map",
        areas: [
            {
                name: "left three pointer baseline",
                shape: "poly",
                coords: [3,1,31,4,29,46,0,47],
                value: 1,
                alt: "left three pointer baseline",
                preFillColor: "rgba(255, 255, 255, 0.3)",
                strokeColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "right three pointer baseline",
                shape: "poly",
                coords: [302,2,329,4,329,50,302,53],
                value: 2,
                alt:"right three pointer baseline",
                preFillColor: "rgba(255, 255, 255, 0.3)",
                strokeColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "left three pointer 33degrees",
                shape: "poly",
                coords: [2,48,28,47,31,69,41,101,53,122,2,129],
                alt:"left three pointer 33degrees",
                value: 3,
                preFillColor: "rgba(255, 255, 255, 0.3)",
                strokeColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "left three pointer 45degrees",
                value: 4,
                shape: "poly",
                coords: [3,131,55,125,107,169,4,285],
                alt:"left three pointer",
                preFillColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "right three pointer 33degrees",
                alt: "right three pointer 33degrees",
                value: 5,
                shape: "poly",
                coords: [302,56,327,54,329,133,274,131],
                preFillColor: "rgba(255, 255, 255, 0.3)",
                strokeColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "right three pointer 45degrees",
                alt: "right three pointer 45degrees",
                value: 6,
                shape: "poly",
                coords: [271,127,328,132,329,284,223,172],
                preFillColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "centre three pointer",
                alt: "centre three pointer",
                value: 7,
                shape: "poly",
                coords: [102,171,65,215,259,215,219,171,187,177,146,180],
                preFillColor: "rgba(255, 255, 255, 0.3)",
                strokeColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "centre deep three pointer",
                alt: "centre deep three pointer",
                value: 8,
                shape: "poly",
                coords: [1,290,325,292,326,284,260,218,66,219,59,228,51,236],
                preFillColor: "rgba(255, 255, 255, 0.3)",
                strokeColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "left under hoop",
                alt: "left under hoop",
                value: 9,
                shape: "rect",
                coords: [127,24,166,58],
                preFillColor: "rgba(255, 255, 255, 0.3)",
                strokeColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "right under hoop",
                alt: "right under hoop",
                value: 10,
                shape: "rect",
                coords: [168,26,202,58],
                preFillColor: "rgba(255, 255, 255, 0.3)",
                strokeColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "right midrange",
                alt: "right midrange",
                value: 11,
                shape: "poly",
                coords: [206,28,301,26,302,46,296,66,288,84,280,104,271,123,249,142,229,162,213,169,204,171],
                preFillColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "left midrange",
                alt: "left midrange",
                value: 12,
                shape: "poly",
                coords: [125,25,31,26,33,49,37,80,47,110,64,129,81,142,89,153,112,166,123,175],
                preFillColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "deep midrange",
                alt: "deep midrange",
                value: 13,
                shape: "poly",
                coords: [124,131,203,126,201,176,126,174],
                lineWidth: 2,
                preFillColor: "rgba(255, 255, 255, 0.3)",
                strokeColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "left keyway",
                alt: "left keyway",
                value: 14,
                shape: "poly",
                coords: [128,61,162,61,165,117,125,118],
                preFillColor: "rgba(255, 255, 255, 0.3)",
                strokeColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "right keyway",
                alt: "right keyway",
                value: 15,
                shape: "poly",
                coords: [165,63,202,63,202,114,168,115],
                preFillColor: "rgba(255, 255, 255, 0.3)",
                strokeColor: "rgba(43, 22, 106, 1)"
            },
            {
                name: "foul",
                alt: "foul",
                value: 16,
                shape: "poly",
                coords: [127,122,199,117,200,126,127,130],
                preFillColor: "rgba(255, 255, 255, 0.3)",
                strokeColor: "rgba(43, 22, 106, 1)"
            }
    
        ]
    };

    function clicked(area) {
		// setState({
		// 	msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
		// 		area.coords
		// 	)} !`
        // });
        alert(area.value)
	}
    
    return (
        

		<Modal show={props.show} onHide={props.onHide}>

            <Modal.Header closeButton>
              <Modal.Title className="court">Shot Chart</Modal.Title>
            </Modal.Header>

            <Modal.Body>
				<ImageMapper 
					onClick={area => clicked(area)}
					src={court} 
					map={MAP}
				/>
            </Modal.Body>

            <Modal.Footer/>
              
          </Modal>
    );
  }

export default ShotChart;