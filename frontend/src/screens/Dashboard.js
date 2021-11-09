import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import LeaguesOffscreen from '../components/Dashboard/LeaguesOffscreen'
import PlayersTab from '../components/Dashboard/PlayersTab';
import TeamsTab from '../components/Dashboard/TeamsTab'
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

    
    // const [detailsObject, setDetailsObject] = useState(localStorage.getItem('selectedDetails') ? JSON.parse(localStorage.getItem('selectedDetails')) : null)

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
                        <Tabs >
                            <Tab eventKey='players' title='Players'>
                                <PlayersTab players={activeLeaguePlayers}/>
                            </Tab>
                            
                            <Tab eventKey='teams' title='Teams' >
                               <TeamsTab teams={activeLeagueTeams} />
                            </Tab>
                        </Tabs>
                </Row>
            }

        </Container>
        </>
    )
}

export default Dashboard
