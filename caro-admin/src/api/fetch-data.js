export function fetchWithoutAuthentication(url, method, data) {
    return fetch(url, {
        method: method,
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        body: data !== undefined ? JSON.stringify(data) : null
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(
                (result) => {
                    throw Error(result.message);
                },
                (error) => {
                    throw Error('Unauthorized');
                }
            )
        }
        return res.json();
    });
}