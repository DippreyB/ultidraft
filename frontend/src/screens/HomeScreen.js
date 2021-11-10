import React, { useEffect} from 'react'
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import LeagueList from '../components/Leagues/LeagueList'
import { LoginCard } from '../components/Login/LoginCard'
import { selectLoggedInUser } from '../slices/loggedInUserSlice'
import { getActiveLeague, getAdminLeagues, getUserLeagues, selectLeagues } from '../slices/leaguesSlice'



const HomeScreen = ({history}) => {
    const {loggedInUser} = useSelector(selectLoggedInUser)
    const {adminLeagues} = useSelector(selectLeagues)
    const {userLeagues} = useSelector(selectLeagues)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUserLeagues())
        if(loggedInUser.isAdmin) dispatch(getAdminLeagues())
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
                            <LeagueList />
                            <Card>
                                <Card.Header><h2>{loggedInUser.name}</h2></Card.Header>
                                <Card.Body>
                                    <ListGroup variant='flush'>
                                        
                                            {userLeagues.map(league => { 
                                                return (
                                                <ListGroup.Item key={league.leagueName} action onClick={()=>leagueSelectHandler(league)}>
                                                    {league.leagueName}
                                                </ListGroup.Item>
                                                )
                                            })}
                                       
                                    </ListGroup>
                                </Card.Body>
                            </Card>

                        </Col>

                    </>
                }
            </Row>
        </Container>
    )
}

export default HomeScreen
