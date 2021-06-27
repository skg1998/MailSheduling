import React from 'react'
import './Body.css'
import MailTable from '../MailTable/MailTable'
import NewMail from '../NewMaill/NewMail'

function Body({ title, type }) {

    return (
        <div>
            {/* <h1>Welcome To MailScheduler...</h1> */}
            <div className="body">
                <h3 className="title">{title}</h3>
                {
                    type === 'new_mail' ?
                        <>
                            <NewMail />
                        </>
                        :
                        <MailTable type={type} />
                }
            </div>
        </div>
    )
}

export default Body
