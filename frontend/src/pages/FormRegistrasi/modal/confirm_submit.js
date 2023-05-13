
import React from 'react'
import Modal from '../../../UI/Modal'
import { useState } from 'react'

// const [isSubmitted, setIsSubmitted] = useState(false)

// const Submitted = () =>{
//     return(
//     <Modal>
//         Form anda sudah di submit!
//     </Modal>
// }
const ConfirmModal = (props) => {

  return (
    <Modal style={{ padding:"20px" }} onConfirm={props.onConfirm} onClose ={props.onClose}>
     <div>Sudah yakin dengan data yang diiput?</div>
     <button onClick={props.onConfirm}>Ya</button>
     <button onClick={props.onClose}>Batal</button>
    </Modal>
  )
}

export default ConfirmModal