import React, { useEffect, useState } from 'react'
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import axios from '../../lib/axios'
import TeamListItem from '../Teams/TeamListItem'

const LeaguesCard = ({playerProfile}) => {

    const [league, setLeague] = useState()
    const [team, setTeam] = useState()

    const selectTeamHandler = (teamId) => { 
        console.log(teamId)
        //TODO redirect to team page 
    }

    useEffect(()=> {
        if(playerProfile){
            const getLeague = async () => { 
                const res = await axios.get(`/api/leagues/${playerProfile.league}`)
                setLeague(res.data)
            }
            if(playerProfile.league)
                getLeague()

            const getTeam = async () => {
                const res = await axios.get(`/api/teams/${playerProfile.team}`)
                setTeam(res.data)
            }
            if(playerProfile.team)
                getTeam()
        }
    },[playerProfile])


    return (
        <Card>
            <Card.Header className='display-6 bg-primary text-light'>Leagues</Card.Header>
            {league ?
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{league.leagueName}</h3>
                        <ListGroup >
                            {team ?
                            <TeamListItem team={team} action={false} selectTeamHandler={selectTeamHandler}/> :
                            <ListGroup.Item>You have not been drafted to a team. </ListGroup.Item>
                                
                            }       

                            
                        </ListGroup>
                    </ListGroup.Item>
                </ListGroup>
                :
                <ListGroup>
                    <ListGroupItem>
                        You are not a member of a league.
                    </ListGroupItem>
                </ListGroup>
            }
        </Card>
    )
}

export default LeaguesCard
