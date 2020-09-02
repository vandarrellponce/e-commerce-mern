import React from 'react';
import { Carousel } from 'antd';

const ImageSlider = (props) => {
    return ( 
        <div>
            <Carousel autoplay>
                {props.images.map((img, i) => {
                    return (<div key={i}>
                        <img 
                        className='image-slider'
                        src={`data:${img.mimetype};base64,${img.buffer}`} 
                        alt="product"/>
                        {/* <img 
                        className='image-slider'
                        src={`localhost:5001/api/products/${props.productId}/image/${img}`} 
                        alt="product"/> */}
                    </div>)
                })}
            </Carousel>
        </div>
     );
}
 
export default ImageSlider;