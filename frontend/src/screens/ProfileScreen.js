import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../slices/loggedInUserSlice'
import {Col, Container, Image, Row} from 'react-bootstrap'
import axios from '../lib/axios'
import OverviewCard from '../components/Profile/OverviewCard'
import RatingCard from '../components/Profile/RatingCard'
import LeaguesCard from '../components/Profile/LeaguesCard'
import Identicon from 'identicon.js'

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

    },[loggedInUser, match])

    let data
    if(playerProfile)
        data = new Identicon(playerProfile._id, 300).toString()
    
    

    return (
            <Container>
                {playerProfile &&
                <>
                <Row>
                    {/* player info column */}
                    <Col xs={12} md={4}> 
                        <Row>
                            <Col className='d-flex justify-content-center' xs={4} md={12}>
                                <Image src={`data:image/png;base64,${data}`} fluid roundedCircle></Image>
                            </Col>
                            <Col className='d-flex  align-items-center' xs={8} md={12}>
                                    <div className='display-6'>{playerProfile.playerName}</div>
                            </Col>
                        </Row>
                        <Row>
                            <div>{playerProfile.age}, {playerProfile.genderMatchup}</div>
                        </Row>
                        <Row>
                            <div className='text-muted'>Experience </div>
                            <div>{playerProfile.experience} {playerProfile.role}</div>
                        </Row>
                        <Row>
                            <div className='text-muted'>Comments </div>
                            <div>{playerProfile.comments} </div>
                        </Row>
                    </Col>
                </Row>



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
                </>
                }
               
            </Container>
    )
}

export default ProfileScreen
