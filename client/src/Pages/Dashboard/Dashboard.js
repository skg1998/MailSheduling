import React from 'react'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Home from '../../Containers/Home/Body'
import { Route } from 'react-router-dom'

function Dashboard() {
    return (
        <>
            <main>
                <Sidebar />
                <div style={{ width: '100%' }}>
                    <Header />
                    <Route exact path="/">
                        <Home title="Your Scheduled Mails" type="pending" />
                    </Route>
                    <Route exact path="/new_mail">
                        <Home title="Schedule a mail" type="new_mail" />
                    </Route>
                    <Route exact path="/history">
                        <Home title="Your Mail History" type="sent" />
                    </Route>
                </div>
            </main>
        </>
    )
}

export default Dashboard
