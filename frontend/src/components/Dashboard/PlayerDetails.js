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
            <Row className='d-flex'>
                <Col >
                    <ListGroup variant='flush'>
                        <ListGroup.Item><h5>Stats</h5></ListGroup.Item>
                        <DetailsListGroupItem title='Stamina' value={detailsObject.stamina} />
                        <DetailsListGroupItem title='Speed' value={detailsObject.running} />
                        <DetailsListGroupItem title='Jumping' value={detailsObject.jumping} />
                        <DetailsListGroupItem title='Flicks' value={detailsObject.forehand} />
                        <DetailsListGroupItem title='Backhand' value={detailsObject.backhand} />
                        <DetailsListGroupItem title='Hammer' value={detailsObject.hammer} />
                        </ListGroup>
                </Col>
                <Col>
                <ListGroup variant='flush'>
                    <ListGroup.Item><Row><h5>Info</h5> </Row></ListGroup.Item>
                    <DetailsListGroupItem title={'Position'} value={detailsObject.role} />
                    <DetailsListGroupItem title={'Experience'} value={detailsObject.experience} />
                    <DetailsListGroupItem title={'Comments'} value={detailsObject.comments} />
                    <DetailsListGroupItem title={'Team'} value={detailsObject.team} />
                    </ListGroup>
                </Col>
            </Row>
        
        </Card.Body>
        
        </>
    )
}

const DetailsListGroupItem = ({title, value}) => {
    return ( 
        <ListGroup.Item className='d-flex flex-wrap justify-content-between'><span className='text-muted'>{title}</span> {value}</ListGroup.Item>
    )
}

export default PlayerDetails
