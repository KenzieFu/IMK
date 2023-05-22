import Modal from '../UI/Modal';
import React from 'react';
import { Form, json, redirect, useLocation, useNavigate, useNavigation, useSubmit } from 'react-router-dom';
import { useAppBooking } from './context/bookingContext';
import { CartProvider, useCart } from "react-use-cart";

export const BookingModals = (props) => {
  const { booking, setBooking } = useAppBooking();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const { addItem } = useCart();

  const startBookingHandler = (e) => {
    setBooking([e]); // Assuming e is the value you want to set for booking
    console.log(e);
    navigation("..");
  };

  return (
    <Modal>
      <Form method="delete">
        <input type="number" id="id" name="id" value={props.id} />
        <div>Apa anda yakin ingin booking buku {props.judulBuku}?</div>
        <div style={{ display: 'flex' }}>
          <button disabled={isSubmitting} onClick={props.onClose}>
            Cancel
          </button>
          <button disabled={isSubmitting} >
            {isSubmitting ? 'Loading...' : 'Yakin'}
          </button>
        </div>
      </Form>
    </Modal>
  );
};