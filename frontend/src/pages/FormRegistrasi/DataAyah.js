import React, { useState, useEffect, useRef } from 'react'
import { Sidebar } from '../../UI/Sidebar';
import { useForm, useController } from 'react-hook-form';
import classes from './regristrationForm.module.css'
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
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
//https://restcountries.com/v3.1/name/{name}


const noHPRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const DataAyah = () => {

    const {state, setState} = useAppState();
    const { warga_asingAyah, setWargaAsingAyah } = useAppState();
    const { steps } = useAppState();
    const { negaraOpsi } = useAppState();


    const activeStep = 3

    const navigate = useNavigate();

    const schema = yup.object().shape({
         nama_ayah: yup.string().required("Wajib diisi"),
         nik_ayah: yup.string().required("Wajib diisi").matches(/^[0-9]+$/gi, "Input angka yang valid").min(16, "NIK tidak boleh kurang dari 16 digit").max(16, "NIK tidak boleh lebih dari 16 digit"),
         tpt_lahir_ayah: yup.string().required("Wajib diisi"),
         tgl_lahir_ayah: yup.string().required("Wajib diisi"),
         agama_ayah: yup.string().required("Wajib diisi"),
         warga_negara_ayah: yup.string().required("Wajib diisi"),
         alamat_ayah: yup.string().required("Wajib diisi"),
         no_HP_ayah: yup.string().required("Wajib diisi").matches(noHPRegex, { message: "Harap input nomor HP yang valid" }),
         email_ayah: yup.string().email("Harap input alamat email yang valid"),
         status_ayah: yup.string().required("Wajib diisi"),
         pekerjaan_ayah: yup.string().required("Wajib diisi"),
         pendidikan_ayah: yup.string().required("Wajib diisi"),
         penghasilan_ayah: yup.string().required("Wajib diisi"),
    })

    const { register, control, handleSubmit, reset, formState, setValue} = useForm({
        defaultValues: state,
        mode: "all",
        resolver: yupResolver(schema)
    });

    const { field: nikAyah } = useController({
        name: 'nik_ayah',
        control,
        shouldUnregister: false,
        rules: { required: true },
        defaultValue: '',
    });


    const { field: { value: agamaAyahValue, onChange: selectAgamaAyahChangeHandler, ...restAgamaAyahField } } = useController({ name: 'agama_ayah', control });

    const { field: { value: pendidikanAyahValue, onChange: selectPendidikanAyahChangeHandler, ...restPendidikanAyahField} } = useController({ name: 'pendidikan_ayah', control})

    const { field: { value: pekerjaanAyahValue, onChange: selectPekerjaanAyahChangeHandler, ...restPenkerjaanAyahField} } = useController({ name: 'pekerjaan_ayah', control})

    const { field: { value: gajiAyahValue, onChange: selectGajiAyahChangeHandler, ...restGajiAyahField} } = useController({ name: 'penghasilan_ayah', control})

    const { field: { value: negaraValue, onChange: selectNegaraChangeHandler, ...restNegaraField } } = useController({ name: 'warga_negara_ayah', control });

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
        navigate("../data-ibu")
    }

    let pinInputRef = useRef(null);

    const resetFormHandler = () => {
        setShowConfirm(false)
        reset({
            nama_ayah: '',
            nik_ayah: '',
            tgl_lahir_ayah: '',
            tpt_lahir_ayah: '',
            agama_ayah: '',
            warga_negara_ayah: '',
            alamat_ayah: '',
            no_HP_ayah: '',
            email_ayah: '',
            status_ayah: '',
            pekerjaan_ayah: '',
            pendidikan_ayah: '',
            penghasilan_ayah: '',

        });
        setWargaAsingAyah(false)
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
                <Stepper
                    steps={steps}
                    activeStep={activeStep} />
                    <form onSubmit={handleSubmit(formSubmitHandler)}>
                        <div>
                            <span style={{ float: "right", fontWeight: "bold" }}>
                                <span style={{ color: "red" }}>*</span> artinya wajib diisi
                            </span>
                            <h3>D. Keterangan Ayah Kandung</h3>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.block}>
                                <label htmlFor='nama_ayah'>Nama Lengkap Ayah</label>
                                <span style={{ color: "red" }}>*</span>
                                <input style={errors.nama_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="nama_ayah" name="nama_ayah" type="text" {...register('nama_ayah')} onKeyDown={handleEnter}></input>
                                {errors.nama_ayah && <p className={classes.error}>{errors.nama_ayah.message}</p>}
                            </div>
                            <div>
                                <label htmlFor='nik'>NIK Ayah</label>
                                <span style={{ color: "red" }}>*</span>
                                <div className={classes.row}>
                                <PinInput
                                        style={{ paddingRigth: "10px", paddingBottom: "10px", paddingTop: "10px" }}
                                        inputStyle={errors.nik_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" } : { border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" }}
                                        inputFocusStyle={{ borderColor: 'blue' }}
                                        name="nik_ayah"
                                        ref={pinInputRef}
                                        length={16} // Specify the desired length of the PIN
                                        type="numeric" // Specify the input type
                                        initialValue={nikAyah.value}
                                        onChange={nikAyah.onChange}
                                        inputMode="number"
                                        onBlur={() => nikAyah.onBlur()}
                                        onKeyDown={handleEnter}
                                    />
                                </div>
                                {errors.nik_ayah && <p className={classes.error}>{errors.nik_ayah.message}</p>}
                            </div>
                            <div className={classes.row}>
                                <label htmlFor='tpt_lahir_ayah'>Tempat, Tanggal lahir </label>
                                <span style={{ color: "red" }}>*</span>

                                <input style={errors.tpt_lahir_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="tpt_lahir_ayah" name="tpt_lahir_ayah" type="text" {...register('tpt_lahir_ayah')} onKeyDown={handleEnter}></input>
                                <span>, </span>
                                <input id="tgl_lahir_ayah" name="tgl_lahir_ayah" type="date" {...register('tgl_lahir_ayah')}></input>
                                {errors.tpt_lahir_ayah && errors.tgl_lahir_ayah && <p className={classes.error}>{errors.tpt_lahir_ayah.message}</p>}
                            </div>
                            <div className={classes.row}>
                                <div style={{ width: '400px' }}>
                                    <label htmlFor='agama_ayah'>Agama</label>
                                    <span style={{ color: "red" }}>*</span>
                                    <Select id="agama" name="agama_ayah" options={agamaOpsi} value={agamaAyahValue ? agamaOpsi.find(x => x.value === agamaAyahValue) : agamaAyahValue} onChange={option => selectAgamaAyahChangeHandler(option ? option.value : option)} {...restAgamaAyahField} />
                                    {errors.agama_ayah && <p className={classes.error}>{errors.agama_ayah.message}</p>}
                                </div>
                            </div>
                            <label htmlFor='warga_negara'>Warga Negara</label>
                                <span style={{ color: "red" }}>*</span>
                                <div className={classes.row}>
                                        <div>
                                            <Select defaultValue="Pilih Warga Negara" options={negaraOpsi}  value={negaraValue ? negaraOpsi.find(x => x.value === negaraValue) : negaraValue} onChange={option => selectNegaraChangeHandler(option ? option.value : option)} {...restNegaraField} onKeyDown={handleEnter} />
                                            {errors.warga_negara_ayah && <p className={classes.error}>{errors.warga_negara_ayah.message}</p>}
                                        </div>
                                </div>
                            <div className={classes.block}>
                                <label htmlFor='pendidikan_ayah'>Pendidikan</label>
                                <span style={{ color: "red" }}>*</span>
                                <Select id="pendidkan" name="pendidkan_ayah" options={pendidikanOpsi} value={pendidikanAyahValue ? pendidikanOpsi.find(x => x.value === pendidikanAyahValue) : pendidikanAyahValue} onChange={option => selectPendidikanAyahChangeHandler(option ? option.value : option)} {...restPendidikanAyahField} />
                                {errors.pendidikan_ayah && <p className={classes.error}>{errors.pendidikan_ayah.message}</p>}
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='pekerjaan_ayah'>Pekerjaan</label>
                                <span style={{ color: "red" }}>*</span>
                                <Select id="pekerjaan" name="pekerjaan_ayah" options={pekerjaanOrtuOpsi} value={pekerjaanAyahValue ? pekerjaanOrtuOpsi.find(x => x.value === pekerjaanAyahValue) : pekerjaanAyahValue} onChange={option => selectPekerjaanAyahChangeHandler(option ? option.value : option)} {...restPenkerjaanAyahField} />
                                {errors.pekerjaan_ayah && <p className={classes.error}>{errors.pekerjaan_ayah.message}</p>}
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='penghasilan_ayah'>Penghasilan per-bulan Ayah</label>
                                <span style={{ color: "red" }}>*</span>
                                <Select id="penghasilan" name="penghasilan_ayah" options={rangeGajiOpsi} value={gajiAyahValue ? rangeGajiOpsi.find(x => x.value === gajiAyahValue) : gajiAyahValue} onChange={option => selectGajiAyahChangeHandler(option ? option.value : option)} {...restGajiAyahField} />
                                {errors.penghasilan_ayah && <p className={classes.error}>{errors.penghasilan_ayah.message}</p>}
                            </div>
                            <div className={classes.block}>
                            <label htmlFor='alamat_ayah'>Alamat</label>
                            <span style={{ color: "red" }}>*</span>
                            </div>
                            <textarea style={errors.alamat_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="alamat_ayah" name="alamat_ayah" row="4" {...register('alamat_ayah')} onKeyDown={handleEnter}></textarea>
                            {errors.alamat_ayah && <p className={classes.error}>{errors.alamat_ayah.message}</p>}
                            <div className={classes.block}>
                                <label htmlFor='noHP_ayah'>No.HP/Whatsapp</label>
                                <span style={{ color: "red" }}>*</span>
                                <input style={errors.no_HP_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="noHP_ayah" name="no_HP_ayah" type="number" label="No.HP/Whatsapp" {...register('no_HP_ayah')} onKeyDown={handleEnter}></input>
                                {errors.no_HP_ayah && <p className={classes.error}>{errors.no_HP_ayah.message}</p>}
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='email_ayah'>Email</label>
                                <input style={errors.email_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="email_ayah" name="email_ayah" type="email" label="Email" {...register('email_ayah')} onKeyDown={handleEnter}></input>
                                {errors.email_ayah && <p className={classes.error}>{errors.email_ayah.message}</p>}
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='status_ayah'>Status</label><span style={{ color: "red" }}>*</span>
                                </div>
                                <div className={classes.row}>
                                    <label htmlFor='status_ayah'>Masih Hidup</label>
                                    <input id="ayah_hidup" name="status_ayah" type="radio" value="Masih Hidup" {...register('status_ayah')} ></input>
                                    <label htmlFor='status_ayah'>Meninggal</label>
                                    <input id="ayam_mati" name="status_ayah" type="radio" value="Meninggal" {...register('status_ayah')} ></input>
                                    {errors.status_ayah && <p className={classes.error}>{errors.status_ayah.message}</p>}
                                </div>
                        </div>
                        <div className={classes.button}>
                        <Link to="../data-pendidikan">
                            <button className={classes.cancel} type="button">
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