import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminLeagues, getUserLeagues, selectLeagues } from '../../slices/leaguesSlice'
import { selectLoggedInUser } from '../../slices/loggedInUserSlice'

const LeagueList = () => {
    const {loggedInUser} = useSelector(selectLoggedInUser)
    const {adminLeagues} = useSelector(selectLeagues)
    const {userLeagues} = useSelector(selectLeagues)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUserLeagues())
        if(loggedInUser.isAdmin) dispatch(getAdminLeagues())
    }, [loggedInUser, dispatch])

    return (
        <div>
            
            
            <div>
                <h2>My Leagues</h2>
                {userLeagues.map(league =>{
                return <div key={league._id}>{league.leagueName}</div>
                })}
            </div>
            
            {loggedInUser.isAdmin &&
                <div>
                    <h2>Admin Leagues</h2>
                    {adminLeagues.map(league =>{
                    return <div key={league._id}>{league.leagueName}</div>
                    })}
                </div>
            }
        </div>
    )
}

export default LeagueList
