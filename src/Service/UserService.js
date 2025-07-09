import axios from "axios"

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