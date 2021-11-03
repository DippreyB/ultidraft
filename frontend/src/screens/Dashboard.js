import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import DetailsPanel from '../components/Dashboard/DetailsPanel';
import LeaguesOffscreen from '../components/Dashboard/LeaguesOffscreen'
import PlayerList from '../components/Players/PlayerList';
import TeamsList from '../components/Teams/TeamsList';
import { getActiveLeague } from '../slices/leaguesSlice';
import { selectActivePlayers } from '../slices/playersSlice';
import { selectActiveTeams } from '../slices/teamsSlice';



const Dashboard = () => {
    const [selectedLeague, setSelectedLeague] = useState(localStorage.getItem('selectedLeague') ? JSON.parse(localStorage.getItem('selectedLeague') ) : null);

    const leagueSelectHandler = (league) => { 
        setSelectedLeague(league)
        localStorage.setItem('selectedLeague', JSON.stringify(league))
        
    }

    const {activeLeagueTeams} = useSelector(selectActiveTeams)
    const {activeLeaguePlayers} = useSelector(selectActivePlayers)
    const dispatch = useDispatch()

    
    const [detailsObject, setDetailsObject] = useState(localStorage.getItem('selectedDetails') ? JSON.parse(localStorage.getItem('selectedDetails')) : null)

    const playerDetailsSelectHandler = (player) => {
        setDetailsObject({...player, type: 'player'})
        localStorage.setItem('selectedDetails', JSON.stringify({...player, type: 'player'}))
    }

    const teamDetailsSelectHandler = (team) => {
        setDetailsObject({...team, type: 'team'})
        localStorage.setItem('selectedDetails', JSON.stringify({...team, type: 'team'}))
    }

    useEffect(()=>{
        if(selectedLeague){
            dispatch(getActiveLeague({leagueId: selectedLeague._id}))
        }
    },[selectedLeague, dispatch])

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
            {activeLeaguePlayers === undefined || activeLeagueTeams === undefined ? <Spinner animation='border'></Spinner> :
                <Row>
                    <Col md={4}> 
                        <Tabs >
                            <Tab eventKey='players' title='Players'>
                                {activeLeaguePlayers && 
                                <PlayerList players={activeLeaguePlayers} 
                                    playerDetailsSelectHandler={playerDetailsSelectHandler}
                                    selectedPlayer = {detailsObject}
                                /> } 
                            </Tab>
                            <Tab eventKey='teams' title='Teams' >
                                {activeLeagueTeams && 
                                <TeamsList teams={activeLeagueTeams}  
                                    teamDetailsSelectHandler={teamDetailsSelectHandler}
                                    selectedTeam = {detailsObject}
                                />}
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col md={8}  className='d-none d-sm-block'>
                        {detailsObject && 
                            <DetailsPanel 
                                detailsObject={detailsObject} 
                                setDetailsObject={setDetailsObject}  
                            /> 
                        }              
                    </Col>
                </Row>
            }

        </Container>
        </>
    )
}

export default Dashboard
