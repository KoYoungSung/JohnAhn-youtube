import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comments';


function VideoDetailPage(props) {


  const videoId = props.match.params.videoId
  const [Video, setVideo] = useState([])

  const videoVariable = {
    videoId: videoId
  }

  useEffect(() => {
    axios.post('/api/video/getVideo', videoVariable)
      .then(response => {
        if (response.data.success) {
          console.log(response.data.video)
          setVideo(response.data.video)
        } else {
          alert('Failed to get video Info')
        }
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (Video.writer) {

    const subscribeBtn = Video.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
            <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

            <List.Item

              actions={[subscribeBtn]}

            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                title={<a href="https://ant.design">{Video.title}</a>}
                description={Video.description}
              />
              <div></div>
            </List.Item>

            <Comment postId={videoId} />

          </div>
        </Col>
        <Col lg={6} xs={24}>

          <SideVideo />

        </Col>
      </Row>
    )

  } else {
    return (
      <div>Loading...</div>
    )
  }


}

export default VideoDetailPage

