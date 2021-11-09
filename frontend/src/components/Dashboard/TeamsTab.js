import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import TeamDetails from '../Teams/TeamDetails'
import DetailsPanel from './DetailsPanel'
import TeamsList from '../Teams/TeamsList'

const TeamsTab = ({teams}) => {

    const [selectedTeam , setSelectedTeam] = useState()

    const selectTeamHandler = (id) => { 
        setSelectedTeam(teams.find(team => team._id === id))
    }

    useEffect(() => {
        if(selectedTeam)
            setSelectedTeam(teams.find(team => team._id === selectedTeam._id))
    },[teams])

    return (
        <>
            <Row>
                <Col md={4} className='my-2'>
                    {teams && 
                    <TeamsList teams={teams} 
                        selectTeamHandler={selectTeamHandler}
                        selectedTeam = {selectedTeam}
                    /> }
                </Col>

                <Col md={8} className='my-2'>
                    {selectedTeam && 
                    <DetailsPanel 
                    setDetails={setSelectedTeam} 
                    detailsObject={selectedTeam}
                    > 
                        <TeamDetails selectedTeam={selectedTeam}>

                        </TeamDetails>
                    </DetailsPanel>
                    }    
                </Col>
            </Row>
        </>
    )
}

export default TeamsTab
