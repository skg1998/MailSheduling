import React, { useState, useEffect } from 'react'
import './SingleMail.css'
import { useParams } from 'react-router-dom';
import { getData } from '../request';
import { motion } from 'framer-motion';
import { pageTransition, pageZoom } from '../util';

function SingleMail() {
    const { id } = useParams();

    const [singleMail, setSingleMail] = useState({
        mail: 'ankit@gmail.co',
        type: 'pending',
        subject: 'Flipr Hackathon 9.0 Fullstack Web Development Task',
        body: `Hello Participants!

        Welcome to Flipr Hackathon 9.0 !
        
        As per your selection we are forwarding you your Full Stack Web Development task in the attachment. Please find the attachment
        
        
        Please note:-
        The Hackathon will be completely online
        
        There is no provision to change the task selected
        
        After completion, kindly upload the task through the form link provided below
        If you have any doubts regarding the task, kindly mail us at arsalan@flipr.ai We'll contact you shortly after reading the mail.
        Kindly submit the task by 27th June 2021 10:00 PM through the link given below.`
    })

    const getMail = async () => {
        try {
            const { data, response } = await getData(`/getmail:${id}`)
            if (data) {
                setSingleMail(data);
            }
            else if (response.status !== 200) {
                console.log('unable to get mails')
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getMail()
    }, [])

    return (
        <div className="body">
            <h1 className="title">Mail {singleMail.type}</h1>
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition}
                className="mailBox">
                <div className="mail__content">

                    <h3>To: <span className="p-text">{singleMail.mail}</span></h3>
                    <h2 class="line-clamp-1">Subject: <span className="p-text">{singleMail.subject}</span></h2>
                    <p>
                        {singleMail.body}
                    </p>
                    <h4>Status: <span className="p-text">{singleMail.type}</span></h4>
                </div>
            </motion.div>

        </div>
    )
}

export default SingleMail
