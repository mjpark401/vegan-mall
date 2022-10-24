// 가격 필터
import React, { useState } from 'react'
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;

function RadioBox(props) {  // price 데이터들을 가져옴

  const [Value, setValue] = useState(0) // 라디오 박스를 누를 때 마다 새로운 value로 바뀜

  const renderRadioBox = () => (
    props.list && props.list.map(value => ( // index와 똑같은 값을 key에 넣어줌
      <Radio key={value._id} value={value._id}> {value.name} </Radio>  
    ))
  )

  const handleChange = (event) => {
    setValue(event.target.value)
    props.handleFilters(event.target.value)
  }

  return (
    <div>
        <Collapse defaultActiveKey={['0']}>
          <Panel header="가격" key="1">

          <Radio.Group onChange={handleChange} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
          
      
          </Panel>
        </Collapse>
    </div>
  )
}

export default RadioBox