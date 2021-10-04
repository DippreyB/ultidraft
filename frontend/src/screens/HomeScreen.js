import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import LeagueList from '../components/Leagues/LeagueList'
import { LoginCard } from '../components/Login/LoginCard'
import { selectLoggedInUser } from '../slices/loggedInUserSlice'



const HomeScreen = () => {
    const {loggedInUser} = useSelector(selectLoggedInUser)
    return (
        <Container>
            <Row>
                <Col md={6} className='my-2'>
                    <h1>Welcome to UltiDraft</h1>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et obcaecati harum tenetur tempore facere, voluptates, dolorum sequi corrupti quis dolorem possimus quo iure inventore, quas esse incidunt sed sint magnam!
                </Col>
                {loggedInUser == null ?
                    <LoginCard /> :
                    <Col md={6} className='my-2'>
                        <LeagueList />
                    </Col>
                }
            </Row>
        </Container>
    )
}

export default HomeScreen
