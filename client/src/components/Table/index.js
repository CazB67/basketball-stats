import React from "react";
import { Table } from 'react-bootstrap'

export function DataTable(props) {
    return (
      <>
          <thead>
            <tr>
              <th>GameDate</th>
              <th>Opponent</th>
              <th>Score</th>
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
            </tr>
          </thead>
              </>
  
        
    );
  }
  
  export function TableHeader (props) {
    return (
      <>
          <tbody>
            <tr>
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
            </tr>
          </tbody>
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