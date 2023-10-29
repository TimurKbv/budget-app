import { instance } from "../api/axios.api"
import { IUserData, IResponseUserData, IUser } from "../types/types"

export const AuthService = {
    async registration(userData: IUserData): Promise<IResponseUserData | undefined> {
        const {data} = await instance.post<IUserData, {data: IResponseUserData}>('user', userData)
        return data
    },
    async login(userdata: IUserData): Promise<IUser | undefined> {
        const { data } = await instance.post<IUser>('auth/login', userdata)
        return data
    },
    async getProfile(): Promise<IUser | undefined> {
        const { data } = await instance.get<IUser>('auth/profile')
        if (data) return data
    },
}