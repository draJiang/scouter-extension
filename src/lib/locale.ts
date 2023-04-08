import { useContext, createContext } from "react";
import { fetchcurrentLanguage } from "./lang";

const asyncFetchcurrentLanguage = async () => {
    return await fetchcurrentLanguage()
}

// 获取当前语言

export const CurrentLanguageContext = createContext(null)

export const useCurrentLanguage = () => useContext(CurrentLanguageContext)


