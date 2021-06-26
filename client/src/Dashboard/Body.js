import React from 'react'
import './Body.css'
import MailTable from './MailTable'

function Body({ title, type }) {

    return (
        <div className="body">
            <h1 className="title">{title}</h1>
            {
                type === 'new_mail' ?
                    <>
                        {/* <NewMail /> */}
                    </>
                    :
                    <MailTable type={type} />
            }
        </div>
    )
}

export default Body
