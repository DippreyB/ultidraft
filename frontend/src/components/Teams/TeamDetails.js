import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectActiveLeague } from '../../slices/leaguesSlice'
import PlayerList from '../Players/PlayerList'

const TeamDetails = ({detailsObject}) => {
    const {teamName, _id: teamId}  = detailsObject
    const {activeLeaguePlayers} = useSelector(selectActiveLeague)
    
    let teamCaptains = activeLeaguePlayers.filter(player => {
        return player.team === teamId && player.isCaptain
    })
    
    let womenPlayers = activeLeaguePlayers.filter(player => {
        return player.team === teamId && player.genderMatchup === 'female'
    })

    let menPlayers = activeLeaguePlayers.filter(player => {
        return player.team === teamId && player.genderMatchup === 'male'
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
                        <PlayerList players={womenPlayers} action={false} variant={'flush'} paginated={false}/>
                    </Card>
                </Col>
                <Col className='col-12 col-md-6'>
                    <Card>
                        <Card.Header className='text-center'>
                            <Card.Title>Men</Card.Title>
                        </Card.Header>
                        <PlayerList players={menPlayers} action={false} variant={'flush'} paginated={false}/>
                    </Card>
                </Col>
            </Row>
        
        </Card.Body>
        
        </>
    )
}



export default TeamDetails
