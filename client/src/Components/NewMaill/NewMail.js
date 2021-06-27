import { motion } from 'framer-motion'
import React, { useState } from 'react'

import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';

import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import RichTextEditor from 'react-rte';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { container, pageTransition } from '../../utils/util'

import * as Api from '../../Api'
import './NewMail.css'

const recurnce = [
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

const SelectWeek = [
    {
        value: '0',
        label: 'Sunday',
    },
    {
        value: '1',
        label: 'Monday',
    },
    {
        value: '2',
        label: 'Tuesday',
    },
    {
        value: '3',
        label: 'Wednesday',
    },
    {
        value: '4',
        label: 'Thrusday',
    },
    {
        value: '5',
        label: 'Friday',
    },
    {
        value: '6',
        label: 'Saturday',
    }
];

const SelectDate = [
    {
        value: '1',
        label: '1',
    },
    {
        value: '2',
        label: '2',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '4',
        label: '4',
    },
    {
        value: '5',
        label: '5',
    },
    {
        value: '6',
        label: '6',
    },
    {
        value: '7',
        label: '7',
    },
    {
        value: '8',
        label: '8',
    },
    {
        value: '9',
        label: '9',
    },
    {
        value: '10',
        label: '10',
    },
    {
        value: '11',
        label: '11',
    },
    {
        value: '12',
        label: '12',
    },
    {
        value: '6',
        label: '6',
    },
    {
        value: '13',
        label: '13',
    },
    {
        value: '14',
        label: '14',
    }, {
        value: '15',
        label: '15',
    }, {
        value: '16',
        label: '16',
    }, {
        value: '17',
        label: '17',
    }, {
        value: '18',
        label: '18',
    }, {
        value: '19',
        label: '19',
    },
    {
        value: '20',
        label: '20',
    },
    {
        value: '21',
        label: '21',
    },
    {
        value: '22',
        label: '22',
    },
    {
        value: '23',
        label: '23',
    },
    {
        value: '24',
        label: '24',
    },
    {
        value: '25',
        label: '25',
    },
    {
        value: '26',
        label: '26',
    },
    {
        value: '27',
        label: '27',
    },
    {
        value: '28',
        label: '28',
    },
    {
        value: '29',
        label: '29',
    },
    {
        value: '30',
        label: '30',
    },
    {
        value: '31',
        label: '31',
    },
];

const SelectMonth = [
    {
        value: '1',
        label: 'January',
    },
    {
        value: '2',
        label: 'February',
    },
    {
        value: '3',
        label: 'March',
    },
    {
        value: '4',
        label: 'April',
    },
    {
        value: '5',
        label: 'May',
    },
    {
        value: '6',
        label: 'June',
    },
    {
        value: '7',
        label: 'July',
    },
    {
        value: '8',
        label: 'August',
    },
    {
        value: '9',
        label: 'September',
    },
    {
        value: '10',
        label: 'October',
    },
    {
        value: '11',
        label: 'November',
    },
    {
        value: '12',
        label: 'December',
    }
]

function NewMail(props) {
    const [tags, setTags] = useState([])
    const [to, setTo] = useState();
    const [subject, setSubject] = useState();
    const [scheduleType, setScheduleType] = useState();
    const [body, setBody] = useState(RichTextEditor.createEmptyValue());
    const [second, setSecond] = useState({ afterSeconds: 20 });
    const [weekly, setWeekly] = useState({ day: 0, time: "", time_: new Date() });
    const [montly, setMonthly] = useState({ date: 1, time: "", time_: new Date() });
    const [yearly, setYearly] = useState({ month: 1, date: 1, time: "", time_: new Date() });

    const onChange = (value) => {
        setBody(value);
        if (props.onChange) {
            props.onChange(value.toString('html'));
        }
    };

    const weeklyHandleChange = e => {
        setWeekly({ ...weekly, [e.target.name]: e.target.value, time_: e.target.event });
    };

    const monthlyHandleChange = e => {
        setMonthly({ ...montly, [e.target.name]: e.target.value, time_: e.target.event });
    };

    const yearlyHandleChange = e => {
        setYearly({ ...yearly, [e.target.name]: e.target.value, time_: e.target.event });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            to: to,
            cc: tags,
            subject: subject
        }

        if (scheduleType === "seconds") {
            data.schedule = second;
        } else if (scheduleType === "weekly") {
            data.schedule = weekly
        } else if (scheduleType === "monthly") {
            data.schedule = montly
        } else if (data.schedule === "yearly") {
            data.schedule = yearly
        }

        if (body) {
            data.body = body.toString("markdown")
        }

        Api.createMail(data).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err)
        })
    }

    const TimeComponent = (type) => {
        if (type === 'seconds') {
            return <TextField
                id="outlined-full-width"
                placeholder="Schedule"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                variant="outlined"
                type="number"
                value={second}
                onChange={e => setSecond(e.target.value)}
            >

            </TextField>
        } else if (type === 'weekly') {
            return <>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <TextField
                            id="outlined-full-width"
                            placeholder="Weekly"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            select
                            fullWidth
                            variant="outlined"
                            name="day"
                            value={weekly.day}
                            onChange={weeklyHandleChange}
                        >
                            {
                                SelectWeek.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))
                            }
                        </TextField>
                    </Grid>
                    <Grid item md={6} className="time-picker">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                id="outlined-full-width"
                                fullWidth
                                variant="outlined"
                                id="time-picker"
                                name="time"
                                value={weekly.time_}
                                onChange={(e) => {
                                    let value = "";
                                    value += e.getHours();
                                    value += ":";
                                    value += e.getMinutes();
                                    weeklyHandleChange({ target: { name: "time", value, event: e } })
                                }}
                            />
                        </MuiPickersUtilsProvider>

                    </Grid>
                </Grid>
            </>
        } else if (type === 'monthly') {
            return <>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <TextField
                            id="outlined-full-width"
                            placeholder="Monthly"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            select
                            fullWidth
                            variant="outlined"
                            name="date"
                            value={montly.date}
                            onChange={monthlyHandleChange}
                        >
                            {
                                SelectDate.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))
                            }
                        </TextField>
                    </Grid>
                    <Grid item md={6} className="time-picker">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                id="outlined-full-width"
                                fullWidth
                                variant="outlined"
                                id="time-picker"
                                name="time"
                                value={montly.time_}
                                onChange={(e) => {
                                    let value = "";
                                    value += e.getHours();
                                    value += ":";
                                    value += e.getMinutes();
                                    monthlyHandleChange({ target: { name: "time", value, event: e } })
                                }}
                            />
                        </MuiPickersUtilsProvider>

                    </Grid>
                </Grid>
            </>
        } else if (type === 'yearly') {
            return <>
                <Grid container spacing={3}>
                    <Grid item md={4}>
                        <TextField
                            id="outlined-full-width"
                            placeholder="Monthly"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            select
                            fullWidth
                            variant="outlined"
                            name="month"
                            value={yearly.month}
                            onChange={yearlyHandleChange}
                        >
                            {
                                SelectMonth.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))
                            }
                        </TextField>
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            id="outlined-full-width"
                            placeholder="Monthly"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            select
                            fullWidth
                            variant="outlined"
                            name="date"
                            value={yearly.date}
                            onChange={yearlyHandleChange}
                        >
                            {
                                SelectDate.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))
                            }
                        </TextField>
                    </Grid>
                    <Grid item md={4} className="time-picker">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                id="outlined-full-width"
                                fullWidth
                                variant="outlined"
                                id="time-picker"
                                name="time"
                                value={yearly.time_}
                                onChange={(e) => {
                                    let value = "";
                                    value += e.getHours();
                                    value += ":";
                                    value += e.getMinutes();
                                    yearlyHandleChange({ target: { name: "time", value, event: e } })
                                }}
                            />
                        </MuiPickersUtilsProvider>

                    </Grid>
                </Grid>

            </>
        }
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
                                    value={scheduleType}
                                    onChange={e => setScheduleType(e.target.value)}
                                >
                                    {
                                        recurnce.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))
                                    }
                                </TextField>
                            </Grid>
                            <Grid item lg={12} sm={12} xl={12} xs={12}>
                                {scheduleType && TimeComponent(scheduleType)}
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
