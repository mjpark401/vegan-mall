import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { continents, price } from './Sections/Datas'

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        
        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body)

    }, [])
    // 백엔드에 request
    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success) {
                    if(body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)

                } else {
                    alert("상품들을 가져오는데 실패하였습니다.")
                }
            })


    }

    const loadMoreHandler = () => {
        
        // 더보기 버튼을 눌렀을 때 가지는 skip
        // 처음 더보기일때는 0 + 8 두번째는 8 + 8 ... 
        let skip = Skip + Limit

        let body = {
            skip: Skip,
            limit: Limit,
            loadMore: true,
            filters : Filters
        }

        getProducts(body)
        // skip 상태 저장
        setSkip(skip)
       
    }

    const renderCards = Products.map((product, index) => {
        
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                
                cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images} /></a>}
            >
                <Meta 
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col> 
    })

    const showFilteredResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)

    }

    const handlePrice = (value) => {
        const data = price; // 전체 가격 데이터
        let array = [];

        for (let key in data) {

            if(data[key]._id === parseInt(value, 10)) {     // value=filters =>id와 누른것이 같다면
                array = data[key].array;
            } 
        }
        return array;
    }

    const handleFilters = (filters, category) => {

        const newFilters = {...Filters }
        
        newFilters[category] = filters    // continents 혹은 price

        if(category === "price" ) {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues  
        }


        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {
        
        
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm 
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)


    }

    return (
        <div style={{ width: '75%', margin: '3rem auto'}}>

            <div style={{ textAlign: 'center'}}>
                <h2>비건몰 <Icon type="rocket" /></h2>
            </div>

            {/* 필터 */ }

            <Row gutter={[16, 16]}>

                <Col lg={12} xs={24}>

                    {/* 체크박스 */}

                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
                </Col>

                <Col lg={12} xs={24}>

                    {/* 라디오박스 */}

                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                </Col>

            </Row>
            
            {/* 검색 */ }

            <div style={{ display:'flex', justifyContent:'flex-end', margin: '1rem auto' }}>
                <SearchFeature 
                    refreshFunction={updateSearchTerm}
                />
            </div>

            {/* 카드 */ }
            
            <Row gutter={[16,16]}> 
                {renderCards}
            </Row>
            <br />


        {PostSize >= Limit && 
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>
        }

            
        </div>
    )
}

export default LandingPage
