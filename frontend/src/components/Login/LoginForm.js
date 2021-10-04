import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Form, Col, Button } from 'react-bootstrap'
import { logInUser } from '../../slices/loggedInUserSlice'

const LoginForm = () => {
    const [password,setPassword] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(logInUser({email,password}))
    }

    return (
        <Col>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value ={email} onChange={(e) =>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value ={password} onChange={(e) =>setPassword(e.target.value)}/>
            </Form.Group>
            <Button className='my-2' type='submit'>Sign In</Button>
        </Form>
            
        </Col>
    )
}

export default LoginForm
