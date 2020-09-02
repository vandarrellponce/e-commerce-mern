const initState = {
    loading: false,
    product: undefined,
    error: null,
}

export const productUploadReducer = (state = initState, action) => {
    switch(action.type){
        case 'UPLOAD_PRODUCT':
            return {
                loading: true
            }
        case 'UPLOAD_PRODUCT_SUCCESS':
            return{
                product: action.payload,
                loading: false
            }
        case 'UPLOAD_PRODUCT_ERROR':
            
            return{
                loading: false,
                error: action.payload
            }
        default: return state
    }
}