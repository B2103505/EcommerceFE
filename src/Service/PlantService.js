import axios from "axios"

export const axiosJWT = axios.create()

export const getAllPlant = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/plant/getAllPlant`)
    return res.data
}
