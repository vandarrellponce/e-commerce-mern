import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import CartTable from './sections/CartTable'
import { Result, Empty } from 'antd'
import Paypal from '../../utility components/Paypal'

const CartPage = () => {

    const { cart } = useSelector(state => state.userCart)
    const [products, setProducts] = useState([]) /* products with order quantity */
    const [total, setTotal] = useState(0)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showTotal, setShowTotal] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        // SET UP ARRAY OF IDs TO BE THE QUERY 
        const array = []
        if(cart) cart.forEach(item => array.push(item.productId))

        // ONCE THERE IS RESPONSE, ATTACH THE CART 
        // QUANTITY TO CORRESPONDING PRODUCTS AS ORDER QUANTITY
        Axios.post('/api/getProducts', {filters: {_id: array}})
        .then(res => {
            cart.forEach(item => {
                res.data.products.forEach(product => {
                    if(product._id === item.productId){
                        product.orderQuantity = item.quantity
                    }
                })
            })
            // GET THE TOTAL SUM OF PURCHASED PRODUCTS
            const sum = res.data.products.reduce((a, value) => {
                return ( a + (value.orderQuantity * value.price))
            }, 0)
            setTotal(sum)
            setProducts(res.data.products)
            if(!cart.length) setShowTotal(false)
        })
        .catch(e => {console.log(e.message)})
    }, [cart])

    const handleRemove = (productId) => {
        // REMOVE ITEM IN CART
        Axios.delete(`/api/users/cart/${productId}`)
        .then(res => {
           dispatch({
                type:'GET_CART_SUCCESS',
                payload: res.data
            })
        })
    }

    const paymentSuccess = async(payment) => {
        
        const variables = {
            payment,
            products: products.map(item => {
                return {
                    dateOfPurchase: Date.now(),
                    name: item.title,
                    productId: item._id,
                    price: item.price,
                    quantity: item.orderQuantity,
                    paymentId: payment.paymentID
                }
            })
        }
        try {
            // POST PAYMENT 
            console.log('fetching')
            const res = await Axios.post('/api/users/payments', variables)
            // IF SUCCESS, EMPTY USER CART AND DISPATCH CART WITH EMPTY ARRAY
            if(res.status === 200) {
                console.log(res.data)
                setShowSuccess(true)
                setShowTotal(false)
                dispatch({
                        type:'GET_CART_SUCCESS',
                        payload: []
                    }) 
            }
            else alert('Failed to buy the product')
        } 
        catch (e) {}
        
    }
    const paymentCancelled = (data) => {

    }
    const paymentError = (error) => {
        
    }
   /*  const orderSuccess = () => {
        const initialOrderObject = {
            modeOfPayment: 'COD',
            products: products.map(item => {
                return {
                    dateOfPurchase: Date.now(),
                    name: item.title,
                    productId: item._id,
                    price: item.price,
                    quantity: item.orderQuantity
                }
            })
        }
    } */


    return (
        <div className = 'myContainer'>
            <h3>My Cart</h3>
            <CartTable products = {products} handleRemove={handleRemove}/>

            {showTotal ?
            <div style={{marginTop: '3rem'}}>
                <h5>Total Amount: &#8369;{total}</h5>
            </div>
            :
            showSuccess ? 
            <Result
                status="success"
                title="Successfully Purchased Items"
                /> 
            :
            <div style={{width:'100%', display: 'flex', 
                flexDirection:'column', justifyContent:'center'}}>
                <br/>
                <Empty description={false} />
                <p>No Items In The Cart</p>

            </div>
            }
            {showTotal &&
                <Paypal 
                paymentSuccess={paymentSuccess} 
                paymentCancelled={paymentCancelled} 
                paymentError={paymentError}
                total = {total}/>
            }
            
        </div>
    )
}

export default CartPage
