import { motion } from 'framer-motion'
import React from 'react'
import { container, pageTransition } from '../util'
import './NewMail.css'
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import SendIcon from '@material-ui/icons/Send';

import React, { useState, useEffect } from 'react';


function NewMail() {

    const [tags, setTags] = React.useState([]);
    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };


    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={container}
            transition={pageTransition}
            className="mailBox">
            <div className="mail__form">
                <label htmlFor="#to">To </label>
                <div className="tags-input">
                    <label htmlFor="#to">To </label>
                    <ul>
                        {tags.map((tag, index) => (
                            <li key={index}>
                                <span>{tag}</span>
                                <i className="material-icons">close</i>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text "
                        onKeyUp={event => addTags(event)}
                        placeholder="Press enter to add tags"
                    />
                </div>
                <div>
                    <label htmlFor="#cc">CC </label>
                    <input type="text" id="cc" />
                </div>
                <div className="selectInput">
                    <label htmlFor="#shedule">Shedule</label>
                    <select name="" id="">
                        <option value="second">20-30 Seconds</option>
                        <option value="week">A Week</option>
                        <option value="month">A Month</option>
                        <option value="year">A Year</option>
                    </select>

                </div>
                <div>
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" />
                </div>
                <div>
                    <textarea placeholder="Type your message here ...">

                    </textarea>
                </div>
                <div>
                    <FormatBoldIcon className="formIcon" />
                    <FormatItalicIcon className="formIcon" />
                    <FormatUnderlinedIcon className="formIcon" />
                </div>
                <div>
                    <motion.button
                        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                        className="btn btn-bg"
                        type="submit">
                        Send
                        <SendIcon className="formIcon" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

export default NewMail
