import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import DetailsPanel from '../components/Dashboard/DetailsPanel';

import LeaguesOffscreen from '../components/Dashboard/LeaguesOffscreen'
import PlayerList from '../components/Players/PlayerList';
import TeamsList from '../components/Teams/TeamsList';
import useLeaguePlayers from '../hooks/useLeaguePlayers';


const Dashboard = () => {
    const [selectedLeague, setSelectedLeague] = useState();

    const leagueSelectHandler = (league) => { 
        setSelectedLeague(league)
    }
    
    const [detailsObject, setDetailsObject] = useState()

    const playerDetailsSelectHandler = (player) => {
        setDetailsObject({...player, detailsType: 'player'})
    }

    const {leaguePlayers, setLeagueId} = useLeaguePlayers()

    useEffect(()=>{
        if(selectedLeague)
            setLeagueId(selectedLeague._id)
    },[selectedLeague])

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
                    <Tabs >
                        <Tab eventKey='players' title='Players'>
                            {leaguePlayers.status === 'fulfilled' && <PlayerList players={leaguePlayers.players} playerDetailsSelectHandler={playerDetailsSelectHandler}/> } 
                        </Tab>
                        <Tab eventKey='teams' title='Teams' >
                            {selectedLeague && <TeamsList leagueId={selectedLeague._id} />}
                        </Tab>
                    </Tabs>
                </Col>
                <Col md={8}  className='d-none d-sm-block'>
                    {detailsObject && <DetailsPanel detailsObject={detailsObject} setDetailsObject={setDetailsObject}/> }              
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Dashboard
