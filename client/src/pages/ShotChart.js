// import React from "react";
// import court from "../images/court.png"
// import made from "../images/made.PNG"
// import missed from "../images/missed.PNG"


// class Canvas extends React.Component {
//     componentDidMount() {
//       const canvas = this.refs.canvas
//       console.log("ffff");
//       const con = canvas.getContext("2d")
//       const courtImage = this.refs.courtImage
//       const madeImage = this.refs.madeImage
//       const missedImage = this.refs.missedImage
//       courtImage.onload = () => {
//         con.drawImage(courtImage, 0, 0, 330, 288) 
       
//       }
//      // con.drawImage(this.refs.courtImage, 0, 0, 330, 288);
//     //  madeImage.onload = ()  => {
//     //     con.drawImage(madeImage, 0, 0, 6, 6)
//     // }
     
//     // missedImage.onload = ()  => {
//     //     con.drawImage(missedImage, 30, 30, 6, 6)
//     // }
     

//     let xPos = 0;
//     let yPos = 0;
//     let shotMade = 0;
//     let shotData=[];

//     xPos = Math.floor((Math.random() * 330) + 1);
//     yPos = Math.floor((Math.random() * 288) + 1);
//     shotMade = (Math.floor((Math.random() * 100) + 1) <= 50 ? 0:1);
//     shotData.push({xPos: xPos, yPos: yPos, shotMade: shotMade});

//     xPos = Math.floor((Math.random() * 330) + 1);
//     yPos = Math.floor((Math.random() * 288) + 1);
//     shotMade = (Math.floor((Math.random() * 100) + 1) <= 50 ? 0:1);
//     shotData.push({xPos: xPos, yPos: yPos, shotMade: shotMade});

//     xPos = Math.floor((Math.random() * 330) + 1);
//     yPos = Math.floor((Math.random() * 288) + 1);
//     shotMade = (Math.floor((Math.random() * 100) + 1) <= 50 ? 0:1);
//     shotData.push({xPos: xPos, yPos: yPos, shotMade: shotMade});

//     xPos = Math.floor((Math.random() * 330) + 1);
//     yPos = Math.floor((Math.random() * 288) + 1);
//     shotMade = (Math.floor((Math.random() * 100) + 1) <= 50 ? 0:1);
//     shotData.push({xPos: xPos, yPos: yPos, shotMade: shotMade});

//     xPos = Math.floor((Math.random() * 330) + 1);
//     yPos = Math.floor((Math.random() * 288) + 1);
//     shotMade = (Math.floor((Math.random() * 100) + 1) <= 50 ? 0:1);
//     shotData.push({xPos: xPos, yPos: yPos, shotMade: shotMade});
//       console.log(shotData);
//       shotData.forEach(shot => (
//         shot.shotMade === 1? 
//             console.log("hhhh")
//             // ()=> {
//             //     console.log("shot");
//             //     const x = this.refs.madeImage
//             //     x.onload = ()  => {
//             //         //     con.drawImage(madeImage, 0, 0, 6, 6)
//             //       con.drawImage(x, shot.xPos, shot.yPos,6,6)}
//             // }
//             :
//             console.log("fgfgf")
//             //con.drawImage(missedImage, shot.xPos, shot.yPos,6,6)
//     ))

//     // for (let j = 0; j< numberOfShots; j++) 
//     // {
      
//     //   if(shotData[j].shotMade ===1) 
//     //   {
//     //     const madeImage = this.refs.madeImage
//     //       madeImage.onload = ()  => {
//     //         con.drawImage(madeImage, shotData[j].xPos, shotData[j].yPos,6,6)
//     //     }
//     //     //con.drawImage(this.refs.madeImage, shotData[j].xPos, shotData[j].yPos,6,6);
//     //   }
//     //   else 
//     //   {
//     //     con.drawImage(this.refs.missedImage, shotData[j].xPos, shotData[j].yPos,6,6);
//     //   }

//     // }

//     }
//     render() {
//       return(
//         <div>
//           <canvas ref="canvas" width={330} height={288} />
//           <img ref="courtImage" alt="half court" src={court} className="d-none" />
//           <img ref="madeImage" alt="purple dot" src={made} className="d-none" />
//           <img ref="missedImage" alt="orange dot" src={missed} className="d-none"/>
//         </div>
//       )
//     }
//   }
//   export default Canvas