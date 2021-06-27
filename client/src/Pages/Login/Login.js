import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Card, CardActions, CardContent } from "@material-ui/core"
import GoogleLogin from 'react-google-login'

import * as Api from '../../Api';
import { setUserSession, getToken } from '../../utils/AuthHandler'


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

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        async function sessionHandler() {
            try {
                let token = await getToken();
                let isAuth = token ? true : false;
                userHasAuthenticated(isAuth);
            } catch (e) {
                console.log(e);
            }
        }
        sessionHandler();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { email, password }
        Api.Signin(data).then(res => {
            setUserSession(res.accessToken, res.user);
            history.push('/');
        }).catch(err => {
            console.log('err');
        })
    };

    const responseSuccessGoogle = (response) => {
        const data = { tokenId: response.tokenId }
        console.log("data", data.tokenId)
        Api.GoogleSignin(data).then(res => {
            console.log('res', res)
            history.push('/')
        })
    }

    if (isAuthenticated) {
        history.push('/');
        return <></>
    }

    const responseErrorGoogle = (response) => {
        console.log(response.profileObj);
    }

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
                <Grid item >
                    <form onSubmit={handleSubmit}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography
                                    type="headline"
                                    component="h2"
                                    className={classes.title}
                                >
                                    Sign In
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
                                        <Link to="/signup"><p>Signup</p></Link>
                                    </Grid>
                                    <Grid item lg={12} md={9}>
                                        <GoogleLogin
                                            style={{ width: '100px', margin: 'auto' }}
                                            clientId="353919017162-f9kck24lh3gq7r92lulhg82aavuo3h8f.apps.googleusercontent.com"
                                            buttonText="Login With Google"
                                            onSuccess={responseSuccessGoogle}
                                            onFailure={responseErrorGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login