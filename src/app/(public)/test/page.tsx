import React from 'react'
import ReactIframe from 'react-iframe';

function Rframe() {
    return (
        <div className='my-96 mx-auto w-full'>
      <ReactIframe
        url="https://blog.openreplay.com/"
        width="900px"
        height="900px"
      />
      </div>
    );
  }
  
  export default Rframe;