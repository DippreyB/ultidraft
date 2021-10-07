const playersReducer = (state, action) => { 
    switch(action.type) {
        case 'PLAYERS_API_REQUEST':
            return {
                ...state,
                players: [],
                status: 'pending'
            }
        case 'PLAYERS_API_SUCCESS':
            
            return {
                ...state,
                players: action.payload,
                status: 'success'
            }
        case 'PLAYERS_API_FAILURE':
            return {
                ...state,
                error: action.payload,
                status: 'failure'
            }
        default:
            return state;
    }
}

export default playersReducer