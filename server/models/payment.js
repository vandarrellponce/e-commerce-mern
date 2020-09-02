const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    payment: {
        type: Array,
        default: []
    },
    products: {
        type: Array,
        default: []
    }
}, {timestamps: true})

const Payment = mongoose.model('Payment', paymentSchema)
module.exports = Payment