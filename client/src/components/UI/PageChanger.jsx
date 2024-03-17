import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

import React from 'react'

export default  function PageChanger() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-80 z-50">
        <ClimbingBoxLoader color="#36d7b7" />
    </div>
  )
}
