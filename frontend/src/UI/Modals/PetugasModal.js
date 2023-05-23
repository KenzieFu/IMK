import { Fragment } from 'react';
import { createPortal } from 'react-dom';


import classes from './PetugasModal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};



const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};


const portalElement = document.getElementById('overlays');

const PetugasModal = (props) => {
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default PetugasModal;