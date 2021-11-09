import React from 'react'
import { Col, Row, Card, ListGroup, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { selectActivePlayers } from '../../slices/playersSlice'
import {removePlayerFromTeam, selectActiveTeams } from '../../slices/teamsSlice'
import PlayerList from '../Players/PlayerList'
import PlayerListItem from '../Players/PlayerListItem'

const TeamDetails = ({selectedTeam}) => {
    const {_id: teamId}  = selectedTeam
    const {activeLeaguePlayers} = useSelector(selectActivePlayers)
    const {activeLeagueTeams} = useSelector(selectActiveTeams)

    const {teamName, roster } = activeLeagueTeams.find(team => team._id === teamId)
    
    let teamCaptains = activeLeaguePlayers.filter(player => {
        return player.team === teamId && roster.includes(player._id) && player.isCaptain
    })
    
    let womenPlayers = activeLeaguePlayers.filter(player => {
        return player.team === teamId && roster.includes(player._id) && player.genderMatchup.toLowerCase() === 'female'
    })

    let menPlayers = activeLeaguePlayers.filter(player => {
        return player.team === teamId && roster.includes(player._id) && player.genderMatchup.toLowerCase() === 'male'
    })

    const dispatch = useDispatch();
    const removePlayerHandler = (playerId, teamId) => {
        dispatch(removePlayerFromTeam({playerId, teamId}))
    }


    return (
        <>
        <Card.Header className='d-flex align-items-center justify-content-between'>
                <Card.Title className='text-capitalized'>{teamName}</Card.Title>
        </Card.Header>

        
        <Card.Body>
            <Row>
                <Col>
                        <h5>Captains</h5>
                        <PlayerList players={teamCaptains} action={false} variant={'flush'} paginated={false}/>
                </Col>    
            </Row>
            <Row>
                <h5>Roster</h5>
                <Col className='col-12 col-md-6 mb-2'>
                    <Card>
                        <Card.Header className='text-center'>
                            <Card.Title>Women</Card.Title>
                        </Card.Header>
                        <ListGroup variant={'flush'}>
                            {womenPlayers.map(player => {
                                return (
                                <PlayerListItem key={player._id} player={player} action={false}>
                                        <Button variant='danger' onClick={()=> removePlayerHandler(player._id, teamId)}>X</Button>
                                </PlayerListItem>
                                )
                            })}
                        </ListGroup>
                    </Card>
                </Col>
                <Col className='col-12 col-md-6'>
                    <Card>
                        <Card.Header className='text-center'>
                            <Card.Title>Men</Card.Title>
                        </Card.Header>
                        {menPlayers.map(player=> {
                            return (
                                <PlayerListItem key={player._id} player={player} action={false}>
                                    <Button variant='danger' onClick={()=>removePlayerHandler(player._id, teamId)}>X</Button>
                                </PlayerListItem>
                            )
                        })}
                    </Card>
                </Col>
            </Row>
        
        </Card.Body>
        
        </>
    )
}



export default TeamDetails
