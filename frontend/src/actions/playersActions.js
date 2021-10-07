import axios from 'axios'

export const getPlayersFromApi = async (leagueId, loggedInUser) => {
    try{
        
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${loggedInUser.token}`
            }
        }
        const {data} = await axios.get(`/api/players/league/${leagueId}`,config)
        
        return {type: 'PLAYERS_API_SUCCESS', payload: data}
    }catch (error){
        return {type: 'PLAYERS_API_FAILURE', payload: error}
    }
    
}

