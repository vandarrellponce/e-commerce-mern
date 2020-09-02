import axios from 'axios'

export const loginUser = (cred) => {
    return async(dispatch) => {
        try {
            dispatch({type: 'LOGIN_USER'})
            const res = await axios.post('/api/users/login', cred)

            return dispatch({type:'LOGIN_USER_SUCCESS', payload: res.data})

        } catch (e) {
            return dispatch({type: 'LOGIN_USER_ERROR', payload: e.response.data})
        }
    }
}

export const registerUser = (cred) => {
    return async(dispatch) => {
        try {
            dispatch({type: 'REGISTER_USER'})
            const res = await axios.post('/api/users/register', cred)
            
            return dispatch({type:'REGISTER_USER_SUCCESS', payload: res.data})
        } 
        catch (e) {
            return dispatch({type: 'REGISTER_USER_ERROR', payload: e.response.data})
        }
    }
}

export const authUser = () => {
    return async(dispatch) => {
        try {
            const res = await axios.get('/api/users/auth')
            return dispatch({
                type: 'AUTH_USER',
                payload: res.data
            })
        } catch (e) {
            return dispatch({
                type:'AUTH_USER',
                payload: e.response
            })
        }
    }
   
}

export const addToCart = (productId) => {
    return async(dispatch) => {
        try{
            const res = await axios.post('/api/users/cart', {productId})
            return dispatch({
                type: 'ADD_TO_CART_SUCCESS',
                payload: res.data
            })
        }
        catch(e){
            return dispatch({
                type:'ADD_TO_CART_ERROR',
                payload: e.response
            })
        }
    }
}

export const getCart = () => {
    return async(dispatch) => {
        try{
            const res = await axios.get('/api/users/cart')
            return dispatch({
                type: 'GET_CART_SUCCESS',
                payload: res.data
            })
        }
        catch(e){
            return dispatch({
                type:'GET_CART_ERROR',
                payload: e.response
            })
        }
    }
}


/* export const getUserProfile = () => {
    return async(dispatch) => {
        try {
            dispatch({type: 'GET_USER_PROFILE'})
            const res = await axios.get('https://jsonplaceholder.typicode.com/users')
            return dispatch({type: 'GET_USER_PROFILE_SUCCESS', payload: res.data[0]})
        } 
        catch (e) {
            return dispatch({type: 'GET_USER_PROFILE_ERROR', payload: e})
            
        }
    }
} */