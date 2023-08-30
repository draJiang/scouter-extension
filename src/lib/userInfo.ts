import { useContext, createContext } from "react";
import { userInfoType } from '../types'

export const UserInfoContext = createContext<userInfoType | null>(null)

export const useUserInfoContext = () => useContext(UserInfoContext)