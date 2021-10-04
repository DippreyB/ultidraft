import React from 'react'
import {Col, Card, Row} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../slices/loggedInUserSlice'
import { GoogleLoginButton } from './GoogleLoginButton'
import LoginForm from './LoginForm'
import Message from '../Message'

export const LoginCard = () => {
    const {error} = useSelector(selectLoggedInUser)
    return (
        <Col md={6} className='my-2'>
            
                <Card className='text-center rounded'>
                    <Card.Body>
                        <Row>
                            <Col md={6} className='my-2'>
                                <Card.Title>Login with password</Card.Title>
                                <LoginForm />
                            </Col>
                            <Col md={6} className='my-2'>
                                <Card.Title>Log In with Google</Card.Title>
                                <GoogleLoginButton />                        
                            </Col>
                        </Row>
                    </Card.Body>
                    {error && <Message variant='danger'>{error}</Message>}
                </Card>
            
        </Col>
    )
}
