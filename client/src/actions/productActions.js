import axios from 'axios'

export const uploadProduct = (product) => {
    return async(dispatch) => {
        try {
            dispatch({type: 'UPLOAD_PRODUCT'})
            const res = await axios.post('/api/products', product)
            /* const _id = res.data._id
            const res2 = await axios.post(`/api/products/images/${id}`, 
                                        product.images, {
                                            header:'files'
                                        }) */

            return dispatch({type:'UPLOAD_PRODUCT_SUCCESS', payload: res.data})

        } catch (e) {
            return dispatch({type: 'UPLOAD_PRODUCT_ERROR', payload: e.response.data})
        }
    }
}