import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Card from '@material-ui/core/Card';
import { CardActions, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import * as Api from '../../Api';


const useStyles = makeStyles((theme) => ({
    card: {
        padding: '10px',
        boxShadow: '0 4px 9px 0 rgba(0,0,0,0.2)'
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        color: '#4C3A98',
        display: 'flex',
        justifyContent: 'center',
        height: '20%',
        fontSize: '3rem',
        fontWeight: 'bold',
    },
    textField: {
        marginTop: '10px',
        width: '100%'
    },
    submit: {
        backgroundColor: '#ff0c0c',
        padding: '10px',
        width: '100%',
        textAlign: 'center',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: ' 15px',
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
    }
}))

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        };

        Api.Signup(user).then(res => {
            history.push('/login')
        }).catch(err => {
            console.log(err);
        })
    };

    const classes = useStyles();

    return (
        <div>
            <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography
                                type="headline"
                                component="h2"
                                className={classes.title}
                            >
                                Sign Up
                            </Typography>
                            <TextField
                                id="email"
                                type="email"
                                label="Email"
                                variant="outlined"
                                className={classes.textField}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <TextField
                                id="password"
                                type="password"
                                label="Password"
                                variant="outlined"
                                className={classes.textField}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </CardContent>
                        <CardActions>
                            <Grid container spacing={3}>
                                <Grid item lg={12} md={9}>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                                <Grid item lg={12} md={9}>
                                    <Link to="/login"><p>Signup</p></Link>
                                </Grid>

                            </Grid>
                        </CardActions>
                    </Card>
                </form>
            </Grid>
        </div>
    );
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default Signup