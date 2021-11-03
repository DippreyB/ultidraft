import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addPlayerToTeam, removePlayerFromTeam } from '../../slices/teamsSlice'

const PlayerTeamSelect = ({player, teams}) => {
    //TODO - notifications when request is fulfilled  or rejected
    //use Toast to show summary of action taken

    const [selectedOption,setSelectedOption] = useState()
    const dispatch = useDispatch()

    const onSubmitHandler = async () => {
        const {team: teamId, _id: playerId} = player
        
        if(selectedOption && selectedOption !== player.team){
            if(player.team)
                await dispatch(removePlayerFromTeam({playerId,teamId}))
            
            const addPlayerToTeamResult = await dispatch(addPlayerToTeam({playerId, teamId:selectedOption}))
            console.log(addPlayerToTeamResult.type)
        }
    }
    
    return (
        <Form>
            <InputGroup>
                <Form.Select aria-label='Player Team selector' onChange={(e)=>setSelectedOption(e.target.value)} size='sm'>
                    <option>Select a team</option>
                    {teams.map(team => { 
                        return(
                            <option key={team._id} value={team._id}>{team.teamName}</option>
                        )
                    })}
                </Form.Select>
                <Button  onClick={onSubmitHandler}>Change Team</Button>
            </InputGroup>
        </Form>
    )
}

export default PlayerTeamSelect
