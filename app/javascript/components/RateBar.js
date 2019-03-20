import React from 'react'

function RateBar(props) {
  const rate = 10 / props.rate
  return(
    <div>
      <FontAwesomeIcon icon="star" />
    </div>
  )

}

export default RateBar