import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../slices/loggedInUserSlice'
import {Col, Container, Row} from 'react-bootstrap'
import axios from '../lib/axios'
import OverviewCard from '../components/Profile/OverviewCard'
import RatingCard from '../components/Profile/RatingCard'
import LeaguesCard from '../components/Profile/LeaguesCard'

const ProfileScreen = ({match}) => {
    const {loggedInUser} = useSelector(selectLoggedInUser)
    const [playerProfile, setPlayerProfile] = useState()

    useEffect(()=> {
        if(match.params.id && loggedInUser.isAdmin){
            const getPlayerProfile = async () => {
                const playerData = await axios.get(`/api/players/${match.params.id}`)
                console.log(playerData)
                setPlayerProfile(playerData.data)
            }
            getPlayerProfile()
        }
        else if(loggedInUser){
            const getPlayerProfile = async () => {
                const playerData = await axios.get(`/api/players/${loggedInUser.playerId}`)
                setPlayerProfile(playerData.data)
            }
            getPlayerProfile()
        }
        else{
            setPlayerProfile(undefined)
        }

    },[loggedInUser])

    return (
            <Container>
                <Row><span className='display-3'>Player Profile</span></Row>
                
                {playerProfile &&
                <Row className='my-2'>
                    <Col md={4}>
                        <OverviewCard playerProfile={playerProfile}/>
                    </Col>
                    <Col md={4}>
                       <RatingCard playerProfile={playerProfile} />
                    </Col>
                    <Col md={4}>
                        <LeaguesCard playerProfile={playerProfile}/>
                    </Col>
                   
                </Row>
                }
               
            </Container>
    )
}

export default ProfileScreen
