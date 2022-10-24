import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
      // 누른 것의 Index를 구하고 전체 Checked된 State에서 현재 누른 체크박스가 이미 있다면

      const currentIndex = Checked.indexOf(value) // 누른 것의 Index
      const newChecked = [...Checked]     // 전체 checked된 State
      if(currentIndex === -1) {
        // value가 없는 것 State을 넣어준다
        newChecked.push(value)

      } else {
        newChecked.splice(currentIndex, 1)  // 빼준다
      }

      // 빼주고 없다면 State에 넣어준다
      setChecked(newChecked)
      props.handleFilters(newChecked)   // 부모 컴포넌트에 전달(필터의 아이디가 담겨져 있는 배열을)

    }
    const renderCheckboxLists = ( ) => props.list && props.list.map((value, index) => (
        <React.Fragment key={index} >
            <Checkbox onChange={() => handleToggle(value._id)} 
            checked={Checked.indexOf(value._id) === -1 ? false : true} />
                <span>{value.name}</span>
        </React.Fragment>
    ))
  return (
    <div>
        <Collapse defaultActiveKey={['0']}>
          <Panel header="종류" key="1">
        
            {renderCheckboxLists()}
      
          </Panel>
        </Collapse>
    </div>
  )
}

export default CheckBox