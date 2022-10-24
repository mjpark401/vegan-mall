const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');
//             Product

//multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) { // 어디에 파일이 저장이 되는지
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}_${file.originalname}`) // 파일 이름을 저장하는 형식
    }
  })
  
  const upload = multer({ storage: storage }).single("file")


router.post('/image',(req, res) => {
    
    // 가져온 이미지를 저장을 해준다.
    upload(req, res, err => {
        if(err) {
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath:res.req.file.path, fileName:res.req.file.filename})
    })   // 백엔드에서 프론트로 파일 저장 정보 전달
    // multer를 사용
})


router.post('/',(req, res) => {
    
  // 받아온 정보들을 DB에 넣어준다.
  const product = new Product(req.body)
  product.save((err) => {
    if(err) return res.status(400).json({ success: false, err})
    return res.status(200).json({ success: true })
  })
})

router.post('/products',(req, res) => {

    // LandingPage에서 skip, limit 받아오기
    // parseInt : 스트링인 경우에 숫자로 바꿔주는 역할

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm

    let findArgs = {};
    for(let key in req.body.filters) {  // key는 continents 아니면 price
      
      if(req.body.filters[key].length > 0) {  // 하나 이상 필터가 설정되어 있으면

      if(key === "price") {
        findArgs[key] = {
          // 가격 필터 설정부분
          $gte: req.body.filters[key][0], // 이것보다 크거나 같고 (몽고디비) => 인덱스 0부분
          $lte: req.body.filters[key][1]  // 이것보다 작거나 같고 (몽고디비) => 인덱스 1부분
        }
      } else {
          findArgs[key] = req.body.filters[key];
      }       

  
      }

    }

    console.log('findArgs', findArgs)

    term

    if(term) {
      
        Product.find(findArgs)
        .find({ $text: {$search: term } })
        .populate("writer") 
        .skip(skip)   
        .limit(limit) 
        .exec((err, productInfo) => {
          if(err) return res.status(400).json({ success: false, err})        
          return res.status(200).json({ 
            success: true, productInfo,
            postSize: productInfo.length 
            })
        })
    } else {
        Product.find(findArgs)
        .populate("writer") // writer의 모든 정보를 가져옴
        .skip(skip)   // 몽고디비에 알려줌
        .limit(limit) // 몽고디비에 알려줌
        .exec((err, productInfo) => {
          if(err) return res.status(400).json({ success: false, err})

        
          return res.status(200).json({ 
            success: true, productInfo,
            postSize: productInfo.length 
            })
          })

    }


    // product collection에 들어 있는 모든 상품정보를 가져오기

})


router.get('/products_by_id',(req, res) => {
    
  let type = req.query.type
  let productIds = req.query.id

  if(type === "array") {

    // id= 12313436, 4858669,3945860 이거를 
    // productIds = ['1840204', '4839690']이렇게 바꿔주기
    let ids = req.query.id.split(',')
    productIds = ids.map(item => {
      return item
    })
  }
  // productId 를 이용해서 DB에서 그 상품에 대한 정보를 가져옴

  Product.find({ _id: {$in:productIds } })
    .populate('writer')
    .exec((err, product) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true, product })
    })
})





module.exports = router;
