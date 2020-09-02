import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd'
import ProductImage from './sections/ProductImage'
import ProductInfo from './sections/ProductInfo'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../actions/userActions'

const ProductDetails = (props) => {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const dispatch = useDispatch()

    const addToCartHandler = () => {
        dispatch(addToCart(product._id))
        .then(res => {
            return console.log(res.payload)
        })
    }

    useEffect(()=>{
        setLoading(true)
        Axios.get(`/api/products/${props.match.params.id}`)
        .then(res => {
            setProduct(res.data)
            setLoading(false)
        })
        .catch(e => {
            setError(e.message)
            setLoading(false)
        })
    }, [props.match.params.id])

    if (loading) return <div className='myContainer'>Loading Product...</div>
    if (error) return <div className='myContainer'>Error: {error}</div>
    console.log(product)
    return (
        <div className='myContainer'>
            {/* TITLE */}
            <div style={{display: 'flex', justifyContent:'center'}}>
                <h2>{product.title}</h2>
            </div>

            <br/>

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <ProductImage product={product}/>
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo product={product} addToCartHandler={addToCartHandler}/>
                </Col>
            </Row>
        </div>
    )
}

export default ProductDetails
