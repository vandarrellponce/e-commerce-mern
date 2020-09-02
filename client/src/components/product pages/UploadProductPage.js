import React, { useState} from 'react';
import Previews from '../utility components/Previews';
import Axios from 'axios';
const UploadProductPage = (props) => {

    // STATES
    const [product, setProduct] = useState({
                                        title: '',
                                        description:'',
                                        price: '',
                                    })
    const [category, setCategory] = useState('Milk Tea')
    const [images, setImages] = useState([])

    // METHODS
    /* const dispatch = useDispatch() */
    const handleChange = (e) => {
        e.preventDefault()
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        // PRODUCT
        const variable = {
            ...product, 
            price: Number(product.price), 
            category
        }
        // IMAGES
        const formData = new FormData()
        images.forEach( (image) => {
            formData.append(`images`, image)
        })
        // AXIOS POST REQUEST
        try {
            const res1 = await Axios.post('/api/products', variable)
            const _id = res1.data._id
            const res2 = await Axios.post(`/api/products/images/${_id}`, formData)
            if(res2.status === 200){
                alert('Product has been uploaded.')
                // PUSH TO HOME PAGE
                // props.history.push('/')
                console.log(res2.data)
            }   
        } catch (error) {
            alert('Failed to upload product. Please provide valid fields.')
        }
        /* dispatch(uploadProduct({...product, 
            price: Number(product.price), 
            category,
            images
        }))
        .then(response => {
            if(response.type === 'UPLOAD_PRODUCT_SUCCESS') {
                alert('Product has been uploaded.')
                // PUSH TO HOME PAGE
                // props.history.push('/')
                console.log(response.payload)
            }else{
                alert('Failed to upload product. Please provide valid fields.')
            }   
        }) */
    }
    
    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const categories = [
        {name:'Milk Tea'},
        {name:'Shake'},
    ]
    const categoriesJSX = categories.map( (cat, i) => {
        return <option 
                    key={i} 
                    value={cat.name}> 

                    {cat.name} 

                </option>
    })
    // if(loading) return <div></div>
    return ( 
        <div style={{maxWidth: '700px', margin: '2rem auto'} } >

            <div style={{textAlign: 'center', marginBottom:'2rem'}}>
                <label><h4>Upload Product</h4></label>
            </div>

            <Previews updateImages={updateImages}/>

           <form onSubmit={handleSubmit}>
                <label>Product Name</label>
                <input 
                    name='title'
                    type="text"
                    onChange={handleChange}
                    value={product.title}
                    />
                
                <label>Description</label>
                <textarea 
                    name='description'
                    type='text'
                    onChange={handleChange}
                    value={product.description}
                />

                <label>Price</label>
                <input 
                    name='price'
                    type='Number'
                    onChange={handleChange}
                    value={product.price}
                />

                <label>Choose Category</label>
                <select className='browser-default' value={category} onChange={e => setCategory(e.target.value)}>
                   {categoriesJSX}
                </select>
                <br/>
                <button
                    className='btn waves-effect grey'
                    type='submit'
                    name='action'
                >
                Upload
                </button>
               
           </form>
        </div>
     );
}
 
export default UploadProductPage;