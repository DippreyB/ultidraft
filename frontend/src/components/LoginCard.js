import React from 'react'
import {Col, Card, Row} from 'react-bootstrap'
import { GoogleLoginButton } from './GoogleLoginButton'
import LoginForm from './LoginForm'

export const LoginCard = () => {
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
                </Card>
            
        </Col>
    )
}
