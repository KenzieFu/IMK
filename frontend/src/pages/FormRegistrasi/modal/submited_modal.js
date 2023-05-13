
import React from 'react'
import Modal from '../../../UI/Modal'
import { useState } from 'react'


const SubmittedModal = (props) => {

  return (
    <Modal style={{ padding:"20px" }} onClose ={props.onClose}>
     <div>Form anda telah di submit</div>

     <button onClick={props.onClose}>Nice</button>
    </Modal>
  )
}

export default SubmittedModal