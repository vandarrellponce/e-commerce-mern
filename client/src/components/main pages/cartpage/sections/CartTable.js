import React from 'react'

const CartTable = (props) => {

    if(!props.products) return <div className='myContainer'>Loading Cart...</div>

    const handleClick = (productId) => {
        props.handleRemove(productId)
    }

    const renderItems = props.products.map((product, i) => {
            return(
                <tr key={i}>
                <td>{product.title}</td>
                <td>
                    <img style={{width:'70px'}} 
                        alt='product' 
                        src={`data:${product.images[0].mimetype};base64,${product.images[0].buffer}`}
                        />
                </td>
                <td>
                    {product.orderQuantity} &nbsp;
                    {/* <button onClick = {e => handleClick(product._id)}>-</button> &nbsp;
                    <button onClick = {e => handleClick(product._id)}>+</button> */}
                </td>
                <td>{product.price}</td>
                <td>
                    <button onClick = {e => handleClick(product._id)}>Remove</button>
                </td>
            </tr>)  
        })
    
    return (
        <div>
           
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Image</th>
                        <th>Order Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems}
                </tbody>
            </table>
        </div>
    )
}

export default CartTable
