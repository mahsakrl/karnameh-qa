import { AnyAction } from "redux"
import {
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAIL,
    GET_QUESTION_BY_ID_REQUEST,
    GET_QUESTION_BY_ID_SUCCESS,
    GET_QUESTION_BY_ID_FAIL,
 
} from "store/actionTypes";
interface State{
    isLoading:boolean,
    error:null | boolean | string,
    data:null | boolean | string,
}
 
const reducer = (state:State, action:AnyAction) => {
    switch (action.type) {
            case GET_QUESTIONS_REQUEST:
            return {
                ...state,
                questions: {
                    isLoading: true,
                    error: null,
                    data: null
                }
            }
        case GET_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions: {
                    isLoading: false,
                    error: false,
                    data: action.payload
                }
            }
        case GET_QUESTIONS_FAIL:
            return {
                ...state,
                questions: {
                    isLoading: false,
                    error: action.payload,
                    data: false
                }
            }
            case GET_QUESTION_BY_ID_REQUEST:
                return {
                    ...state,
                    questionById: {
                        isLoading: true,
                        error: null,
                        data: null
                    }
                }
            case GET_QUESTION_BY_ID_SUCCESS:
                return {
                    ...state,
                    questionById: {
                        isLoading: false,
                        error: false,
                        data: action.payload
                    }
                }
            case GET_QUESTION_BY_ID_FAIL:
                return {
                    ...state,
                    questionById: {
                        isLoading: false,
                        error: action.payload,
                        data: false
                    }
                }
        default: return state;
    }
}
 
export default reducer;