import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../slices/loggedInUserSlice'
import {Card, Col, Container, ListGroup, Row, Form} from 'react-bootstrap'
import axios from '../lib/axios'
//TODO - refactor into components for each card, ListGroup.Items, etc
const ProfileScreen = () => {
    const {loggedInUser} = useSelector(selectLoggedInUser)
    const [playerProfile, setPlayerProfile] = useState()

    useEffect(()=> {
        if(loggedInUser){
            const getPlayerProfile = async () => {
                const playerData = await axios.get(`/api/players/${loggedInUser.playerId}`)
                setPlayerProfile(playerData.data)
            }
            getPlayerProfile()
        }
        else{
            setPlayerProfile(undefined)
        }

    },[])

    return (
            <Container>
                <Row><span className='display-3'>Player Profile</span></Row>
                <Form>
                {playerProfile &&
                <Row className='my-2'>
                    <Col md={4}>
                        <Card>
                            <Card.Header className='display-6 bg-primary text-light'>Overview</Card.Header>
                            <Card.Body>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        Name: {playerProfile.playerName}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Age: {playerProfile.age}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Gender: {playerProfile.genderMatchup}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Experience: {playerProfile.experience}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Role: {playerProfile.role}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Comments: {playerProfile.comments}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Header className='display-6 bg-primary text-light'>My Stats</Card.Header>
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
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Header className='display-6 bg-primary text-light'>Leagues</Card.Header>
                        </Card>
                    </Col>
                   
                </Row>
                }
                </Form>
            </Container>
    )
}

export default ProfileScreen
