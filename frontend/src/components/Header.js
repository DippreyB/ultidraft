import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container ,NavDropdown} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { selectLoggedInUser } from '../slices/loggedInUserSlice'

const Header = () => {
    const {loggedInUser} = useSelector(selectLoggedInUser)
    
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
                            <LinkContainer to='/'>
                                <Nav.Link>Dashboard</Nav.Link>
                            </LinkContainer>

                            {loggedInUser.name &&
                            <NavDropdown title={loggedInUser.name}>
                                <LinkContainer to='/'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/'>
                                    <NavDropdown.Item>Logout</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}

export default Header
