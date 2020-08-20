import { userLoginReducer, userProfileReducer, userRegisterReducer, userAuthReducer } from "./reducers/userReducer";


const { createStore, combineReducers, compose, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");

const initState = {}

const rootReducer = combineReducers({
    userProfile: userProfileReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userAuth: userAuthReducer
})

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, initState, composeEnhancer(applyMiddleware(thunk)))
export default store