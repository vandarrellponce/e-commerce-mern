const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const Product = require('../models/product')

// multer middleware with limits and file filters
const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('Allowed files are jpg, jpeg and png only'))
        }
        cb(undefined, true)
    }
})


// UPLOAD PRODUCT
router.post('/api/products', auth, async(req, res) => {
    try {
        const product = {
            ...req.body, 
            user: req.user._id
        }
        const newProduct = await new Product(product).save()
        res.send(newProduct)    
    } 
    catch (e) {
        res.status(400).send(e.message)
    } 
})

// UPLOAD PRODUCT IMAGE
router.post('/api/products/images/:_id', upload.array('images', 5), auth, async(req, res) => {
    const _id = req.params._id
    try {
        const product = await Product.findById(_id)
        if(!product) throw new Error('No such product with given ID')
        product.images = req.files
        const savedProduct = await product.save()
        res.send(savedProduct)
    } catch (error) {
        res.status(400).send()
    }
})

// GET PRODUCTS
//          /tasks?limit=10&skip=10
//          /tasks?sortBy=createdAt_desc
router.post('/api/getProducts', auth, async(req, res) => {
    
    if(req.query.sortBy){
        const sortByValue = req.query.sortBy.split('_')[0]
        const orderByValue = req.query.sortBy.split('_')[1] === 'desc' ? -1 : 1
        sort[sortByValue] = orderByValue
    }
    try {
        if(req.body.searchTerm){
            const term = req.body.searchTerm
            const products = await Product.find({$text: {$search: term}})
            .populate()
            .limit(Number(req.body.limit))
            .skip(Number(req.body.skip))
            //.sort([[sortByValue, orderByValue]])
            res.send({products, postSize: products.length})  
        }
        else{
            const products = await Product.find(req.body.filters)
            .limit(Number(req.body.limit))
            .skip(Number(req.body.skip))
            //.sort([[sortByValue, orderByValue]])
            res.send({products, postSize: products.length})  
        }
          
    } 
    catch (e) {
        res.status(401).send(e.message)
    }
})

// GET PRODUCT by ID
router.get('/api/products/:id', auth, async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.send(product)
    } catch (e) {
        res.send(e.message)
    }
})

/* // GET PRODUCT IMAGE BY ID and INDEX
router.get('/api/products/:id/image/:index', async(req, res) => {
   
    try {
        const product = await Product.findById(req.params.id)
        if(!product || !product.images) {
            throw new Error()
        }
        res.set('Content-type', 'image/jpg')
        res.send(product.images[req.params.index].buffer)
    } catch (e) {
        res.status(404).send()        
    }
})
 */
module.exports = router