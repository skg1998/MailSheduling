import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { container, pageTransition } from '../../utils/util'

import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';

import SendIcon from '@material-ui/icons/Send';
import RichTextEditor from 'react-rte';

import './NewMail.css'


function NewMail() {
    const [value, setValue] = useState(RichTextEditor.createEmptyValue());

    const onChange = (value) => {
        setValue({ value });
    };

    const handleSubmit = () => {

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
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    name="name"
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
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid>
                    <RichTextEditor value={value}
                        onChange={onChange} />
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
        </motion.div>
    )
}

export default NewMail
