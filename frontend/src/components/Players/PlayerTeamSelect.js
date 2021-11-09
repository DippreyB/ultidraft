import React, { useState, useEffect } from 'react'
import { Button, Form, InputGroup, Toast } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addPlayerToTeam, removePlayerFromTeam } from '../../slices/teamsSlice'

const PlayerTeamSelect = ({player, teams}) => {
    //TODO - notifications when request is fulfilled  or rejected
    //use Toast to show summary of action taken
    const [selectedOption,setSelectedOption] = useState()
    const [addPlayerResult, setAddPlayerResult] = useState()
    const [showToast, setShowToast] = useState(false)
    const dispatch = useDispatch()

    const onSubmitHandler = async () => {
        const {team: teamId, _id: playerId} = player
        
        if(selectedOption && selectedOption !== teamId){
            if(teamId){
                await dispatch(removePlayerFromTeam({playerId,teamId}))
            }
            const result = await dispatch(addPlayerToTeam({playerId, teamId:selectedOption}))
            setAddPlayerResult(result)
            
        }

    }

    useEffect(()=> {
        if(addPlayerResult)
            setShowToast(addPlayerResult.type.includes('fulfilled'))
    },[addPlayerResult])

    const toggleToast = () => setShowToast(!showToast)

    
    

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
        <Toast show={showToast} onClose={toggleToast} autohide delay={2000}>
            <Toast.Header>
                <strong>Player Updated</strong>
            </Toast.Header>
        </Toast>
        </>
    )
}

export default PlayerTeamSelect
