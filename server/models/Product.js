const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold : { // 얼마나 팔렸는지
        type: Number,
        maxlength: 100,
        default: 0
    },
    continents: {
        type: Number,
        default: 1
    },
    views: { // 사람들이 얼마나 봤는지
        type: Number,
        default: 0
    }

}, { timestamps: true})

// 검색하려는 단어가 상품의 제목과 설명에 들어있는 단어로 검색이 되게 함
productSchema.index({
    title:'text',
    description:'text'
}, {
    weights:{
        title:5,
        description: 1
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }