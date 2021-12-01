import React, { useState } from 'react'
import { Typography, Button, Form,  Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Title } = Typography;

function VideoUploadPage(props) {

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

  const user = useSelector(state => state.user);

  const [VideoTitle, setVideoTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState('영화 & 애니');
  const [FilePath, setFilePath] = useState("")
  const [Duration, setDuration] = useState("")
  const [Thumbnail, setThumbnail] = useState("")

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

  const onSubmit = (event) => {

    event.preventDefault();

    if (user.userData && !user.userData.isAuth) {
      return alert('Please Log in First')
    }

    if (VideoTitle === "" || Description === "" ||
      Category === "" || FilePath === "" ||
      Duration === "" || Thumbnail === "") {
      return alert('Please first fill all the fields')
    }

    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: Thumbnail
    }

    axios.post('/api/video/uploadVideo', variables)
      .then(response => {
        if (response.data.success) {
          alert('video Uploaded Successfully')
          props.history.push('/')
        } else {
          alert('Failed to upload video')
        }
      })

  }

  const onDrop = (files) => {

    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }
    console.log(files)
    formData.append("file", files[0])

    axios.post('/api/video/uploadfiles', formData, config)
      .then(response => {
        if (response.data.success) {

          let variable = {
            filePath: response.data.filePath,
            fileName: response.data.fileName
          }
          setFilePath(response.data.filePath)

          //gerenate thumbnail with this filepath ! 

          axios.post('/api/video/thumbnail', variable)
            .then(response => {
              if (response.data.success) {
                setDuration(response.data.fileDuration)
                setThumbnail(response.data.thumbsFilePath)
              } else {
                alert('Failed to make the thumbnails');
              }
            })


        } else {
          alert('failed to save the video in server')
        }
      })

  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} > Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone
            onDrop={onDrop}
            multiple={false}
            maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: '3rem' }} />

              </div>
            )}
          </Dropzone>
          {Thumbnail !== "" &&
            <div>
              <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
            </div>
          }
        </div>


        <br /><br />
        <label>Title</label>
        <Input
          onChange={onTitleChange}
          value={VideoTitle}
        />

        <br /><br />
        <label>Description</label>
        <TextArea
          onChange={onDescriptionChange}
          value={Description}
        />

        <br /><br />
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.label}>{item.label}</option>
          ))}
        </select>

        <br /><br />

        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.label}>{item.label}</option>
          ))}
        </select>

        <br /><br />

        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>


      </Form>
    </div>
  )
}

export default VideoUploadPage
