import React, { useState, useRef, useEffect } from 'react'
import { Sidebar } from '../../UI/Sidebar';
import { useForm, useController } from 'react-hook-form';
import classes from './regristrationForm.module.css'
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useAppState } from '../../hooks/save-input';
import Stepper from 'react-stepper-horizontal'
import ConfirmResetModal from './modal/confirm_reset';
import ResettedModal from './modal/resetted';

const goldarOpsi = [

    { value: "A", label: "A" },
    { value: "O", label: "O" },
    { value: "B", label: "B" },
    { value: "AB", label: "AB" },
]


export const DataKesehatan = (props) => {

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }

    const { state, setState } = useAppState();
    const { steps } = useAppState();
    const { ada_penyakit, setAdaPenyakit } = useAppState();
    const { ada_cacat, setAdaCacat } = useAppState();

    const activeStep = 1
    const navigate = useNavigate();

    const schema = yup.object().shape({
         goldar: yup.string().required("Wajib diisi"),
         berat_badan: yup.number().typeError('Wajib diisi').positive("Mohon input angka yang valid").required("Wajib diisi"),
         tinggi_badan: yup.number().typeError('Wajib diisi').positive("Mohon input angka yang valid").required("Wajib diisi"),
    })

    const { register, control, handleSubmit, reset, formState, } = useForm({
        defaultValues: state,
        mode: "all",
        resolver: yupResolver(schema)
    });

    const { field: { value: goldarValue, onChange: selectGoldarChangeHandler, ...restGoldarField } } = useController({ name: 'goldar', control });

    const { errors } = formState;

    const [showConfirm, setShowConfirm] = useState(false);

    const closeConfirmModal = () => {
        setShowConfirm(false);
    }

    const showConfirmModal = () => {
        setShowConfirm(true);
    }

    const [isResetted, setIsResetted] = useState(false)

    const resetFormHandler = () => {
        setShowConfirm(false)

        reset({
            goldar: '',
            berat_badan: '',
            tinggi_badan: '',
            penyakit: '',
            cacat_jasmani: '',

        });


        setIsResetted(true)
    }

    const closeSubmitModal = () => {
        setIsResetted(false);
    }

    const formSaveHandler = formValues => {
        try {
            setState({ ...state, ...formValues });
            console.log(formValues)
        } catch (error) {
            console.error(error);
        }

        navigate("../data-pendidikan")
    }



    return (

        <React.Fragment>

            <div className={classes.content}>

                <div className={classes.content_inner}>
                <Stepper
                    steps={steps}
                    activeStep={activeStep} />
                    <form onSubmit={handleSubmit(formSaveHandler)}>
                        <div>
                            <span style={{ float: "right", fontWeight: "bold" }}>
                                <span style={{ color: "red" }}>*</span> artinya wajib diisi
                            </span>
                            <h3>B. Keterangan Kesehatan</h3>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.row}>
                                <label htmlFor='goldar'>Golongan Darah</label>
                                <span style={{ color: "red" }}>*</span>
                                <Select  id="goldar" name="goldar" /* defaultValue={goldarOpsi[0]} */ options={goldarOpsi} value={goldarValue ? goldarOpsi.find(x => x.value === goldarValue) : goldarValue} onChange={option => selectGoldarChangeHandler(option ? option.value : option)} {...restGoldarField} />
                                {errors.goldar && <p className={classes.error}>{errors.goldar.message}</p>}
                            </div>
                            <div className={classes.row}>
                                <label htmlFor='berat_badan'>Berat Badan</label>
                                <span style={{ color: "red" }}>*</span>
                                <input step="0.01" style={errors.berat_badan ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="berat_badan" name="beratBadan" type="number" onKeyDown={handleEnter} {...register('berat_badan')}></input>
                                <span>kg </span>
                                {errors.berat_badan && <p className={classes.error}>{errors.berat_badan.message}</p>}
                            </div>
                            <div className={classes.row}>
                                <label htmlFor='tinggi_badan'>Tinggi Badan</label>
                                <span style={{ color: "red" }}>*</span>
                                <input style={errors.tinggi_badan ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="tinggi_badan" name="tinggiBadan" type="number" onKeyDown={handleEnter}  {...register('tinggi_badan')}></input>
                                <span>cm </span>
                                {errors.tinggi_badan && <p className={classes.error}>{errors.tinggi_badan.message}</p>}
                            </div>
                            <label htmlFor='penyakit'>Punya Penyakit yang pernah diderita</label>
                            <input type='checkbox' checked={ada_penyakit} onChange={() => setAdaPenyakit(!ada_penyakit)}></input>
                            {
                                ada_penyakit &&
                                <textarea id="penyakit" name="penyakit" row="4"  {...register('penyakit')}></textarea>
                            }
                            <label htmlFor='cacat'>Punya Cacat Jasmani</label>
                            <input type='checkbox' checked={ada_cacat} onChange={() => setAdaCacat(!ada_cacat)}></input>
                            {ada_cacat &&
                                <textarea id="cacat" name="cacat_jasmani" row="4" {...register('cacat_jasmani')}></textarea>
                            }
                        </div>
                        <div className={classes.button}>
                            <Link to="../data-pribadi">

                                <button className={classes.cancel} type="button" >
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