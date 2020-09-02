import { userLoginReducer, userRegisterReducer, userAuthReducer, userCartReducer } from "./reducers/userReducer";
import { productUploadReducer } from "./reducers/productReducer";


const { createStore, combineReducers, compose, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");

const initState = {}

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userAuth: userAuthReducer,
    productUpload: productUploadReducer,
    userCart: userCartReducer

})

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, initState, composeEnhancer(applyMiddleware(thunk)))
export default store