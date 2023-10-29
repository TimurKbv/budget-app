import axios from "axios";
import { getTokenFromLocalStorage } from "../helper/localstorage.helper";



export const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
    },
})