import React, { useEffect, useReducer } from 'react'
import { ListGroup, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getTeamsByLeagueId } from '../../actions/teamsActions'
import teamsReducer, { GET_TEAMS_BY_LEAGUE_REQUEST } from '../../Reducers/TeamsReducer'
import { selectLoggedInUser } from '../../slices/loggedInUserSlice'
import TeamListItem from './TeamListItem'
import Message from '../Message'

const TeamsList = ({leagueId}) => { 

    const {loggedInUser} = useSelector(selectLoggedInUser)

    const [teamsState, dispatch] = useReducer(teamsReducer, { status: 'idle'})
    const {teams, status, error} = teamsState

    useEffect(()=>{
        dispatch({type: GET_TEAMS_BY_LEAGUE_REQUEST})
        const fetchTeams = async ()=>{
            const teamAction = await getTeamsByLeagueId(leagueId, loggedInUser)
            dispatch(teamAction)
        }

        fetchTeams()
    },[leagueId, loggedInUser])

    
    return (
        <>
        {status === 'pending' && <Spinner></Spinner>}
        <ListGroup>
            {teams && teams.map(team =>{
                return (
                   <TeamListItem key={team._id} team={team}/>
                )
            })}
        {error && <Message variant='danger'>{error.message}</Message>}
        </ListGroup>
        </>
    )
}

export default TeamsList
