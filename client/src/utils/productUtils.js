import Axios from "axios"

export const getProducts = () => {

    Axios.get('/api/products')
        .then(res => {
           return res.data
        })
        .catch(e => {
            console.log(e.message)
        })
}

export const uploadProduct = (product) => {

}