import React, { useState,  } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addPlayerToTeam, removePlayerFromTeam } from '../../slices/teamsSlice'
import toast from 'react-hot-toast'

const PlayerTeamSelect = ({player, teams}) => {
    
    const [selectedOption,setSelectedOption] = useState()
    //const [addPlayerResult, setAddPlayerResult] = useState()
    const dispatch = useDispatch()

    const onSubmitHandler = async () => {
        const {team: teamId, _id: playerId} = player
        
        if(selectedOption && selectedOption !== teamId){
            if(teamId){
                await dispatch(removePlayerFromTeam({playerId,teamId}))
            }
            await dispatch(addPlayerToTeam({playerId, teamId:selectedOption}))
            //setAddPlayerResult(result)
            toast.success('Player added to team.')
        }
        else{
            toast.error('Player already on team.')
        }

    }

    return (
        <>
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
        </>
    )
}

export default PlayerTeamSelect
