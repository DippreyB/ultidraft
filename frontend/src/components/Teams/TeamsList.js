import React from 'react'
import { ListGroup } from 'react-bootstrap'
import TeamListItem from './TeamListItem'


const TeamsList = ({teams, teamDetailsSelectHandler}) => { 

    return (
        <>
        <ListGroup>
            {teams && teams.map(team =>{
                return (
                   <TeamListItem key={team._id} team={team} teamDetailsSelectHandler={teamDetailsSelectHandler}/>
                )
            })}
        </ListGroup>
        </>
    )
}

export default TeamsList
