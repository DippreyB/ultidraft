import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import LeaguesOffscreen from '../components/Dashboard/LeaguesOffscreen'


const Dashboard = () => {
    const [selectedLeague, setSelectedLeague] = useState();
    const leagueSelectHandler = (league) => { 
        setSelectedLeague(league)
    }
    return (
        <>
        <LeaguesOffscreen leagueSelectHandler={leagueSelectHandler}/>

        <Container>
            <Row>
                <Col md={8}> 
                    Col1
                </Col>
                <Col md={4}  className='d-none d-sm-block'>
                    Col2
                    {selectedLeague}
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Dashboard
