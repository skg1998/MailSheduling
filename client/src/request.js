
// data posting to server 
export const postData = async (sendData, request) => {
    try {
        const res = await fetch(request, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        });
        return res;
    }
    catch (error) {
        console.log(error)
    }
}

// getting data from server 
export const getData = async (request) => {
    try {
        const response = await fetch(request, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();
        return { data, response };

    } catch(error) {
        console.log(error)
    }
}

