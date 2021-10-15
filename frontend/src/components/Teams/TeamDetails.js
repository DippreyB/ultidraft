import React from 'react'
import { Col, Row, Card, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectActiveLeague } from '../../slices/leaguesSlice'
import PlayerList from '../Players/PlayerList'

const TeamDetails = ({detailsObject}) => {
    const {teamName, color, roster, _id: teamId}  = detailsObject
    const {activeLeaguePlayers} = useSelector(selectActiveLeague)

    const teamCaptains = activeLeaguePlayers.filter(player => {
        return player.team == teamId && player.isCaptain
    })

    const womenPlayers = activeLeaguePlayers.filter(player => {
        return player.team == teamId && player.genderMatchup === 'female'
    })
    const menPlayers = activeLeaguePlayers.filter(player => {
        return player.team == teamId && player.genderMatchup === 'male'
    })

    return (
        <>
        <Card.Header className='d-flex align-items-center justify-content-between'>
                <Card.Title className='text-capitalized'>{teamName}</Card.Title>
        </Card.Header>

        
        <Card.Body>
            <Row>
                <Col>
                        <h5>Captains</h5>
                        <PlayerList players={teamCaptains} action={false} variant={'flush'}/>
                </Col>    
            </Row>
            <Row>
                <Col className='col-12 col-md-6 mb-2'>
                    <Card>
                        <Card.Header className='text-center'>
                            <Card.Title>Women</Card.Title>
                        </Card.Header>
                        <PlayerList players={womenPlayers} action={false} variant={'flush'} />
                    </Card>
                </Col>
                <Col className='col-12 col-md-6'>
                    <Card>
                        <Card.Header className='text-center'>
                            <Card.Title>Men</Card.Title>
                        </Card.Header>
                        <PlayerList players={menPlayers} action={false} variant={'flush'} />
                    </Card>
                </Col>
            </Row>
        
        </Card.Body>
        
        </>
    )
}

const DetailsListGroupItem = ({title, value}) => {
    return ( 
        <ListGroup.Item className='d-flex flex-wrap justify-content-between'><span className='text-muted'>{title}</span> {value}</ListGroup.Item>
    )
}

export default TeamDetails
