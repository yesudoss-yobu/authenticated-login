import React from 'react'
import styled from 'styled-components'

const Alert = styled.div`
.backdrop {
    background-color: rgba(0, 0, 0, 0.1);
    height: 100vh;
    width:100vw;
    top: 0%;
    left: 0%;
    right: 0%;
    bottom:0%;
    position:absolute;
    
  }
  
`

const AlertDrop = () => {
  return (
    <Alert>
    <div className='backdrop'></div>
    </Alert>
  )
}

export default AlertDrop