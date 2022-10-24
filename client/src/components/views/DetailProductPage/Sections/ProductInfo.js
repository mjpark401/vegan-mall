import React from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

function ProductInfo(props) {

    const dispatch = useDispatch();

    const clickHandler = () => {
   
        // 필요한 정보를 Cart 필드 에다가 넣어줌
        // 상품에 대한 아이디, 개수, 카트에 넣은 시간
        dispatch(addToCart(props.detail._id))


        // 리덕스를 활용하여 카트 처리
       
    }



  return (
    <div>
<Descriptions title="Product Info">
    <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
    <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
    <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
    <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
  </Descriptions>


  <br />
  <br />
  <br />
  <div style={{ display:'flex', justifyContent: 'center'}}>
    <Button size="large" shape="round" type="danger" onClick={clickHandler}>
        Add to Cart
    </Button>


  </div>
    </div>
  )
}

export default ProductInfo