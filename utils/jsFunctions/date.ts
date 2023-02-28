import { FA_IR } from "utils/constants"

export const getCurrentIranDate=()=>{
    return new Intl.DateTimeFormat(FA_IR).format(new Date())
}