const express = require('express')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')
const Payment = require('../models/payment')
const Product = require('../models/product')
const Async = require('async')

// REGISTER USER
router.post('/api/users/register', async(req, res) => {
    try {
        const user = new User(req.body)
        const token = user.generateToken()
        await user.save()

        res
        .cookie('x_token', token)
        .send({success: true, user, token})
    } 
    catch (error) {
        res.status(400).send(error.message)
    }
})

// LOGIN USER
router.post('/api/users/login', async(req, res) => {
    try {
        // Find Email
        const user = await User.findOne({email: req.body.email})
        if(!user) throw new Error('Incorrect Email')

        // Compare Password
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch) throw new Error('Incorrect Password')
        
        // Generate Token
        const token = user.generateToken()
        await user.save()

        res
        .cookie('x_token', token)
        .send({success: true, user, token})
       /*  res.send({success: true, user, token}) */
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})
// AUTH USER
router.get('/api/users/auth', auth, (req, res) => {
    res.send({
        isAuth: true,
        isAdmin: Boolean(req.user.role),
        user: req.user
    })
})
// LOGOUT USER
router.get('/api/users/logout', auth, async(req, res) => {
    try{
        // Delete the token from the user's array of tokens
        req.user.tokens = req.user.tokens.filter( token => token.token !== req.token)
        await req.user.save()

        res.send('User sucessfuly logged out')
    }
    catch(e){
        res.status(500).send(e.message)
    }
})
// LOG OUT ALL SESSIONS
router.post('/users/logoutall', auth, async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send('Logged out from all sessions')
    } 
    catch (error) {
        res.status(500).send(e.message)
    }
    
})
// GET USER PROFILE
router.get('/api/users/profile', auth, async(req, res) => {
    res.send(req.user)   
})

// ADD ITEM IN CART
router.post('/api/users/cart', auth, async(req, res) => {
    
    let duplicate = false
    const user = req.user
    user.cart = user.cart.map(item => {
        // IF PRODUCT IS ALREADY IN CART, ADD QUANTITY
        if(item.productId === req.body.productId){
            duplicate = true
            return({
                productId: req.body.productId,
                quantity: item.quantity + 1
            }) 
        }
        // IF PRODUCT ID NOT EQUAL, RETURN THE SAME ITEM
        else return item
    })

    if(!duplicate){
        user.cart.push({
            productId: req.body.productId,
            quantity: 1
        })
    }
   // THEN SAVE USER
    try {
        const savedUser = await user.save()
        res.send(savedUser.cart)
        
    } catch (e) {
        res.status(400).send(e.message)
    }
})

// DELETE ITEM FROM CART
router.delete('/api/users/cart/:id', auth, async(req, res) => {
    const user = req.user
    user.cart = [...user.cart].filter(item => {
        return item.productId !== req.params.id
    })
    try {
        const savedUser =  await user.save()
        res.send(savedUser.cart)
    } catch (e) {
        res.status(400).send(e.message)
    }
})
// EMPTY USER CART
router.delete('/api/users/cart/all', auth, async(req, res) => {
    try{
        req.user.cart.length = 0
        await req.user.save()
        res.send({success: true})
    }catch(e){
        res.status(400).send(e.message)
        console.log(e.message)
    }
})

// GET USER CART
router.get('/api/users/cart', auth, (req, res) => {
    res.send(req.user.cart)
})

// CREATE USER SUCCESSFULY PURCHASED
router.post('/api/users/payments', auth, async(req, res) => {
    const user = req.user
    const payment = req.body.payment
    // products in here is already modified, 
    // with dateOfpurchase, productId, quantity, etc
    // - from CartPage, method paymentSuccess
    const products = req.body.products 
   
    try{
        // 1. ADD BRIEF HISTORY TRANSACTIONS TO USER
        // AND INCREMENT PRODUCT SOLD
        user.history = user.history.concat(products)
        user.cart = []
        const savedUser = await user.save()
       
         // 2. PUT DETAILED PAYMENT HISTORY TO PAYMENT COLLECTION
        const newPayment =  new Payment({
            user: user._id,
            payment: [payment],
            products: [products]
        })
        const savedPayment = await newPayment.save()
        
        // 3. INCREMENT PRODUCT SOLD
        Async.eachSeries(products, (item, cb) => {
            Product.update({_id: item.productId},
                {
                    $inc: { "sold": item.quantity}
                },
                { new: false }, cb)
        }, (err) => {
            if(err) return res.status(400).send(err)
            res.send(savedUser)
        })
        

        //res.send(savedUser)
    }catch(e){
        res.status(400).send(e.message)
    }
})



module.exports = router