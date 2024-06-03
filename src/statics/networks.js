import {log} from "./common.js";




const API_END_POINT = 'http://127.0.0.1:8000'

export const GET_MENULIST = `${API_END_POINT}/api/menuList`;

export const GET_SCHEDULELIST = `${API_END_POINT}/api/smilesschedulelist`;

export const PUT_RETRYSCHEDULE = `/api/retrySchedule`;


export const request = async (path, options = {}) => {
    try {
        const fullUrl = `${API_END_POINT}${path}`
        log(fullUrl);
        const response = await fetch(fullUrl, options)

        if (response.ok) {
            const json = await response.json()
            log('response', json);
            return json;
        }
        throw new Error('API 통신 실패')
    } catch (e) {
        alert("error : " + e.message);
    }
}

export const get = async (path) => {
    try {
        const fullUrl = `${API_END_POINT}${path}`
        log(fullUrl);
        const response = await fetch(fullUrl)

        console.log()

        if (response.ok) {
            const json = await response.json()
            log('response', json);
            if(json.result)
                return json.data.contents;
        }
        throw new Error('API 통신 실패')
    } catch (e) {
        alert("error : " + e.message);
    }
}

export const post = async (path, data = {}) => {
    try {
        const fullUrl = `${API_END_POINT}${path}`
        log(fullUrl);
        const response = await fetch(fullUrl
            , {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
        });

        if (response.ok) {
            const json = await response.json()
            console.log(json);
            return json;
        }
        throw new Error('API 통신 실패')
    } catch (e) {
        alert("error : " + e.message);
    }
}

export const put = async (path, data = {}) => {
    try {
        const fullUrl = `${API_END_POINT}${path}`
        log(fullUrl);
        const response = await fetch(fullUrl
            , {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            });

        if (response.ok) {
            const json = await response.json()
            console.log(json);
            return json;
        }
        throw new Error('API 통신 실패')
    } catch (e) {
        alert("error : " + e.message);
    }
}


export function downloadFile(filename) {
    if (!filename) {
        alert('Please enter a file name');
        return;
    }

    try {
        fetch(`${API_END_POINT}/api/download/${filename}`)
            .then(response => {
                console.log(response);
                if (!response.ok) throw new Error('File not found');
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            })
            .catch(error => alert('파일처리중 문제가 발생하였습니다.'));
    } catch (e) {
        alert('파일 처리중 문제가 발생하였습니다.'+e);
    }

}
