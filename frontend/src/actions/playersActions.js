import axios from 'axios'
import { GET_LEAGUE_PLAYERS_FAILURE, GET_LEAGUE_PLAYERS_SUCCESS } from '../Reducers/playersReducer'

export const getPlayersFromApi = async (leagueId, loggedInUser) => {
    try{
        
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${loggedInUser.token}`
            }
        }
        const {data} = await axios.get(`/api/players/league/${leagueId}`,config)
        
        return {type: GET_LEAGUE_PLAYERS_SUCCESS, payload: data}
    }catch (error){
        return {type: GET_LEAGUE_PLAYERS_FAILURE, payload: error}
    }
    
}

