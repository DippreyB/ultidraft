import React, { useState } from 'react'
import { ListGroup, Card, Button, Form, FloatingLabel } from 'react-bootstrap'
import useControlledForm from '../../hooks/useControlledForm'
import axios from '../../lib/axios'


const OverviewCard = ({playerProfile}) => {
    //add each form value to state as a whole object or individual vars?

    const [player, setPlayer] = useState(playerProfile)
    
    const [editable, setEditable] = useState()
    const editableHandler = () => { 
        setEditable(!editable)
    }

    const [formState, formChangeHandler] = useControlledForm({
        playerName: playerProfile.playerName,
        age: playerProfile.age,
        genderMatchup: playerProfile.genderMatchup,
        experience : playerProfile.experience,
        role : playerProfile.role,
        comments : playerProfile.comments,
    })

    const submitFormHandler = async (e) => {
        e.preventDefault()
        //send form state to API to update player info
        console.log(formState)
        const res = await axios.put(`/api/players/${playerProfile._id}`, formState)
        setPlayer(res.data)
        editableHandler()
    }


    console.log(formState)

    return (
        <Card>
            <Card.Header className='display-6 bg-primary text-light d-flex justify-content-between'>
                Overview 
                <Button onClick={editableHandler}>Edit</Button>
            </Card.Header>
            <Card.Body>
                {!editable ?
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        {player.playerName}, {player.age}{player.genderMatchup.charAt(0)}
                    </ListGroup.Item>
                    <ListGroup.Item className='text-capitalize'>
                        <div className='text-muted'>Experience </div>{player.experience} {player.role}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <div className='text-muted'>Comments </div>
                        "{player.comments}"
                    </ListGroup.Item>
                </ListGroup>
                :
                <Form onSubmit={submitFormHandler} onChange={formChangeHandler}>
                    <Form.Group controlId={'playerName'} >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='input' defaultValue={player.playerName}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId={'age'} >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='number' defaultValue={player.age}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId={'genderMatchup'} >
                        <Form.Label>Gender</Form.Label>
                        <Form.Select defaultValue={player.genderMatchup}>
                            <option value ='female'>Female</option>
                            <option value ='male'>Male</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId={'experience'} >
                        <Form.Label>Experience</Form.Label>
                        <Form.Select defaultValue={player.experience}>
                            <option value ='New to ultimate'>New to ultimate</option>
                            <option value ='Pickup only'>Pickup only</option>
                            <option value ='League veteran'>League veteran</option>
                            <option value ='Club backup'>Club backup</option>
                            <option value ='Club starter'>Club starter</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId={'role'} >
                        <Form.Label>Role</Form.Label>
                        <Form.Select defaultValue={player.role}>
                            <option value ='Handler'>Handler</option>
                            <option value ='Cutter'>Cutter</option>
                            <option value ='Fill'>Fill</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mt-3 mb-3' >
                        <FloatingLabel controlId={'comments'} label='Comments'>
                            <Form.Control as='textarea' defaultValue={player.comments} style={{height: '100px'}} >

                            </Form.Control>
                        </FloatingLabel>
                        
                    </Form.Group>

                    <Button className='d-grid gap-2' type='submit'>Save</Button>
                </Form>
                }
            </Card.Body>
        </Card>
    )
}

export default OverviewCard
