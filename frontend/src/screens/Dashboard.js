import React, { useState } from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'

import LeaguesOffscreen from '../components/Dashboard/LeaguesOffscreen'
import PlayerList from '../components/Players/PlayerList';


const Dashboard = () => {
    const [selectedLeague, setSelectedLeague] = useState();
    const leagueSelectHandler = (league) => { 
        setSelectedLeague(league)
    }
    
    return (
        <>
        

        <Container>
            <Row className='align-items-center'>
                <Col xs={'auto'}>
                    <h2>{selectedLeague ? selectedLeague.leagueName : "Select a league to get started:" }</h2> 
                </Col>
                <Col>
                    <LeaguesOffscreen leagueSelectHandler={leagueSelectHandler}/>
                </Col>
            </Row>
            <Row>
                <Col md={4}> 
                    <Tabs>
                        <Tab eventKey='players' title='Players'>
                            {selectedLeague && <PlayerList leagueId={selectedLeague._id}/> } 
                        </Tab>
                        <Tab eventKey='teams' title='Teams'>
                            Teams
                        </Tab>
                    </Tabs>
                </Col>
                <Col md={4}  className='d-none d-sm-block'>
                    Details Panel / modal                
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Dashboard
