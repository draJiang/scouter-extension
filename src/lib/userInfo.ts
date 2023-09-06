import { useContext, createContext } from "react";
import { userInfoType } from '../types'

export const UserInfoContext = createContext<{ user: userInfoType, anki: any } | null>(null)

export const useUserInfoContext = () => useContext(UserInfoContext)