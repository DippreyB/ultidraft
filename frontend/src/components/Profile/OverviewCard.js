import React, { useState } from 'react'
import { ListGroup, Card, Button, Form } from 'react-bootstrap'

const OverviewCard = ({playerProfile}) => {
    //add each form value to state as a whole object or individual vars?
    
    const [edit, setEdit] = useState()
    const editHandler = () => { 
        setEdit(!edit)
    }
    const submitFormHandler =(e) => {
        e.preventDefault()
        console.log(e)
    }

    return (
        <Card>
            <Card.Header className='display-6 bg-primary text-light d-flex justify-content-between'>
                Overview 
                <Button onClick={editHandler}>Edit</Button>
            </Card.Header>
            <Card.Body>
                {!edit ?
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        {playerProfile.playerName}, {playerProfile.age}{playerProfile.genderMatchup.charAt(0)}
                    </ListGroup.Item>
                    <ListGroup.Item className='text-capitalize'>
                        <div className='text-muted'>Experience </div>{playerProfile.experience} {playerProfile.role}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <div className='text-muted'>Comments </div>
                        "{playerProfile.comments}"
                    </ListGroup.Item>
                </ListGroup>
                :
                <Form>
                    <Form.Group controlId='formPlayerName' >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='input' defaultValue={playerProfile.playerName}></Form.Control>
                    </Form.Group>
                    <Button type='submit' onClick={(e)=>submitFormHandler(e)}>Save</Button>
                </Form>
                }
            </Card.Body>
        </Card>
    )
}

export default OverviewCard
