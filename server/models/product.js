 const mongoose = require('mongoose')

 const productSchema = mongoose.Schema({
    title:{
        required: true,
        type: String
    },
    description:{
        required:true,
        type: String
    },
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    price:{
        type: Number,
        default: 0
    },
    category:{
        type: String,
        required: true
    },
    images:{
        type: Array,
        default: []
    },
    sold:{
        type: Number,
        default:0
    },
    rating:{
        type: Number,
        default: 0
    }
 },{timestamps:true})

productSchema.index({
    title:'text',
    description:'text'
}, {
    weights:{
        title: 5,
        description: 1
    }
})
/* // OVERIDE TOJSON METHOD TO SERVER ONLY INDEX OF IMAGES
productSchema.methods.toJSON = function(){
    const product = this
    const productObject = product.toObject()

    productObject.images = productObject.images.map((img, i) => i)

    return productObject
} */

const Product = mongoose.model('Product', productSchema)
module.exports = Product