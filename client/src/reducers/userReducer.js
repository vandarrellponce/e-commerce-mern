const initState = {
    loading: false,
    result: undefined,
    error: undefined,
}

export const userLoginReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_USER':
            return {
                loading: true
            }
        case 'LOGIN_USER_SUCCESS':
            return{
                result: action.payload,
                loading: false
            }
        case 'LOGIN_USER_ERROR':
            
            return{
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const userRegisterReducer = (state = initState, action) => {
    switch(action.type){
        case 'REGISTER_USER':
            return{
                loading: true
            }
        case 'REGISTER_USER_SUCCESS':
            return{
                loading: false,
                result: action.payload
            }
        case 'REGISTER_USER_ERROR':
            return{
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const userAuthReducer= (state = {}, action) => {
    switch(action.type){
        case 'AUTH_USER':
            return {
                userData: action.payload
            }

        default: return state
    }
}

export const userCartReducer = (state = {}, action) => {
    switch(action.type){
        case 'ADD_TO_CART_SUCCESS':
            return {
               cart: action.payload
            }
        case 'ADD_TO_CART_ERROR':
            return{
                error: action.payload
            }
        case 'GET_CART_SUCCESS':
            return {
                cart: action.payload
            }
        case 'GET_CART_ERROR':
            return{
                error: action.payload
            }
        default: return state
    }
}

export const userProfileReducer = (state = {test: 'userReducer init state'}, action) => {
    switch(action.type){
        case 'GET_USER_PROFILE':
            return {
                loading: true
            }
        case 'GET_USER_PROFILE_SUCCESS':
            return {
                loading: false,
                user: action.payload
            }
        case 'GET_USER_PROFILE_ERROR':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

