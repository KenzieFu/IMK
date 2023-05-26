import React from 'react'
import Modal from '../../UI/Modal'

export const ConfirmationModal = ({onClose,book,deleteItem}) => {
  return (
    <>
        <Modal onClose={onClose}>
                <div>image</div>
                <div>
                    <h1>Apa Anda Yakin?</h1>
                    <p>Apakah Anda Yakin Ingin Menghapus Pemesanan Buku Anda Yang Berjudul "{book}"</p>
                </div>
                <div>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={deleteItem}>Delete</button>
                </div>
        </Modal>
    </>
  )
}
