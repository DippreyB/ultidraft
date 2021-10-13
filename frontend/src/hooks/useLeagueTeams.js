// import React, { useEffect, useReducer, useState } from 'react'
// import { useSelector } from 'react-redux'
// import teamsReducer from '../Reducers/TeamsReducer'
// import { selectLoggedInUser } from '../slices/loggedInUserSlice'

// const useLeagueDetails = (initialState = {teams: [], players: [], status: 'idle'}) => {
//     const [leagueId, setLeagueId] = useState()
//     const [leagueDetails, dispatch] = useReducer(getTeamsByLeagueReducer, initialState)
//     const {loggedInUser} = useSelector(selectLoggedInUser)

//     useEffect(()=>{
//         dispatch({type: GET_TEAMS_BY_LEAGUE_REQUEST})
//         const fetchTeams = async ()=>{
//             const teamAction = await getTeamsByLeagueId(leagueId, loggedInUser)
//             dispatch(teamAction)
//         }

//         fetchTeams()
//     },[leagueId, loggedInUser])

//     return {leagueTeams, setLeagueId}
// }

// export default useLeagueTeams
