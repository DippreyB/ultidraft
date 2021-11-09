import React from 'react'
import { Col, Row, Card, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../slices/loggedInUserSlice'
import { selectActiveTeams } from '../../slices/teamsSlice'
import PlayerTeamSelect from './PlayerTeamSelect'

const PlayerDetails = ({selectedPlayer}) => {

    const {activeLeagueTeams} = useSelector(selectActiveTeams)
    const {loggedInUser} = useSelector(selectLoggedInUser)
    
    const playerTeam = activeLeagueTeams.filter(team => {
        return team._id === selectedPlayer.team
    })
    
    return (
        <>
        <Card.Header className='d-flex align-items-center justify-content-between'>
                <Card.Title>{selectedPlayer.playerName}</Card.Title>
                <Card.Title>{selectedPlayer.age} {selectedPlayer.genderMatchup}</Card.Title>
        </Card.Header>

        
        <Card.Body>
            <Row>
                <Col >
                    <ListGroup variant='flush'>
                        <ListGroup.Item><h5>Stats</h5></ListGroup.Item>
                        <DetailsListGroupItem title='Stamina' value={selectedPlayer.stamina} />
                        <DetailsListGroupItem title='Speed' value={selectedPlayer.running} />
                        <DetailsListGroupItem title='Jumping' value={selectedPlayer.jumping} />
                        <DetailsListGroupItem title='Flicks' value={selectedPlayer.forehand} />
                        <DetailsListGroupItem title='Backhand' value={selectedPlayer.backhand} />
                        <DetailsListGroupItem title='Hammer' value={selectedPlayer.hammer} />
                        </ListGroup>
                </Col>
                <Col>
                <ListGroup variant='flush'>
                    <ListGroup.Item><Row><h5>Info</h5> </Row></ListGroup.Item>
                    <DetailsListGroupItem title={'Position'} value={selectedPlayer.role} />
                    <DetailsListGroupItem title={'Experience'} value={selectedPlayer.experience} />
                    <DetailsListGroupItem title={'Comments'} value={selectedPlayer.comments} />
                    <DetailsListGroupItem title={'Team'} value={playerTeam[0] ? playerTeam[0].teamName : 'Free Agent'} />
                    
                    {loggedInUser && loggedInUser.isAdmin &&
                        <ListGroup.Item><PlayerTeamSelect player={selectedPlayer} teams={activeLeagueTeams}></PlayerTeamSelect></ListGroup.Item>
                    }
                    </ListGroup>
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

export default PlayerDetails
