
import React, { useState, useEffect, useRef } from 'react'
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


const agamaOpsi = [

    { value: "islam", label: "Islam" },
    { value: "kristen_protestan", label: "Kristen Protestan" },
    { value: "khatolik", label: "Khatolik" },
    { value: "hindu", label: "Hindu" },
    { value: "buddha", label: "Buddha" },
    { value: "konghucu", label: "Konghucu" }

]
const pendidikanOpsi = [
    {value: "SD", label: "SD"},
    {value: "SMP", label: "SMP"},
    {value: "SMA/SMK", label: "SMA/SMK"},
    {value: "Diploma 1", label: "Diploma 1"},
    {value: "Diploma 2", label: "Diploma 2"},
    {value: "Diploma 3", label: "Diploma 3"},
    {value: "Sarjana 1", label: "Sarjana 1"},
    {value: "Sarjana 2", label: "Sarjana 2"},
    {value: "Sarjana 3", label: "Sarjana 3"},
]


const rangeGajiOpsi = [
    {value: "Rp.0 - Rp.4.000.000", label:"Rp.0 - Rp.4.000.000"},
    {value: "Rp. 4.000.000 - 10.000.000", label:"Rp. 4.000.000 - 10.000.000"},
    {value: "Rp. 10.000.000 - 15.000.000", label:"Rp. 10.000.000 - 15.000.000"},
    {value: "Rp. 15.000.000 - 20.000.000", label:"Rp. 15.000.000 - 20.000.000"},
    {value: "Lebih dari Rp. 20.000.000", label:"Lebih dari Rp. 20.000.000"},
]

const pekerjaanOrtuOpsi = [

    {value: "Petani", label: "Petani"},
    {value: "Peternak", label: "Peternak"},
    {value: "Guru", label: "Guru"},
    {value: "Dosen", label: "Dosen"},
    {value: "Pegawai Swasta", label: "Pegawai Swasta"},
    {value: "Pedagang", label: "Pedagang"},
    {value: "Dokter", label: "Dokter"},
    {value: "Politikus", label: "Politikus"},
    {value: "Wiraswasta", label: "Wiraswasta"},
    {value: "Buruh", label: "Buruh"},
    {value: "Rumah Tangga", label: "Rumah Tangga"},
    {value: "Seniman", label: "Seniman"},
    {value: "PNS", label: "PNS"},
    {value: "Polisi", label: "Polisi"},
    {value: "Tentara", label: "Tentara"},
    {value: "Artis", label: "Artis"},
    {value: "Lainnya", label: "Lainnya"},

]
//https://restcountries.com/v3.1/name/{name}


const noHPRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const DataWali = () => {

    const {state, setState} = useAppState();
    const {ada_wali, setAdaWali} = useAppState()
    const { warga_asingWali, setWargaAsingWali } = useAppState();
    const { steps } = useAppState();
    const { negaraOpsi } = useAppState();

    const activeStep = 5

    const navigate = useNavigate();

    const schema = yup.object().shape({
        ada_wali: yup.boolean(),
        nama_wali: yup.string().when("ada_wali", {
            is: false,
            then: () => yup.string().required('Wajib diisi'),
            otherwise: () => yup.string()
        }),
        nik_wali: yup.string().matches().when("ada_wali", {
            is: false,
            then: () => yup.string().required("Wajib diisi").matches(/^[0-9]+$/gi, "Input angka yang valid").min(16, "NIK tidak boleh kurang dari 16 digit").max(16, "NIK tidak boleh lebih dari 16 digit"),
            otherwise: () => yup.string()
        }),
        tpt_lahir_wali: yup.string().when("ada_wali", {
            is: false,
            then: () => yup.string().required('Wajib diisi'),
            otherwise: () => yup.string()
        }),
        tgl_lahir_wali: yup.string().when("ada_wali", {
            is: false,
            then: () => yup.string().required('Wajib diisi'),
            otherwise: () => yup.string()

        }),
        agama_wali: yup.string().when("ada_wali", {
            is: false,
            then: () => yup.string().required('Wajib diisi'),
            otherwise: () => yup.string()

        }),
        warga_negara_wali: yup.string().when("ada_wali", {
            is: false,
            then: () => yup.string().required('Wajib diisi'),
            otherwise: () => yup.string()

        }),
        alamat_wali: yup.string().when("ada_wali", {
            is: false,
            then: () => yup.string().required('Wajib diisi'),
            otherwise: () => yup.string()

        }),
        no_HP_wali: yup.string().matches().when("ada_wali", {
            is: false,
            then: () => yup.string().required("Wajib diisi").matches(noHPRegex, { message: "Harap input nomor HP yang valid" }),
            otherwise: () => yup.string()

        }),

        email_wali: yup.string().email().when("ada_wali", {
            is: false,
            then: () => yup.string().email("Harap input alamat email yang valid").required("Wajib diisi"),
            otherwise: () => yup.string()

        }),
        pekerjaan_wali: yup.string().when("ada_wali", {
            is: false,
            then: () => yup.string().required('Wajib diisi'),
            otherwise: () => yup.string()

        }),
        pendidikan_wali: yup.string().when("ada_wali", {
            is: false,
            then: () => yup.string().required('Wajib diisi'),
            otherwise: () => yup.string()

        }),
        penghasilan_wali: yup.string().matches().when("ada_wali", {
            is: false,
            then: () => yup.string().required('Wajib diisi'),
            otherwise: () => yup.string()

        }),
    })

    const { register, control, handleSubmit, reset, formState, setValue} = useForm({
        defaultValues: state,
        mode: "all",
        resolver: yupResolver(schema)
    });

    const { field: nikWali } = useController({
        name: 'nik_wali',
        control,
        shouldUnregister: false,
        rules: { required: true },
        defaultValue: '',
    });

    const { field: { value: agamaWaliValue, onChange: selectAgamaWaliChangeHandler, ...restAgamaWaliField } } = useController({ name: 'agama_wali', control });

    const { field: { value: pendidikanWaliValue, onChange: selectPendidikanWaliChangeHandler, ...restPendidikanWaliField} } = useController({ name: 'pendidikan_wali', control})

    const { field: { value: pekerjaanWaliValue, onChange: selectPekerjaanWaliChangeHandler, ...restPenkerjaanWaliField} } = useController({ name: 'pekerjaan_wali', control})

    const { field: { value: gajiWaliValue, onChange: selectGajiWaliChangeHandler, ...restGajiWaliField} } = useController({ name: 'penghasilan_wali', control})

    const { field: { value: negaraValue, onChange: selectNegaraChangeHandler, ...restNegaraField } } = useController({ name: 'warga_negara_wali', control });

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
        console.log(formValues)
        console.log(ada_wali)
        navigate("../konfirmasi-data")
    }

    let pinInputRef = useRef(null);

    const resetFormHandler = () => {
        setShowConfirm(false)
        reset({
            nama_wali: '',
            nik_wali: '',
            tgl_lahir_wali: '',
            tpt_lahir_wali: '',
            agama_wali: '',
            warga_negara_wali: '',
            alamat_wali: '',
            no_HP_wali: '',
            email_wali: '',
            pekerjaan_wali: '',
            pendidikan_wali: '',
            penghasilan_wali: '',

        });
        setWargaAsingWali(false)
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
    return (
        <React.Fragment>
            <div className={classes.content}>

                <div className={classes.content_inner}>
                    <form onSubmit={handleSubmit(formSubmitHandler)}>
                    <Stepper
                    steps={steps}
                    activeStep={activeStep} />
                        <div>
                            <span style={{ float: "right", fontWeight: "bold" }}>
                                <span style={{ color: "red" }}>*</span> artinya wajib diisi
                            </span>
                            <h3>F. Keterangan Wali</h3>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.row}>
                                <label htmlFor='wali_ortu'>Tidak ada wali</label>
                                <input id="wali_ortu" type="checkbox"
                                    checked={ada_wali}
                                    {...register("ada_wali")}  onChange={() => setAdaWali(!ada_wali)}></input>
                            </div>
                            {!ada_wali &&
                                <div>
                                    <div className={classes.block}>
                                        <label htmlFor='nama_ayah'>Nama Lengkap Wali</label>
                                        <span style={{ color: "red" }}>*</span>
                                        <input style={errors.nama_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="nama_wali" name="nama_wali" type="text" {...register('nama_wali')}></input>
                                        {errors.nama_wali && <p className={classes.error}>{errors.nama_wali.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor='nik'>NIK Wali</label>
                                        <span style={{ color: "red" }}>*</span>
                                        <div className={classes.row}>
                                        <PinInput
                                        style={{ paddingRigth: "10px", paddingBottom: "10px", paddingTop: "10px" }}
                                        inputStyle={errors.nik_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" } : { border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" }}
                                        inputFocusStyle={{ borderColor: 'blue' }}
                                        name="nik_wali"
                                        ref={pinInputRef}
                                        length={16} // Specify the desired length of the PIN
                                        type="numeric" // Specify the input type
                                        initialValue={nikWali.value}
                                        onChange={nikWali.onChange}
                                        inputMode="number"
                                        onBlur={() => nikWali.onBlur()}
                                        onKeyDown={handleEnter}
                                    />
                                        </div>
                                        {errors.nik_wali && <p className={classes.error}>{errors.nik_wali.message}</p>}
                                    </div>
                                    <div className={classes.row}>
                                        <label htmlFor='tpt_lahir_wali'>Tempat, Tanggal lahir </label>
                                        <span style={{ color: "red" }}>*</span>
                                        <input style={errors.tpt_lahir_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="tpt_lahir_wali" name="tpt_lahir_wali" type="text" {...register('tpt_lahir_wali')}></input>
                                        <span>, </span>
                                        <input id="tgl_lahir_wali" name="tgl_lahir_wali" type="date" {...register('tgl_lahir_wali')}></input>
                                        {errors.tpt_lahir_wali && errors.tgl_lahir_wali && <p className={classes.error}>{errors.tpt_lahir_wali.message}</p>}
                                    </div>
                                    <div className={classes.row}>
                                        <label htmlFor='agama_wali'>Agama</label>
                                        <span style={{ color: "red" }}>*</span>
                                        <Select id="agama" name="agama_wali" options={agamaOpsi} value={agamaWaliValue ? agamaOpsi.find(x => x.value === agamaWaliValue) : agamaWaliValue} onChange={option => selectAgamaWaliChangeHandler(option ? option.value : option)} {...restAgamaWaliField} />
                                        {errors.agama_wali && <p className={classes.error}>{errors.agama_wali.message}</p>}
                                    </div>
                                    <div className={classes.block}>
                                <label htmlFor='warga_negara_wali'>Warga Negara</label>
                                <span style={{ color: "red" }}>*</span>
                                <div className={classes.row}>
                                        <div>
                                            <Select defaultValue="Pilih Warga Negara" options={negaraOpsi}  value={negaraValue ? negaraOpsi.find(x => x.value === negaraValue) : negaraValue} onChange={option => selectNegaraChangeHandler(option ? option.value : option)} {...restNegaraField} onKeyDown={handleEnter} />
                                            {errors.warga_negara_wali && <p className={classes.error}>{errors.warga_negara_wali.message}</p>}
                                        </div>
                                </div>
                            </div>
                                    <div className={classes.block}>
                                <label htmlFor='pendidikan_wali'>Pendidikan</label>
                                <span style={{ color: "red" }}>*</span>
                                <Select id="pendidkan" name="pendidkan_wali" options={pendidikanOpsi} value={pendidikanWaliValue ? pendidikanOpsi.find(x => x.value === pendidikanWaliValue) : pendidikanWaliValue} onChange={option => selectPendidikanWaliChangeHandler(option ? option.value : option)} {...restPendidikanWaliField} />
                                {errors.pendidikan_wali && <p className={classes.error}>{errors.pendidikan_wali.message}</p>}
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='pekerjaan_wali'>Pekerjaan</label>
                                <span style={{ color: "red" }}>*</span>
                                <Select id="pekerjaan" name="pekerjaan_wali" options={pekerjaanOrtuOpsi} value={pekerjaanWaliValue ? pekerjaanOrtuOpsi.find(x => x.value === pekerjaanWaliValue) : pekerjaanWaliValue} onChange={option => selectPekerjaanWaliChangeHandler(option ? option.value : option)} {...restPenkerjaanWaliField} />
                                {errors.pekerjaan_wali && <p className={classes.error}>{errors.pekerjaan_wali.message}</p>}
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='penghasilan_wali'>Penghasilan per-bulan Wali</label>
                                <span style={{ color: "red" }}>*</span>
                                <Select id="penghasilan" name="penghasilan_wali" options={rangeGajiOpsi} value={gajiWaliValue ? rangeGajiOpsi.find(x => x.value === gajiWaliValue) : gajiWaliValue} onChange={option => selectGajiWaliChangeHandler(option ? option.value : option)} {...restGajiWaliField} />
                                {errors.penghasilan_wali && <p className={classes.error}>{errors.penghasilan_wali.message}</p>}
                            </div>
                                    <label htmlFor='alamat_wali'>Alamat</label>
                                    <span style={{ color: "red" }}>*</span>
                                    <textarea style={errors.alamat_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="alamat_wali" name="alamat_wali" row="" {...register('alamat_wali')}></textarea>
                                    {errors.alamat_wali && <p className={classes.error}>{errors.alamat_wali.message}</p>}
                                    <div className={classes.block}>
                                        <label htmlFor='noHP_wali'>No.HP/Whatsapp</label>
                                        <span style={{ color: "red" }}>*</span>
                                        <input style={errors.no_HP_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="noHP_wali" name="no_HP_wali" type="number" label="No.HP/Whatsapp" {...register('no_HP_wali')}></input>
                                        {errors.no_HP_wali && <p className={classes.error}>{errors.no_HP_wali.message}</p>}
                                    </div>
                                    <div className={classes.block}>
                                        <label htmlFor='email_wali'>Email</label>
                                        <input style={errors.email_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="email_wali" name="email_wali" type="email" label="Email" {...register('email_wali')}></input>
                                        {errors.email_wali && <p className={classes.error}>{errors.email_wali.message}</p>}
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={classes.button}>
                        <Link to="../data-ibu">
                            <button className={classes.cancel}>
                                    {"<"} Sebelumnya
                            </button>
                            </Link>
                            <button className={classes.reset} type="button" onClick={showConfirmModal}>Reset</button>
                            {showConfirm && <ConfirmResetModal onConfirm={resetFormHandler} onClose={closeConfirmModal} />}
                            {isResetted && <ResettedModal onClose={closeSubmitModal} />}
                            <button className={classes.submit} type="submit" disabled={!formState.isValid }>Selanjutnya {">"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}