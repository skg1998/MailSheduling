import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { container, pageTransition } from '../../utils/util'

import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SendIcon from '@material-ui/icons/Send';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import RichTextEditor from 'react-rte';

import * as Api from '../../Api'

import './NewMail.css'

const currencies = [
    {
        value: 'seconds',
        label: 'Seconds',
    },
    {
        value: 'weekly',
        label: 'Weekly',
    },
    {
        value: 'monthly',
        label: 'Monthly',
    },
    {
        value: 'yearly',
        label: 'Yearly',
    },
];


function NewMail(props) {
    const [tags, setTags] = useState([])
    const [to, setTo] = useState();
    const [subject, setSubject] = useState();
    const [schedule, setSchedule] = useState();
    const [body, setBody] = useState(RichTextEditor.createEmptyValue());

    const onChange = (value) => {
        setBody(value);
        if (props.onChange) {
            props.onChange(value.toString('html'));
        }
    };

    const handleSubmit = () => {
        const data = {
            "to": to,
            "cc": tags,
            "subject": subject,
            "schedule": schedule,
            "body": ""
        }
        console.log("data.......", data);
        Api.createMail(data).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={container}
            transition={pageTransition}
            className="mailBox">
            <Grid container spacing={3} >
                <Grid item lg={12} sm={9} xl={6} xs={3}>
                    <form onSubmit={handleSubmit} noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item lg={12} sm={12} xl={12} xs={12}>
                                <TextField
                                    id="outlined-full-width"
                                    placeholder="To"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={to}
                                    onChange={e => setTo(e.target.value)}
                                />
                            </Grid>
                            <Grid item lg={12} sm={9} xl={6} xs={3}>
                                <ReactTagInput
                                    style={{ padding: '10px' }}
                                    tags={tags}
                                    placeholder="CC"
                                    maxTags={10}
                                    editable={true}
                                    readOnly={false}
                                    removeOnBackspace={true}
                                    onChange={(newTags) => setTags(newTags)}
                                    validator={(value) => {
                                        const isEmail = value.indexOf("@") !== -1;
                                        if (!isEmail) {
                                            alert("Please enter an e-mail address");
                                        }
                                        return isEmail;
                                    }}
                                />
                            </Grid>
                            <Grid item lg={12} sm={12} xl={12} xs={12}>
                                <TextField
                                    id="outlined-full-width"
                                    placeholder="Subject"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                />
                            </Grid>
                            <Grid item lg={12} sm={12} xl={12} xs={12}>
                                <TextField
                                    id="outlined-full-width"
                                    placeholder="Schedule"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    select
                                    fullWidth
                                    variant="outlined"
                                    value={schedule}
                                    onChange={e => setSchedule(e.target.value)}
                                >
                                    {
                                        currencies.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))
                                    }
                                </TextField>
                            </Grid>
                            <Grid item lg={12} sm={12} xl={12} xs={12}>
                                <RichTextEditor
                                    value={body}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item lg={12} sm={9} xl={6} xs={3}>
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
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </motion.div>
    )
}

export default NewMail
