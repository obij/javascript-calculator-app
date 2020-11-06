import React from 'react'

const Display = (props) => {
    return (
        <div>
          <div className= "upper-display">{props.problem}</div>
          <div className= "lower-display" id="display"><span>{props.answer}</span></div>
        </div>
    )
}

export default Display