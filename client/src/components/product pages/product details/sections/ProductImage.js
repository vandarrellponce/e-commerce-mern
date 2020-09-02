import React, { useState} from 'react'
import ImageGallery from 'react-image-gallery'

const ProductImage = (props) => {
    const [images, setImages] = useState([])

    useState(()=>{
        
        if(props.product && props.product.images){
            const array = props.product.images.map( img => {
                return {
                    original: `data:${img.mimetype};base64,${img.buffer}`,
                    thumbnail: `data:${img.mimetype};base64,${img.buffer}`
                }
            })
            setImages(array)
        }   
    },[])

    
    return (
        <div>
            <ImageGallery items={images}/>
        </div>
    )
}

export default ProductImage
