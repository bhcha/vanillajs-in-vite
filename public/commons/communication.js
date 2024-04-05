const API_END_POINT = import.meta.env.VITE_URL


export const request = async (path, options = {}) => {
    try {
        const fullUrl = `${API_END_POINT}${path}`
        console.log(fullUrl);
        const response = await fetch(fullUrl, options)

        if (response.ok) {
            const json = await response.json()
            return json;
        }
        throw new Error('API 통신 실패')
    } catch (e) {
        alert("error : " + e.message);
    }
}

export const post = async (path, data = {}) => {
    try {
        const fullUrl = `${API_END_POINT}${path}`
        console.log(fullUrl);
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
            return json;
        }
        throw new Error('API 통신 실패')
    } catch (e) {
        alert("error : " + e.message);
    }
}


