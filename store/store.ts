import {  legacy_createStore as createStore,compose } from 'redux'
import reducer from 'store/reducers';
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
const initialState = {
    questions: {
        isLoading: null,
        error: null,
        data: null
    },
    questionById: {
        isLoading: null,
        error: null,
        data: null
    },
};
 
const store = createStore(reducer, initialState,typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose );
 
export default store;