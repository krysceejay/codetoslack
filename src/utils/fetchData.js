const baseUrl = process.env.REACT_APP_API_URL
const apiKey = process.env.REACT_APP_API_KEY

export const getData = async () => {
    const res = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey
        }
    })

    const data = await res.json()
    return data
}

export const postData = async (post) => {
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}


export const putData = async (id, post) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const patchData = async (post) => {
    const res = await fetch(baseUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}


export const deleteData = async id => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey
        }
    })

    return res
}