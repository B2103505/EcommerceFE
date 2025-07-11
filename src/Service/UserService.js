import axios from "axios"

export const axiosJWT = axios.create()

export const LoginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/sign-in`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.data
}

export const SignUpUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/sign-up`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.data
}

export const getDetailUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/user/get-detail/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const LogoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/log-out`)
    return res.data
}

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/refresh-token`, {
        withCredentials: true
    })
    return res.data
}

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_KEY}/user/update-user/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${access_token}`,
        }
    })
    return res.data
}