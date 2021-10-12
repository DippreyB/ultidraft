import React from 'react'
import { Col, Row, Card, ListGroup } from 'react-bootstrap'

const PlayerDetails = ({detailsObject}) => {
    return (
        <>
        <Card.Header className='d-flex align-items-center justify-content-between'>
                <Card.Title>{detailsObject.playerName}</Card.Title>
                <Card.Title>{detailsObject.age} {detailsObject.genderMatchup}</Card.Title>
        </Card.Header>

        
        <Card.Body>
            <Row>
                <Col >
                    <ListGroup variant='flush'>
                        <ListGroup.Item><h5>Stats</h5></ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between'><span className='text-muted'>Stamina</span> {detailsObject.stamina}</ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between'><span className='text-muted'>Speed</span> {detailsObject.running}</ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between'><span className='text-muted'>Jumping</span> {detailsObject.jumping}</ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between'><span className='text-muted'>Flicks</span> {detailsObject.forehand}</ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between'><span className='text-muted'>Backhands</span> {detailsObject.backhand}</ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between'><span className='text-muted'>Hammers</span> {detailsObject.hammer}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <span className='text-muted'>Experience:</span> {detailsObject.experience}
                </Col>
            </Row>
        
        </Card.Body>
        
        </>
    )
}

export default PlayerDetails
