import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container ,NavDropdown} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { logout, selectLoggedInUser } from '../slices/loggedInUserSlice'

const Header = () => {
    const {loggedInUser} = useSelector(selectLoggedInUser)
    const dispatch = useDispatch()
    
    const logoutHandler = () =>{
        dispatch(logout())
    }
    
    return (
        <header>
            <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect >
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand><h3 className='display'>UltiDraft</h3></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            

                            {loggedInUser ?
                            <>
                            <LinkContainer to='/dashboard'>
                                <Nav.Link>Dashboard</Nav.Link>
                            </LinkContainer>
                            <NavDropdown title={loggedInUser.name}>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            </>
                            :
                            <LinkContainer to='/register'>
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}

export default Header
