import React from 'react'
import {ListGroup, Form, Card } from 'react-bootstrap'

const RatingCard = ({playerProfile}) => {
    return (
        <Card>
        <Card.Header className='display-6 bg-primary text-light'>Rating</Card.Header>
        <Card.Body>
            <ListGroup variant='flush'>
                <ListGroup.Item className='display-6 text-center'>
                    {playerProfile.selfRating}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Form.Label > 
                        Stamina
                    </Form.Label>
                    <Form.Range min={1} max={10} defaultValue={playerProfile.stamina} />
                </ListGroup.Item>
                <ListGroup.Item>
                    <Form.Label > 
                        Running
                    </Form.Label>
                    <Form.Range min={1} max={10} defaultValue={playerProfile.running} />
                </ListGroup.Item>
                <ListGroup.Item>
                    <Form.Label > 
                        Jumping
                    </Form.Label>
                    <Form.Range min={1} max={10} defaultValue={playerProfile.jumping} />
                </ListGroup.Item>
                <ListGroup.Item>
                    <Form.Label > 
                        Forehand
                    </Form.Label>
                    <Form.Range min={1} max={10} defaultValue={playerProfile.forehand} />
                </ListGroup.Item>
                <ListGroup.Item>
                    <Form.Label > 
                        Backhand
                    </Form.Label>
                    <Form.Range min={1} max={10} defaultValue={playerProfile.backhand} />
                </ListGroup.Item>
                <ListGroup.Item>
                    <Form.Label > 
                        Hammers
                    </Form.Label>
                    <Form.Range min={1} max={10} defaultValue={playerProfile.hammer} />
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
    )
}

export default RatingCard
