import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone'

const { TextArea } = Input;
const { Title } = Typography;

function VideoUploadPage() {

  const PrivateOptions = [
    { value: 0, label: "개인" },
    { value: 1, label: "공용" },

  ]
  const CategoryOptions = [
    { value: 0, label: "영화 / 애니" },
    { value: 1, label: "자동차 / 탈것" },
    { value: 2, label: "음악" },
    { value: 3, label: "동물" },
  ]

  const [VideoTitle, setVideoTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState('영화 & 애니');

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value)
  }

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value)
  }
  
  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value)
  }
  
  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value)
  }
  
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form obSubmit>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          {/* 드랍 존 */}
          <Dropzone
            onDrop
            multiple
            maxSize>
            {({ getRootProps, getInputProps }) => (
              <div style={{
                width: '300px', height: '240px', display: 'flex', border: '1px solid lightgray',
                alignItems: 'center', justifyContent: 'center'
              }} {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: '3rem' }} />
              </div>
            )}


          </Dropzone>

          {/* 썸네일  */}
          <div>
            <img src alt />
          </div>

        </div>

        <br />
        <br />
        <label>Title</label>
        <Input
          onChange={onTitleChange}
          value={VideoTitle}
        />

        <br />
        <br />

        <label>Descriptiton</label>
        <TextArea
          onChange={onDescriptionChange}
          value={Description}
        />

        <br />
        <br />

        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.label}>{item.label}</option>
          ))}
        </select>

        <br />
        <br />

        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.label}>{item.label}</option>
          ))}
        </select>

        <br />
        <br />

        <Button type="primary" size="large" onClick>
          Submit
        </Button>


      </Form>
    </div>
  )
}

export default VideoUploadPage
