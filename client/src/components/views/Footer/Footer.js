import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '200px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
        <p>Veganism</p>
        <p>저작권은 해당 페이지에 있습니다. </p>
        <p>멜릭서 : https://kr.melixirskincare.com/product/list.html?cate_no=72</p>
        <p>디어달리아 : https://www.deardahlia.kr/index.html</p>
        <p>더브레드블루 : https://thebreadblue.com/product/list.html?cate_no=44</p>
        <p>닥터독 : https://www.okdoctordog.com/index.html</p>
        </div>
    )
}

export default Footer
