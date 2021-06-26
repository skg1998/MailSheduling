import React, { useState, useEffect } from 'react'
import { getData } from '../../request';
import blank from '../../Assets/file.png'
import TableRow from '../TableRow/TableRow';
import { motion } from 'framer-motion';
import { container, pageTransition } from '../../utils/util';


function MailTable({ type }) {

    const [mails, setMails] = useState()
    const mail = [{
        id: ' 646468466', sno: '5', mail: 'ankit@email.co',
        subject: 'Flipr Hackathon 9.0 Fullstack Web Development Task',
        body: 'your selection we are forwarding you your Full Stack Web Development task in the attachment. Please find the attachment',
        date: '06/05/2002', type: 'pending'
    },
    {
        id: ' 646468466', sno: '5', mail: 'ankit@email.co',
        subject: 'Flipr Hackathon 9.0 Fullstack Web Development Task',
        body: 'your selection we are forwarding you your Full Stack Web Development task in the attachment. Please find the attachment',
        date: '06/05/2002', type: 'sent'
    },
    {
        id: ' 646468466', sno: '5', mail: 'ankit@email.co',
        subject: 'Flipr Hackathon 9.0 Fullstack Web Development Task',
        body: 'your selection we are forwarding you your Full Stack Web Development task in the attachment. Please find the attachment',
        date: '06/05/2002', type: 'pending'

    }]
    const getMails = async () => {
        try {
            const { data, response } = await getData(`/getmails:${type}`)
            if (data) {
                setMails(data);
            }
            else if (response.status !== 200) {
                console.log('unable to get mails')
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getMails()
    }, [])
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            transition={pageTransition}
            className="mailBox">
            <div className="row head__row">
                <td>Sno</td>
                <td>Email Address</td>
                <td>Message </td>
                <td>Date </td>
                <td>Action</td>
            </div>
            {
                mail && mail.length > 0 ?
                    mail.map((mail, i) => (
                        mail.type === 'pending' &&
                        <TableRow key={i} id={mail._id} sno={i + 1} mailId={mail.mail} subject={mail.subject} body={mail.body} date={mail.date} type={type} />
                    ))
                    :
                    <div className="blank">
                        <img src={blank} alt="" />
                    </div>
            }

        </motion.div>
    )
}

export default MailTable
