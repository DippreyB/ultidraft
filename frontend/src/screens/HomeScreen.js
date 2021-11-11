import React, { useEffect} from 'react'
import {  Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LoginCard } from '../components/Login/LoginCard'
import { selectLoggedInUser } from '../slices/loggedInUserSlice'
import { getActiveLeague, getAdminLeagues, getUserLeagues, selectLeagues } from '../slices/leaguesSlice'
import {GiFrisbee} from 'react-icons/gi'
import {BsFillPersonFill, BsFillPersonPlusFill} from 'react-icons/bs'
import {IoSettings} from 'react-icons/io5'
import {LinkContainer} from 'react-router-bootstrap'



const HomeScreen = ({history}) => {
    const {loggedInUser} = useSelector(selectLoggedInUser)
    const {adminLeagues} = useSelector(selectLeagues)
    const {userLeagues} = useSelector(selectLeagues)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUserLeagues())
        if(loggedInUser && loggedInUser.isAdmin) dispatch(getAdminLeagues())
    }, [loggedInUser, dispatch])

    const leagueSelectHandler = (league) => {
        dispatch(getActiveLeague({leagueId: league._id}))
        localStorage.setItem('selectedLeague', JSON.stringify(league))
        history.push('/dashboard')
    }


    return (
        <Container>
            <Row>
                <Col md={6} className='my-2'>
                    <h1>Welcome to UltiDraft</h1>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et obcaecati harum tenetur tempore facere, voluptates, dolorum sequi corrupti quis dolorem possimus quo iure inventore, quas esse incidunt sed sint magnam!
                </Col>
                {loggedInUser == null &&
                    <LoginCard /> 
                }

                {loggedInUser && 
                    <>  
                        <Col md={6} className='my-2'>
                            <Card>
                                <Card.Header className='bg-primary'>
                                    <h3 className='text-light'>Quick links:</h3>
                                </Card.Header>
                                    <ListGroup variant='flush'>
                                    
                                            {userLeagues.map(league => { 
                                                return (
                                                <ListGroup.Item className='text-link' key={league.leagueName} action onClick={()=>leagueSelectHandler(league)}>
                                                    <h4><GiFrisbee className='text-primary'/>  {league.leagueName}</h4>
                                                </ListGroup.Item>
                                                )
                                            })}
                                            
                                            {loggedInUser.playerId ?
                                            <ListGroup.Item className='text-link' action >
                                                <LinkContainer to='/profile'>
                                                    <h4><BsFillPersonFill className='text-primary'/>  Player Profile</h4>
                                                </LinkContainer>
                                            </ListGroup.Item>
                                            :
                                            <ListGroup.Item className='text-link' action >
                                                <LinkContainer > {/* Add link to make profile screen*/}
                                                    <h4><BsFillPersonPlusFill className='text-primary'/>  Make Player Profile</h4>
                                                </LinkContainer>
                                            </ListGroup.Item>
                                            }
                                            
                                            <ListGroup.Item className='text-link' action >
                                                    <h4><IoSettings className='text-primary' />  Account Settings</h4>
                                            </ListGroup.Item>
                                    </ListGroup>
                            </Card>

                        </Col>

                    </>
                }
            </Row>
        </Container>
    )
}

export default HomeScreen
