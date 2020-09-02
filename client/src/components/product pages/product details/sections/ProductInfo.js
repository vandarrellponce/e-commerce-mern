import React, { useEffect, useState } from 'react'
import { Descriptions, Button } from 'antd'

const ProductInfo = (props) => {

    const [product, setProduct] = useState({})

    const handleClick = (e) => {
        
        props.addToCartHandler()
    }

    useEffect(()=>{
        if(props.product){
            setProduct(props.product)
        }
    }, [props.product])

    if(!product) return <div className='myContainer'>Loading Product...</div>
    return (
        <div>
           <Descriptions title="Product Information" size='small'>
               <Descriptions.Item label="Price">P{product.price}</Descriptions.Item>
               <Descriptions.Item label="Sold">{product.sold}</Descriptions.Item>
               <Descriptions.Item label="Rating">{product.rating}</Descriptions.Item>
               <Descriptions.Item label="Description" span='3' >{product.description}</Descriptions.Item>
           </Descriptions>
           <br/>
           <br/>
           <div style={{display: 'flex', justifyContent:'center'}}>
                   <Button size='large' shape='round' type='danger'
                    onClick={handleClick}> 
                        Add to Cart
                    </Button>
               </div>
        </div>
    )
}

export default ProductInfo
