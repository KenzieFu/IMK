
import React from 'react'
import Modal from '../../../UI/Modal'
import { useState } from 'react'


const ResettedModal = (props) => {

  return (
    <Modal style={{ padding:"20px" }} onClose ={props.onClose}>
     <div>Form anda telah di reset</div>

     <button onClick={props.onClose}>Nice</button>
    </Modal>
  )
}

export default ResettedModal