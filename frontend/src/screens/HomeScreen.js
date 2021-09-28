import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

const HomeScreen = () => {
    return (
        <Container>
            <Row>
                <Col md={6} className='my-2'>
                    <h1>Welcome to UltiDraft</h1>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et obcaecati harum tenetur tempore facere, voluptates, dolorum sequi corrupti quis dolorem possimus quo iure inventore, quas esse incidunt sed sint magnam!
                </Col>
                <Col md={6} className='my-2'>
                    <Card className='text-center rounded'>
                        <Card.Body>
                        <Card.Title>Log In with Google</Card.Title>
                        <Button variant='primary'>Goog btn</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeScreen
