import React from 'react'
import { Col, Row, Card, ListGroup, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { selectActivePlayers } from '../../slices/playersSlice'
import {removePlayerFromTeam, selectActiveTeams } from '../../slices/teamsSlice'
import { togglePlayerCaptainStatus } from '../../slices/playersSlice'
import PlayerListItem from '../Players/PlayerListItem'
import toast from 'react-hot-toast'
import {CgRemove} from 'react-icons/cg'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import { selectLoggedInUser } from '../../slices/loggedInUserSlice'

const TeamDetails = ({selectedTeam}) => {
    const {_id: teamId}  = selectedTeam
    const {activeLeaguePlayers} = useSelector(selectActivePlayers)
    const {activeLeagueTeams} = useSelector(selectActiveTeams)
    const {loggedInUser} = useSelector(selectLoggedInUser)

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
    const removePlayerHandler = async (playerId, teamId) => {
        const result = await dispatch(removePlayerFromTeam({playerId, teamId}))
        if(result.type.includes('fulfilled'))
            toast.success('Player removed from team.')
    }

    const togglePlayerCaptainHandler = async(playerId) => { 
        const result = await dispatch(togglePlayerCaptainStatus({playerId}))
        if(result.type.includes('fulfilled'))
            toast.success('Player captain toggled.')
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
                        <ListGroup   >
                            {teamCaptains.map(captain => {
                                return (
                                    <PlayerListItem key={captain._id+'-captain'} player={captain} action={false}>

                                    </PlayerListItem>
                                )
                            })}
                        </ListGroup>
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
                                    {loggedInUser && loggedInUser.isAdmin &&
                                    <>
                                    {/* TODO: make remove player and captain toggle buttons application wide components. */}
                                        <Button className='pb-1 px-1 pt-0' variant='outline-warning' onClick={()=>togglePlayerCaptainHandler(player._id)}>
                                            {player.isCaptain ?  <AiFillStar size={20}/> : <AiOutlineStar size={20}/>}
                                        </Button>

                                        <Button className='pb-1 px-1 pt-0' variant='outline-danger' onClick={()=>removePlayerHandler(player._id, teamId)}>
                                        <CgRemove size={20}/>
                                        </Button>
                                    </>
                                     }
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
                                    {loggedInUser && loggedInUser.isAdmin &&
                                    <>
                                    <Button className='pb-1 px-1 pt-0' variant='outline-warning' onClick={()=>togglePlayerCaptainHandler(player._id)}>
                                        {player.isCaptain ?  <AiFillStar size={20}/> : <AiOutlineStar size={20}/>}
                                    </Button>
                                    <Button className='pb-1 px-1 pt-0' variant='outline-danger' onClick={()=>removePlayerHandler(player._id, teamId)}>
                                       <CgRemove size={20}/>
                                    </Button>
                                    </>
                                    }
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
