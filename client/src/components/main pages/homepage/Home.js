import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { Col, Card, Row } from 'antd'
import ImageSlider from './sections/ImageSlider';
import CheckBox from './sections/CheckBox';
import RadioBox from './sections/RadioBox';
import SearchFeature from './sections/SearchFeature';
import { Link } from 'react-router-dom';


const Home = (props) => {
    // STATES
    const {userData} = useSelector(state => state.userAuth)
    // eslint-disable-next-line
    const [loading, setLoading] = useState('false')
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(8)
    const [postSize, setPostSize] = useState()
    const [filters, setFilters] = useState({})
    // eslint-disable-next-line
    const [searchTerm, setSearchTerm] = useState("")

    // METHODS
    const getProducts = (variables) => {
        Axios.post('/api/getProducts', variables)
        .then(res => {
            if(variables.loadMore) setProducts(products.concat(res.data.products))
            if(!variables.loadMore) setProducts(res.data.products)
            setLoading(false)
            setPostSize(res.data.postSize)
            console.log(res.data)
        })
        .catch(e => {
            setError('Unable to load product data. Reason: ' + e.message )
            setLoading(false)
        })
    }

    const renderCards = products.map((product, i) => {
        return(
        <Col lg={6} md= {8} xs={24} key={i}>
            <Link to={`/products/${product._id}`}>
            <Card 
                hoverable={true} 
                cover={<ImageSlider 
                images={product.images} 
                productId={product._id}
                />}>

                <Card.Meta title={product.title}
                    description={`PHP ${product.price}`}
                    /> 

            </Card> 
            </Link>
           
        </Col>)
    })

    const handleClick = (e) => {
        e.preventDefault()
        getProducts({
            skip: skip+limit, 
            limit, 
            loadMore: true,
            filters
        })
        setSkip(skip+limit)
    }

    const showFilterResults = (filters) => {
        getProducts({skip: 0, limit: 4, filters})
        setSkip(0)
        setLimit(4)
    }

    const handleFilters = (newFilters, type) => {
        setFilters({
            ...filters,
            [type]: newFilters
        })
        showFilterResults({...filters, [type]: newFilters})
    }

    useEffect(() => {
        getProducts({skip, limit})
        // eslint-disable-next-line
    }, [])

    if(userData && !userData.isAuth) return <div></div>
    if(error) return <div className='myContainer'>Error: {error}</div>
    // console.log(products)

    const updateSearchTerm = (value) => {
        const variables = {
            skip:0,
            limit: limit,
            filters: filters,
            searchTerm: value
        }
        setSkip(0)
        setSearchTerm(value)
        getProducts(variables)
    }

    return ( 
    <div className='container'>
        <div className='home-title'>
            <h3>Window Shopping</h3>
        </div>

        {/* SEARCH FEATURE */}
        <div className='search-feature'>
            <SearchFeature updateSearchTerm={updateSearchTerm}/>
        </div>

        {/* CHECK BOX AND RADIO BOX */}
        <Row gutter={[16, 16]}>
            <Col lg={12} xs={24}>
                <CheckBox handleFilters={filters => handleFilters(filters, "category")}/>
            </Col>
            <Col lg={12} xs={24}>
                <RadioBox handleFilters={filters => handleFilters(filters, "price")}/>
            </Col>
        </Row>
    
        {/* PRODUCTS GALLERY */}
        {products.length === 0 ? 
            (<div className = 'home-info'>
                <h3>No posts yet...</h3>
            </div>) : 
            <div>
                <Row gutter={[16, 16]}>
                    {renderCards}
                </Row>
            </div>
            }
            <br/>
            <br/>

            {postSize >= limit &&
            <div className='home-button'>
                <button className='waves-effect waves-light btn-small grey'
                onClick={handleClick}>Load More</button>
            </div>}

    </div>
);
}

export default Home;