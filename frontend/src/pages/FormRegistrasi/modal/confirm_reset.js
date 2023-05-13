
import React from 'react'
import Modal from '../../../UI/Modal'
import { useState } from 'react'


const ConfirmResetModal = (props) => {

  return (
    <Modal style={{ padding:"20px" }} onConfirm={props.onConfirm} onClose ={props.onClose}>
     <div>Yakin ingin me-reset data?{"("}anda harus mwngisi ulang data lagi!{")"}</div>
     <button onClick={props.onConfirm}>Ya</button>
     <button onClick={props.onClose}>Batal</button>
    </Modal>
  )
}

export default ConfirmResetModal