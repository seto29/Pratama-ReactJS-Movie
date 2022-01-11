import React from 'react'
import BeatLoader from 'react-spinners/BeatLoader';

const Loader = () => {

  return (
      <div style={{textAlign:'center', marginTop:'5%', marginBottom:'5%'}}>
          <BeatLoader loading={true} size={25} color="gray"/>
      </div>
  )
}

export default Loader
