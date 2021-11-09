import React from 'react'
import { ListGroup } from 'react-bootstrap'
import TeamListItem from './TeamListItem'


const TeamsList = ({teams, selectTeamHandler, selectedTeam}) => { 

    return (
        <>
        <ListGroup>
            {teams && teams.map(team =>{
                const isActive = selectedTeam && selectedTeam._id === team._id
                return (
                   <TeamListItem key={team._id} active={isActive} team={team} selectTeamHandler={selectTeamHandler}/>
                )
            })}
        </ListGroup>
        </>
    )
}

export default TeamsList
