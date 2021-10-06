import React, { useEffect, useState } from 'react'
import { Button, ListGroup, Row, Col } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLeagues, selectLeagues } from '../../slices/leaguesSlice'


const LeaguesOffscreen = ({leagueSelectHandler}) => {
    const [showOffCanvas, setShowOffCanvas] = useState(true)
    const {userLeagues} = useSelector(selectLeagues)
    const dispatch = useDispatch()

    const offScreenSelectHandler = (leagueId) => { 
        leagueSelectHandler(leagueId)
        setShowOffCanvas(false);
    }
    useEffect(()=>{
        dispatch(getUserLeagues())
    })

    return (
        <>
        <Button variant='outline-light' style={{position: 'absolute', top: 5, left: 5,}} onClick={()=>setShowOffCanvas(true)}>Leagues</Button>
        <Offcanvas show={showOffCanvas} onHide={()=>setShowOffCanvas(false)}>
            <Offcanvas.Header closeButton closeVariant='white' closeLabel='Close league select.'>
               <h3>Your Leagues</h3>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup>
                {userLeagues.map(league => {
                    return (
                        <ListGroup.Item onClick={()=>{offScreenSelectHandler(league._id)}} action key={league._id}>
                            <Row>
                                <Col><h4>{league.leagueName}</h4></Col>
                            </Row>
                            <Row className='align-items-center'>
                                <Col md='auto'>Teams: {league.teams.length}</Col>
                                <Col>Your Team:</Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
        </>
    )
}

export default LeaguesOffscreen
