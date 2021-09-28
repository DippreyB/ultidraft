import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container ,NavDropdown} from 'react-bootstrap'

const Header = () => {
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
                                <Nav.Link>Link 1</Nav.Link>
                            </LinkContainer>

                            {/* Dropdown for logged in user. */}
                            <NavDropdown title='dropdown'>
                                <LinkContainer to='/'>
                                    <NavDropdown.Item>Drop 1</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/'>
                                    <NavDropdown.Item>Drop 2</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}

export default Header
