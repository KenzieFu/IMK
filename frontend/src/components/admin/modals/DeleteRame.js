import Modal from '../../../UI/Modal'
import React from 'react'
import { Form, json, redirect, useLocation, useNavigate, useNavigation, useSubmit } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

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
export const DeleteRame = (props) => {
  const location=useLocation();
  const navigate=useNavigate();
  const navigation = useNavigation()
  const submit =useSubmit();

  const isSubmitting = navigation.state === "submitting";

const startDeleteHandler=async(e)=>{

  props.onDelete()
  props.onClose();

}

  return (
    <Modal>


           <div>Apa Anda Yakin ?</div>
           <div style={{ display:"flex" }}>
             <div disabled={isSubmitting} onClick={props.onClose}>Cancel</div>
             <button disabled={isSubmitting} onClick={(e)=>startDeleteHandler(e)} >{isSubmitting?"Loading...":"Yakin"}</button>
           </div>


    </Modal>
  )
}








