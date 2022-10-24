import React from 'react'
import { Icon, Col, Card, Row, Carousel} from 'antd';
// 메인페이지 이미지 슬라이더
function ImageSlider(props) {
  return (
    <div>
        <Carousel autoplay>
            {props.images.map((image, index) => (
                <div key={index}>
                    <img style={{ width:'100%', maxHeight:'150px' }}
                    src={`http://localhost:5000/${image}`}  />
                </div>
            ))}
        </Carousel>
    </div>
  )
}

export default ImageSlider