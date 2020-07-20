import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import {Deck, StatsCard, ClockCard, CountButton} from "../components/Card";
import { Col, Row } from 'react-bootstrap'

function Stats() {
  // const [statsObject, setStatsObject] = useState({
  //   threePointerMade: 0,
  //   threePointerMissed: 0,
  //   twoPointerMade: 0,
  //   twoPointerMissed: 0,
  //   onePointerMade: 0,
  //   onePointerMissed: 0,
  //   offRebound: 0,
  //   defRebound: 0,
  //   steal: 0,
  //   assist: 0,
  //   foul: 0,
  //   turnover: 0,
  //   courtTime: 0
  // })

  const [count, setCount] = useState({
    threePointerMade: 0,
    threePointerMissed: 0,
    twoPointerMade: 0,
    twoPointerMissed: 0,
    onePointerMade: 0,
    onePointerMissed: 0,
    offRebound: 0,
    defRebound: 0,
    steal: 0,
    assist: 0,
    foul: 0,
    turnover: 0,
    courtTime: 0
  });

    return (
      <>
     <Navbar/>
        <Button/>
        <Deck className="text-center">
            <ClockCard skill="gametime"/>
        </Deck>
          
          <Row>
            <Col xs={6}md={4}>
              <StatsCard 
                skill="3 pointer made" 
                value=""
              >
                <CountButton 
                  upClick={() => setCount({...count,    threePointerMade: count.threePointerMade + 1})}
                  downClick={() => setCount({...count,  threePointerMade: count.threePointerMade - 1})}>{count.threePointerMade}</CountButton>
              </StatsCard>
            </Col>
            <Col xs={6}md={4}>
              <StatsCard skill="3 pointer miss">
                <CountButton 
                 upClick={() => setCount({...count,    threePointerMissed: count.threePointerMissed + 1})}
                 downClick={() => setCount({...count,  threePointerMissed: count.threePointerMissed - 1})}>{count.threePointerMissed}
                </CountButton></StatsCard></Col>
            <Col xs={6}md={4}>
              <StatsCard skill="2 pointer made">
              <CountButton 
                upClick={() => setCount({...count,    twoPointerMade: count.twoPointerMade + 1})}
                downClick={() => setCount({...count,  twoPointerMade: count.twoPointerMade - 1})}>{count.twoPointerMade}</CountButton>
              </StatsCard>
            </Col>
          
            <Col xs={6}md={4}>
              <StatsCard skill="2 pointer miss">
              <CountButton 
                upClick={() => setCount({...count,    twoPointerMissed: count.twoPointerMissed + 1})}
                downClick={() => setCount({...count,  twoPointerMissed: count.twoPointerMissed - 1})}>{count.twoPointerMissed}
              </CountButton>
              </StatsCard>
            </Col>
            <Col xs={6}md={4}>
              <StatsCard skill="1 pointer made">
              <CountButton 
               upClick={() => setCount({...count,    onePointerMade: count.onePointerMade + 1})}
               downClick={() => setCount({...count,  onePointerMade: count.onePointerMade - 1})}>{count.onePointerMade}
              </CountButton>
              </StatsCard>
            </Col>
            <Col xs={6}md={4}>
              <StatsCard skill="1 pointer miss">
                <CountButton 
                  upClick={() => setCount({...count,    onePointerMissed: count.onePointerMissed + 1})}
                  downClick={() => setCount({...count,  onePointerMissed: count.onePointerMissed - 1})}>{count.onePointerMissed}
                </CountButton>
              </StatsCard>
            </Col>
            <Col xs={6}md={4}>
              <StatsCard skill="defensive rebound">
                <CountButton 
                  upClick={() => setCount({...count,    defRebound: count.defRebound + 1})}
                  downClick={() => setCount({...count,  defRebound: count.defRebound - 1})}>{count.defRebound}
                </CountButton>
              </StatsCard>
            </Col>
            <Col xs={6}md={4}>
              <StatsCard skill="offensive rebound">
                <CountButton 
                  upClick={() => setCount({...count,    offRebound: count.offRebound + 1})}
                  downClick={() => setCount({...count,  offRebound: count.offRebound - 1})}>{count.offRebound}
                </CountButton>
              </StatsCard>
            </Col>
            <Col xs={6}md={4}>
              <StatsCard skill="steal">
                <CountButton 
                  upClick={() => setCount({...count,    steal: count.steal + 1})}
                  downClick={() => setCount({...count,  steal: count.steal - 1})}>{count.steal}
                </CountButton>
              </StatsCard>
            </Col>
            
            <Col xs={6}md={4}>
              <StatsCard skill="assist">
                <CountButton 
                  upClick={() => setCount({...count, assist: count.assist + 1})}
                  downClick={() => setCount({...count, assist: count.assist - 1})}>{count.assist}
                </CountButton>
              </StatsCard>
            </Col>
            <Col xs={6}md={4}>
              <StatsCard skill="foul">
                <CountButton 
                    upClick={() => setCount({...count, foul: count.foul + 1})}
                    downClick={() => setCount({...count, foul: count.foul - 1})}>{count.foul}
                </CountButton>
              </StatsCard>
            </Col>
            <Col xs={6}md={4}>
              <StatsCard skill="turnover">
                <CountButton 
                  upClick={() => setCount({...count, turnover: count.turnover + 1})}
                  downClick={() => setCount({...count, turnover: count.turnover - 1})}>{count.turnover}
                </CountButton>
              </StatsCard>
            </Col>
          </Row>
     <Footer/>
      </>
    );
  }

export default Stats;