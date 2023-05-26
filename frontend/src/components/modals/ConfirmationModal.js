import React from 'react'
import Modal from '../../UI/Modal'
import { Form } from 'react-router-dom'
export const ConfirmationModal = ({onClose,book,deleteItem,method}) => {
  return (
    <>
        <Modal onClose={onClose}>
            <Form method={method}>
            <div>image</div>
                <div>
                    <h1>Apa Anda Yakin?</h1>
                    <p>Apakah Anda Yakin Ingin Menghapus Pemesanan Buku Anda Yang Berjudul "{book}"</p>
                </div>
                <div>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={deleteItem}>Delete</button>
                </div>

            </Form>
               
        </Modal>
    </>
  )
}
