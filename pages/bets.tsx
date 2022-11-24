import { useState, useEffect } from 'react'
// Next Dependencies
import type { NextPage } from 'next'
import Head from 'next/head'
// Components
import Navbar from '../components/navbar'
import { Button, Modal, Input, Spin } from 'antd'
import { fixtures } from '../fixtures/England/epl-2022.json'

const BetModal = (props: any) => {
    return (
        <Modal visible={props.visible} onCancel={props.onCancel} title="Add Bet">
            <Input prefix="wda"/>
        </Modal>
    )
}

const Bets: NextPage = () => {
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [fixtures, setFixtures] = useState([])

    const getFixtures = () => {
        // get upcoming fixtures
        // determine present timestamp
        const now = new Date().valueOf()
        // select fixtures within the next week
        for (var fx in fixtures){
            const fixture = fixtures[fx]
            console.log(fixture)
        }
    }

    useEffect(()=>{
        getFixtures()
        setFixtures([])
        setLoading(false)
    },[])
    return (
        <div>
            <Head>
                <title>PlayerOne Sports Analytics</title>
                <meta name="description" content="Sports Analysis by Data Professionals" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <div className="page_container">
                {
                    loading ?
                    <Spin/> :
                    <div>
                        <h1><b>Bets</b></h1>
                        <Button onClick={()=>setModal(true)}>Add Bet</Button>
                        <BetModal visible={modal} onCancel={()=>setModal(false)}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Bets