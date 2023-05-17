import React, { useState, useEffect } from 'react'
import { Sidebar } from '../../UI/Sidebar';
import { useForm, useController } from 'react-hook-form';
import classes from './regristrationForm.module.css'
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import PinInput from 'react-pin-input';
import { useNavigate, Link } from "react-router-dom";
import { useAppState } from '../../hooks/save-input';
import Stepper from 'react-stepper-horizontal'
import ConfirmResetModal from './modal/confirm_reset';
import ResettedModal from './modal/resetted';


export const DataPendidikan = () => {

    const { state, setState } = useAppState();
    const { steps } = useAppState();

    const navigate = useNavigate();

    const activeStep = 2

    const schema = yup.object().shape({
        nisn: yup.string().required("Wajib diisi").matches(/^[0-9]+$/gi, "Input angka yang valid").min(10, "NIK tidak boleh kurang dari 10 digit").max(10, "NIK tidak boleh lebih dari 10 digit"),
        sklh_lama: yup.string().required("Wajib diisi"),
        no_ijazah: yup.string().required("Wajib diisi"),
        diterima: yup.string().required("Wajib diisi"),
        tgl_ijazah: yup.string().required("Wajib diisi"),
    })

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();

        }
    }

    const { register, control, handleSubmit, reset, formState, } = useForm({
        defaultValues: state,
        mode: "all",
        resolver: yupResolver(schema)
    });

    const [showConfirm, setShowConfirm] = useState(false);

    const closeConfirmModal = () => {
        setShowConfirm(false);
    }

    const showConfirmModal = () => {
        setShowConfirm(true);
    }

    const [isResetted, setIsResetted] = useState(false)


    const { errors } = formState;


    const formSubmitHandler = formValues => {
        try {
            setState({ ...state, ...formValues });
        } catch (error) {
            console.error(error);
        }
        navigate("../data-ayah")
    }

    const resetFormHandler = () => {
        setShowConfirm(false)
        reset({
            nisn: '',
            sklh_lama: '',
            no_ijazah: '',
            diterima: '',
            tgl_ijazah: '',

        });


        setIsResetted(true)
    }
    const closeSubmitModal = () => {
        setIsResetted(false);
    }

    return (
        <React.Fragment>
            <div className={classes.content}>

                <div className={classes.content_inner}>
                    <Stepper
                        steps={steps}
                        activeStep={activeStep} />
                    <form onSubmit={handleSubmit(formSubmitHandler)}>
                        <div>
                            <span style={{ float: "right", fontWeight: "bold" }}>
                                <span style={{ color: "red" }}>*</span> artinya wajib diisi
                            </span>
                            <h3>C. Keterangan Pendidikan</h3>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.block}>
                                <label htmlFor='nisn'>NISN Siswa</label>
                                <span style={{ color: "red" }}>*</span>
                                <input style={errors.nisn ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="nisn" name="nisn" type="number" {...register('nisn')} onKeyDown={handleEnter}></input>
                                {errors.nisn && <p className={classes.error}>{errors.nisn.message}</p>}
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='sklh_lama'>Nama Sekolah Lama</label>
                                <span style={{ color: "red" }}>*</span>
                                <input style={errors.sklh_lama ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="sklh_lama" name="sklh_lama" type="text" {...register('sklh_lama')} onKeyDown={handleEnter}></input>
                                {errors.sklh_lama && <p className={classes.error}>{errors.sklh_lama.message}</p>}
                            </div>
                            <div className={classes.row}>
                                <label htmlFor='diterima'>Diterima di sekolah ini di kelas</label>
                                <span style={{ color: "red" }}>*</span>
                                <input style={errors.diterima ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="diterima" name="diterima" type="text" {...register('diterima')} onKeyDown={handleEnter}></input>
                                {errors.diterima && <p className={classes.error}>{errors.diterima.message}</p>}
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='no_ijazah'>No. Ijazah Terakhir</label>
                                <span style={{ color: "red" }}>*</span>
                                <input style={errors.no_ijazah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="no_ijazah" name="no_ijazah" type="text" {...register('no_ijazah')} onKeyDown={handleEnter}></input>
                                {errors.no_ijazah && <p className={classes.error}>{errors.no_ijazah.message}</p>}
                            </div>
                            <div className={classes.row}>
                                <label htmlFor='tgl_ijazah'>Tanggal Penerbitan Ijazah Terakhir</label>
                                <span style={{ color: "red" }}>*</span>
                                <input id="tgl_ijazah" name="tgl_ijazah" type="date" label="Tanggal Penerbitan Ijazah Terakhir" {...register('tgl_ijazah')}></input>
                                {errors.tgl_ijazah && <p className={classes.error}>{errors.tgl_ijazah.message}</p>}
                            </div>
                        </div>
                        <div className={classes.button}>
                            <Link to="../data-kesehatan">
                                <button className={classes.cancel} type='button'>
                                    {"<"} Sebelumnya
                                </button>
                            </Link>
                            <button className={classes.reset} type="button" onClick={showConfirmModal}>Reset</button>
                            {showConfirm && <ConfirmResetModal onConfirm={resetFormHandler} onClose={closeConfirmModal} />}
                            {isResetted && <ResettedModal onClose={closeSubmitModal} />}
                            <button className={classes.submit} type="submit" disabled={!formState.isValid}>Selanjutnya {">"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}