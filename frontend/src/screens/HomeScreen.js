import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { LoginCard } from '../components/LoginCard'


const HomeScreen = () => {
    return (
        <Container>
            <Row>
                <Col md={6} className='my-2'>
                    <h1>Welcome to UltiDraft</h1>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et obcaecati harum tenetur tempore facere, voluptates, dolorum sequi corrupti quis dolorem possimus quo iure inventore, quas esse incidunt sed sint magnam!
                </Col>
                <LoginCard />
            </Row>
        </Container>
    )
}

export default HomeScreen
