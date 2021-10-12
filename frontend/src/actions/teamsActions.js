import axios from "axios"
import { GET_TEAMS_BY_LEAGUE_SUCCESS, GET_TEAMS_BY_LEAGUE_FAILURE } from "../Reducers/TeamsReducer"

export const getTeamsByLeagueId = async (leagueId, loggedInUser ) =>{
    try{
        
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${loggedInUser.token}`
            }
        }
        const {data} = await axios.get(`/api/teams/league/${leagueId}`,config)
        
        return {type: GET_TEAMS_BY_LEAGUE_SUCCESS, payload: data}
    }catch (error){
        return {type: GET_TEAMS_BY_LEAGUE_FAILURE, payload: error}
    }
}