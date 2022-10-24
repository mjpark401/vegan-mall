import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import axios from 'axios';
function FileUpload(props) {
  // 상품 업로드 하는 이미지를 state에 저장
  const [Images, setImages] = useState([])

  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: {'content-type' : 'multipart/fomr-data'} 
      // 어떠한 파일인지에 대한 content-type정의해서 이 request를 백엔드에서 받을 때 에러없이 받을 수 있게 해줌
      
   
    }

    formData.append("file", files[0]) // 파일에 대한 정보가 들어감
    
    // front-end에서 파일을 백엔드로 보냄
    axios.post('/api/product/image', formData , config) // 백엔드로 파일 전송 할 때 axios사용
      .then(response => {
        // response안에 정보가 들어있는 것
        if(response.data.success) { // 파일 저장이 성공하면 
            setImages([...Images, response.data.filePath])
            props.refreshFunction([...Images, response.data.filePath])
        } else {
          alert('파일을 저장하는데 실패하였습니다.')
        }
      })
  }
  // 상품 업로드 페이지의 상품 사진을 지움
  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image)
    // 모두 복사를 해줌
    let newImages = [...Images]
    // 사진을 지움
    newImages.splice(currentIndex, 1)
    // 지웠으니 다시 이미지 넣어줌
    setImages(newImages)
    props.refreshFunction(newImages)
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Dropzone onDrop={dropHandler}>
             {({getRootProps, getInputProps}) => (
   
        <div 
            style= {{
                width: 300, height: 240, border: '1px solid lightgray',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            {...getRootProps()}>
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontsize: '3rem' }} />
        </div>
  )}
</Dropzone>

<div style={{ display:'flex', width:'350px', height: '240px', overflowX: 'scroll'}}>
      {Images.map((image, index) => (
        // 클릭하여 이미지를 삭제하기 위해서 onClick 옵션 넣어줌
        <div onClick={()=> deleteHandler(image)}key={index}> 
          <img style={{ minWidth:'300px',width: '300px', height:'240px' }}
              src={`http://localhost:5000/${image}`}
              />
          </div>
      ) )}

</div>
    </div>
  )
}

export default FileUpload