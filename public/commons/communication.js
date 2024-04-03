const API_END_POINT = import.meta.env.VITE_URL


export const request = async (path, options = {}) => {
    try {
        const fullUrl = `${API_END_POINT}${url}`
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
