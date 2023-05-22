import React from 'react'
import Modal from "../../UI/Modal"
export const ErrorModal = ({onClose,message}) => {

  return (
    <>
      <Modal onClose={onClose}>
      <div> Gambar</div>
      <p>{message.message}</p>
      <button onClick={onClose}>Close</button>
      </Modal>
    </>
  )
}
