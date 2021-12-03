import Axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

function Comments(props) {
  
  const videoId = props.videoId
  const user = useSelector(state => state.user)
  const [commentValue, setcommentValue] = useState('')


  const handleChange = (event) => {
    setcommentValue(event.currentTarget.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId
    }

    Axios.post('/api/comment/saveComment', variables)
      .then(response => {
        if (response.data.success) {
          console.log(response.data.result)
        } else {
          alert('댓글 저장 오류')
        }
      })
  }



  return (
    <div>
      <br />
      <p> replies</p>
      <hr />
      {/* Comment Lists  */}
      {/* {console.log(props.CommentLists)}

        {props.CommentLists && props.CommentLists.map((comment, index) => (
            (!comment.responseTo &&
                <React.Fragment>
                    <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                    <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                </React.Fragment>
            )
        ))} */}



      {/* Root Comment Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={commentValue}
          placeholder=""
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
      </form>

    </div>
  )
}

export default Comments
