import axios from 'axios';
import qs from 'query-string';

const BASE_URL = 'http://localhost:5000/v1/';


export const Signin = (data) => {
    var submitData = qs.stringify({
        'username': data.email,
        'password': data.password,
    });

    const configs = {
        method: 'post',
        url: BASE_URL + "user/login",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: submitData
    };

    return new Promise((resolve, reject) => {
        axios(configs).then(({ status, data }) => {
            resolve(status == 200 && data ? data : null)
        })
            .catch(reject)
    })
}

export const Signup = (data) => {
    var submitData = qs.stringify({
        'username': data.email,
        'password': data.password,
    });

    const configs = {
        method: 'post',
        url: BASE_URL + "user/register",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: submitData
    };

    return new Promise((resolve, reject) => {
        axios(configs).then(({ status, data }) => {
            resolve(status == 200 && data ? data : null)
        })
            .catch(reject)
    })
}

export const GoogleSignin = (data) => {
    var submitData = qs.stringify(data);
    const configs = {
        method: 'post',
        url: BASE_URL + "user/google-login",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: submitData
    };

    return new Promise((resolve, reject) => {
        axios(configs).then(({ status, data }) => {
            resolve(status == 200 && data ? data : null)
        })
            .catch(reject)
    })
}

/** 
 * @description create mail
 */

export const createMail = (data) => {
    var submitData = qs.stringify({
        'to': data.to,
        'cc': data.cc,
        'subject': data.subject,
        'body': data.body,
        'recurrence': data.recurrence
    });

    const configs = {
        method: 'post',
        url: BASE_URL + "mail/",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: submitData
    };

    return new Promise((resolve, reject) => {
        axios(configs).then(({ status, data }) => {
            resolve(status == 200 && data ? data : null)
        })
            .catch(reject)
    })
}

export const getMailHistory = () => {
    let config = {
        headers: {
            Accept: "application/json",
        },
    }
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "mail/sent", config)
            .then(({ status, data }) => {
                resolve(status == 200 && data ? data : null)
            })
            .catch(reject)
    })
}


export const getAllScheduledMail = () => {
    let config = {
        headers: {
            Accept: "application/json",
        },
    }
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "mail/scheduled", config)
            .then(({ status, data }) => {
                resolve(status == 200 && data ? data : null)
            })
            .catch(reject)
    })
}
