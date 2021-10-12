import React, { useEffect, useReducer, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPlayersFromApi } from '../actions/playersActions'
import leaguePlayersReducer, { GET_LEAGUE_PLAYERS_REQUEST } from '../Reducers/playersReducer'
import { selectLoggedInUser } from '../slices/loggedInUserSlice'

const useLeaguePlayers = (initialState = {players: [], status: 'idle'}) => {
    const [leagueId, setLeagueId] = useState()
    const [leaguePlayers, dispatch] = useReducer(leaguePlayersReducer, initialState)
    const {loggedInUser} = useSelector(selectLoggedInUser)



    useEffect(()=>{
        
        dispatch({type: GET_LEAGUE_PLAYERS_REQUEST, payload: {}})
        const fetchPlayers = async () => {
            const playersAction = await getPlayersFromApi(leagueId, loggedInUser)
            
            dispatch(playersAction)
        }
        if(leagueId)
            fetchPlayers()
    },[leagueId, loggedInUser])


    return {leaguePlayers, setLeagueId}
}

export default useLeaguePlayers
