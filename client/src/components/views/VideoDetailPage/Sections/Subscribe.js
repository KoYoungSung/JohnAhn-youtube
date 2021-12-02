import Axios from 'axios'
import React, { useEffect, useState } from 'react'


function Subscribe(props) {


  const [SubscribeNumber, setSubscribeNumber] = useState(0)
  const [Subscribed, setSubscribed] = useState(false)

  useEffect(() => {

    let variable = { userTo: props.userTo }
    Axios.post('/api/subscribe/subscribeNumber', variable)
      .then(response => {
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber)
        } else {
          alert('Failed to get subscriber Number')
        }
      })

    let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId')}

    Axios.post('/api/subscribe/subscribed', subscribedVariable)
      .then(response => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed)
        } else {
          alert('데이터 가져오기 실패')
        }
      })


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <button
        // onClick={onSubscribe}
        style={{
          backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
          borderRadius: '4px', color: 'white',
          padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
        }}>
        {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  )
}

export default Subscribe
