import { FA_IR, OPTIONS } from "utils/constants"

export const getCurrentIranTime=()=>{
   return new Intl.DateTimeFormat(FA_IR, OPTIONS).format(
    new Date()
) 
}