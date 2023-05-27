import React from 'react'
import Modal from '../../UI/Modal'
import { Form } from 'react-router-dom'
import classes from '../BookKembali.module.css';

export const ConfirmationModal = ({onClose,book,deleteItem,method}) => {
  return (
    <>
        <Modal onClose={onClose}>
            <Form method={method}>
            <div><i class="fa fa-times" style={{color: "#Df5656", fontSize: "20px"}}  aria-hidden="true"></i></div>
                <div className={classes['form']}>
                    <h4>Apa Anda Yakin?</h4>
                    <p>Apakah Anda Yakin Ingin Menghapus Pemesanan Buku Anda Yang Berjudul "{book}"</p>
                </div>
                <div className={classes['batchbut1']}>
                    <button onClick={onClose} className={classes['modbut-cel']}>Cancel</button>
                    <button onClick={deleteItem} className={classes['modbut-del']}>Hapus</button>
                </div>

            </Form>
               
        </Modal>
    </>
  )
}
