import Modal from '../../../UI/Modal'
import React from 'react'
import { Form, json, redirect, useLocation, useNavigate, useNavigation, useSubmit } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import classes from '../../../pages/Admin/adminbatch.module.css';

const notifyDelete = () => toast.success('Berhasil menghapus data!', {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
});
export const DeleteModal = (props) => {
  const location=useLocation();
  const navigate=useNavigate();
  const navigation = useNavigation()
  const submit =useSubmit();

  const isSubmitting = navigation.state === "submitting";

const startDeleteHandler=async(e)=>{

  submit(e.currentTarget,{method:"delete"});
  props.onClose();
  notifyDelete()

}

  return (
    <Modal>
           <Form method='delete' className={classes['form-alert']}>
            <div className={classes['alert-grup']}>
           <input hidden type="number" id='id' name='id' value={props.id} />
           <div style={{marginLeft: "35px"}} >Apa anda yakin ingin menghapus ini ?</div>
           <div className={classes['batchbut1']}>
             <div disabled={isSubmitting} onClick={props.onClose} className={classes['modbut-cel']} >Batalkan</div>
             <button disabled={isSubmitting} onClick={(e)=>startDeleteHandler(e)} className={classes['modbut-del']}>{isSubmitting?"Loading...":"Hapus"}</button>
           </div>
            </div>
         </Form>

    </Modal>
  )
}








