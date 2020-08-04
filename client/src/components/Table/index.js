import React from "react";
import { Table } from 'react-bootstrap'
import { EmailShareButton, FacebookShareButton, WhatsappShareButton,  FacebookIcon, WhatsappIcon, EmailIcon } from "react-share";

export function DataTable(props) {
 
  const title = 'Game Stats';
    return (
      <>
         <tbody>
            <tr>
              <td><EmailShareButton url={props.shareUrl} Title={title}><EmailIcon size={20} round className="mr-1"/></EmailShareButton>
                  <FacebookShareButton url={props.shareUrl} Title={title}><FacebookIcon size={20} round className="mr-1" /></FacebookShareButton>
                  <WhatsappShareButton url={props.shareUrl} Title={title}><WhatsappIcon size={20} round/></WhatsappShareButton></td>
              <td>{props.date}</td>
              <td>{props.opponent}</td>
              <td>{props.score}</td>
              <td>{props.onemade}</td>
              <td>{props.onemissed}</td>
              <td>{props.twomade}</td>
              <td>{props.twomissed}</td>
              <td>{props.threemade}</td>
              <td>{props.threemissed}</td>
              <td>{props.defreb}</td>
              <td>{props.offreb}</td>
              <td>{props.steal}</td>
              <td>{props.assist}</td>
              <td>{props.foul}</td>
              <td>{props.turnover}</td>
              <td>{props.courttime}</td>
              <td><i onClick={props.onClick} className="fas fa-trash"></i></td>
            </tr>
          </tbody>
              </>
    );
  }
  
  export function TableHeader (props) {
    return (
      <>
       <thead>
            <tr>
              <th>ShareGame</th>
              <th>DateOfGame</th>
              <th>Opponent</th>
              <th>FinalScore</th>
              <th>1PMade</th>
              <th>1PMissed</th>
              <th>2PMade</th>
              <th>2PMissed</th>
              <th>3PMade</th>
              <th>3PMissed</th>
              <th>DefReb</th>
              <th>OffReb</th>
              <th>Steal</th>
              <th>Assist</th>
              <th>Foul</th>
              <th>Turnover</th>
              <th>CourtTime</th>
              <th>RemoveGame</th>
            </tr>
          </thead>
              </>
    );
  }
  
  export function TableWrapper(props) {
    return (
      <>
        <Table responsive>
          {props.children}
        </Table>
      </>
    );
  }