export const GET_TEAMS_BY_LEAGUE_REQUEST = 'GET_TEAMS_BY_LEAGUE_REQUEST';
export const GET_TEAMS_BY_LEAGUE_SUCCESS = 'GET_TEAMS_BY_LEAGUE_SUCCESS';
export const GET_TEAMS_BY_LEAGUE_FAILURE = 'GET_TEAMS_BY_LEAGUE_FAILURE';

const getTeamsByLeagueReducer = (state, action) => {
    switch(action.type) {
        case GET_TEAMS_BY_LEAGUE_REQUEST:
            return {
                status: 'pending'
            }
        case GET_TEAMS_BY_LEAGUE_SUCCESS:
            return {
                teams: action.payload,
                status: 'fulfilled'
            }
        case GET_TEAMS_BY_LEAGUE_FAILURE:
            return {
                error: action.payload,
                status: 'rejected'
            }
        default:
            return state
    }
}

export default getTeamsByLeagueReducer