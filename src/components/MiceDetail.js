import React from 'react'

const MiceDetail = (props) => {
    const {fromRow} = props.location.state
  return (
    <div>
        {console.log(fromRow)}
        Hello
    </div>
  )
}

export default MiceDetail

