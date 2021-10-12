export const GET_LEAGUE_PLAYERS_REQUEST = 'GET_LEAGUE_PLAYERS_REQUEST'
export const GET_LEAGUE_PLAYERS_SUCCESS = 'GET_LEAGUE_PLAYERS_SUCCESS'
export const GET_LEAGUE_PLAYERS_FAILURE = 'GET_LEAGUE_PLAYERS_FAILURE'



const leaguePlayersReducer = (state, action) => { 
    switch(action.type) {
        case GET_LEAGUE_PLAYERS_REQUEST:
            return {
                ...state,
                players: [],
                status: 'pending'
            }
        case GET_LEAGUE_PLAYERS_SUCCESS:
            
            return {
                ...state,
                players: action.payload,
                status: 'fulfilled'
            }
        case GET_LEAGUE_PLAYERS_FAILURE:
            return {
                ...state,
                error: action.payload,
                status: 'rejected'
            }
        default:
            return state;
    }
}

export default leaguePlayersReducer