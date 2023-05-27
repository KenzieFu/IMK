import React, { useState, useEffect, useRef } from 'react'
import { useForm, useController, useWatch } from 'react-hook-form';
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

const agamaOpsi = [

    { value: "islam", label: "Islam" },
    { value: "kristen_protestan", label: "Kristen Protestan" },
    { value: "khatolik", label: "Khatolik" },
    { value: "hindu", label: "Hindu" },
    { value: "buddha", label: "Buddha" },
    { value: "konghucu", label: "Konghucu" }

]
//https://restcountries.com/v3.1/name/{name}


const noHPRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const Akteregex = /^\d{4}\/[A-Z]\/\d{4}$/;
export const DataSiswa = () => {


    const { state, setState } = useAppState();
    const { warga_asing, setWargaAsing } = useAppState();
    const { steps } = useAppState();
    const { negaraOpsi } = useAppState();

    console.log(negaraOpsi)

    const activeStep = 0

    const navigate = useNavigate();

    const schema = yup.object().shape({
        // validasi data siswa

        nama_siswa: yup.string().required("Wajib diisi"),

        warga_negara: yup.string().required('Wajib diisi'),

        nik_siswa: yup.string().required("Wajib diisi").matches(/^[0-9]+$/gi, "Input angka yang valid").min(16, "NIK tidak boleh kurang dari 16 digit").max(16, "NIK tidak boleh lebih dari 16 digit"),
        no_akteLahir: yup.string().required("Wajib diisi").matches(Akteregex, "Input Akte Lahir dengan format yang telah dicontohkan"),
        tptLahir: yup.string().required("Wajib diisi"),
        tglLahir: yup.string().required("Wajib diisi"),
        kelamin: yup.string().required("Wajib diisi"),
        agama: yup.string().required("Wajib diisi"),
        anak_ke: yup.number().typeError('Wajib diisi').positive("Mohon input angka yang valid").required("Wajib diisi"),
        jmlh_saudara: yup.number().typeError('Wajib diisi').positive("Mohon input angka yang valid").required("Wajib diisi"),
        alamat_rumah: yup.string().required("Wajib diisi"),
        no_HP_siswa: yup.string().matches(noHPRegex, { message: "Harap input nomor HP yang valid", excludeEmptyString: true }),
        email_siswa: yup.string().email("Harap input alamat email yang valid"),


    })


    const { register, control, handleSubmit, reset, formState, setValue, } = useForm({
        defaultValues: state,
        mode: "all",
        resolver: yupResolver(schema)
    });



    const { field: nikSiswa } = useController({
        name: 'nik_siswa',
        control,
        shouldUnregister: false,
        rules: { required: true },
        defaultValue: '',
    });


    const { field: { value: agamaValue, onChange: selectAgamaChangeHandler, ...restAgamaField } } = useController({ name: 'agama', control });

    const { field: { value: negaraValue, onChange: selectNegaraChangeHandler, ...restNegaraField } } = useController({ name: 'warga_negara', control });

    const [showConfirm, setShowConfirm] = useState(false);

    const closeConfirmModal = () => {
        setShowConfirm(false);
    }

    const showConfirmModal = () => {
        setShowConfirm(true);
    }

    const [isResetted, setIsResetted] = useState(false)

    const { errors } = formState;

    const wargaNegara = useWatch({ control, name: 'warga_negara' })

    const formSaveHandler = (formValues) => {
        setState({ ...state, ...formValues });
        console.log(formValues)
        navigate("../data-kesehatan")
    }

    let pinInputRef = useRef(null);



    const resetFormHandler = () => {
        setShowConfirm(false)
        reset({
            nama_siswa: '',
            nik_siswa: '',
            no_akteLahir: '',
            tptLahir: '',
            tglLahir: '',
            kelamin: '',
            agama: '',
            anak_ke: '',
            jmlh_saudara: '',
            alamat_rumah: '',
            no_HP_siswa: '',
            email_siswa: '',
        });

        pinInputRef.current.clear();
        setIsResetted(true)
    }
    const closeSubmitModal = () => {
        setIsResetted(false);
    }
    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();


        }
    }


    console.log(warga_asing)
    console.log(negaraOpsi[0])

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
                            <h3>A. Keterangan Data Pribadi</h3>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.block}>
                                <label htmlFor='nama'>Nama Lengkap</label>
                                <span style={{ color: "red" }}>*</span>
                                <input style={errors.nama_siswa ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="nama" type="text" {...register('nama_siswa')} onKeyDown={handleEnter}></input>
                                {errors.nama_siswa && <p className={classes.error}>{errors.nama_siswa.message}</p>}
                            </div>
                            <div>
                                <label htmlFor='nik'>NIK Siswa</label>
                                <span style={{ color: "red" }}>*</span>
                                <div className={classes.row}>
                                    <PinInput
                                        style={{ paddingRigth: "10px", paddingBottom: "10px", paddingTop: "10px" }}
                                        inputStyle={errors.nik_siswa ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" } : { border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" }}
                                        inputFocusStyle={{ borderColor: 'blue' }}
                                        name="nik_siswa"
                                        ref={pinInputRef}
                                        length={16} // Specify the desired length of the PIN
                                        type="numeric" // Specify the input type
                                        initialValue={nikSiswa.value}
                                        onChange={nikSiswa.onChange}
                                        inputMode="number"
                                        onBlur={() => nikSiswa.onBlur()}
                                        onKeyDown={handleEnter}
                                    />
                                </div>
                                {errors.nik_siswa && <p className={classes.error}>{errors.nik_siswa.message}</p>}
                            </div>
                            <div>
                                <label htmlFor='akteLahir'>No. Akte Lahir</label>
                                <span style={{ color: "red" }}>*</span>
                                {/* <p style={{padding: "0", color:"grey", fontSize: "10px"}}>Cth: 2075/K/2004</p> */}
                                <div className={classes.row}>
                                    <input placeholder="Cth: 2075/K/2004" style={errors.no_akteLahir ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="nama" type="text" {...register('no_akteLahir')} onKeyDown={handleEnter}></input>
                                </div>
                                {errors.no_akteLahir && <p className={classes.error}>{errors.no_akteLahir.message}</p>}
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='tpt_lahir'>Tempat, tanggal lahir</label>
                                <span style={{ color: "red" }}>*</span>
                            </div>
                            <div className={classes.row}>
                                <input style={errors.tptLahir ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} name="tptLahir" type="text" {...register('tptLahir')} id="TextInput" onKeyDown={handleEnter}></input>
                                <span>, </span>
                                <input id="tgl_lahir" name="tglLahir" type="date" {...register('tglLahir')} ></input>
                            </div>
                            {errors.tptLahir && errors.tglLahir && <p className={classes.error}>{errors.tpt_lahir_ayah.message}</p>}
                            <div className={classes.block}>
                                <label htmlFor='kelamin'>Jenis Kelamin</label>
                                <span style={{ color: "red" }}>*</span>
                            </div>
                            <div className={classes.row}>
                                <label htmlFor='laki'>Laki-laki</label>
                                <input id="laki" name="kelamin" type="radio" value="Laki-laki" {...register('kelamin')}></input>
                                <label htmlFor='perempuan'>Perempuan</label>
                                <input id="perempuan" name="kelamin" type="radio" value="Perempuan" {...register('kelamin')}></input>
                            </div>
                            {errors.kelamin && <p className={classes.error}>{errors.kelamin.message}</p>}
                            <div className={classes.block}>
                                <div style={{ width: '400px' }}>
                                    <label htmlFor='agama'>Agama</label>
                                    <span style={{ color: "red" }}>*</span>
                                    <Select id="agama" name="agama" options={agamaOpsi} value={agamaValue ? agamaOpsi.find(x => x.value === agamaValue) : agamaValue} onChange={option => selectAgamaChangeHandler(option ? option.value : option)} {...restAgamaField} onKeyDown={handleEnter} />
                                    {errors.agama && <p className={classes.error}>{errors.agama.message}</p>}
                                </div>
                                <label htmlFor='warga_negara'>Warga Negara</label>
                                <span style={{ color: "red" }}>*</span>
                                <div className={classes.row}>
                                        <div>
                                            <Select defaultValue="Pilih Warga Negara" options={negaraOpsi}  value={negaraValue ? negaraOpsi.find(x => x.value === negaraValue) : negaraValue} onChange={option => selectNegaraChangeHandler(option ? option.value : option)} {...restNegaraField} onKeyDown={handleEnter} />
                                            {errors.warga_negara && <p className={classes.error}>{errors.warga_negara.message}</p>}
                                        </div>
                                </div>
                                <div className={classes.row}>
                                    <label htmlFor='anak_ke'>Anak Ke-</label>
                                    <span style={{ color: "red" }}>*</span>
                                    <input style={errors.anak_ke ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "50px" } : { width: "50px" }} id="anak_ke" name="anak_ke" min="0" type="number" {...register('anak_ke')} onKeyDown={handleEnter}></input>
                                    {errors.anak_ke && <p className={classes.error}>{errors.anak_ke.message}</p>}
                                </div>
                                <div className={classes.row}>
                                    <label htmlFor='jmlh_saudara'>Jumlah Saudara Kandung</label>
                                    <span style={{ color: "red" }}>*</span>
                                    <input style={errors.jmlh_saudara ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "50px" } : { width: "50px" }} id="jmlh_saudara" name="jmlh_saudara" type="number" {...register('jmlh_saudara')} onKeyDown={handleEnter}></input>
                                    {errors.jmlh_saudara && <p className={classes.error}>{errors.jmlh_saudara.message}</p>}
                                </div>
                                <div className={classes.block}>
                                    <label htmlFor='alamat'>Alamat Tempat Tinggal</label>
                                    <span style={{ color: "red" }}>*</span>
                                    <textarea style={errors.alamat_rumah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="nama" type="text" {...register('alamat_rumah')} name="alamat_rumah" row="4" {...register('alamat_rumah')} onKeyDown={handleEnter}></textarea>
                                    {errors.alamat_rumah && <p className={classes.error}>{errors.alamat_rumah.message}</p>}
                                </div>
                                <div className={classes.block}>
                                    <label htmlFor='no_hp'>No.HP/Whatsapp</label>
                                    <input style={errors.no_HP_siswa ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="no_hp" name="no_HP_siswa" type="number" {...register('no_HP_siswa')} onKeyDown={handleEnter}></input>
                                    {errors.no_HP_siswa && <p className={classes.error}>{errors.no_HP_siswa.message}</p>}
                                </div>
                                <div className={classes.block}>
                                    <label htmlFor='email'>Email</label>
                                    <input style={errors.email_siswa ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="email" name="email_siswa" type="email" {...register('email_siswa')}></input>
                                    {errors.email_siswa && <p className={classes.error}>{errors.email_siswa.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className={classes.button}>
                            <Link to="../..">
                                <button className={classes.cancel1} type="button">
                                    {"<"} Batalkan
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
