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
//https://restcountries.com/v3.1/name/{name}

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

const noHPRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const DataIbu = () => {

    const {state, setState} = useAppState();
    const { warga_asingIbu, setWargaAsingIbu } = useAppState();
    const { steps } = useAppState();
    const { negaraOpsi } = useAppState();

    const navigate = useNavigate();

    const activeStep = 4


    const schema = yup.object().shape({
         nama_ibu: yup.string().required("Wajib diisi"),
         nik_ibu: yup.string().required("Wajib diisi").matches(/^[0-9]+$/gi, "Input angka yang valid").min(16, "NIK tidak boleh kurang dari 16 digit").max(16, "NIK tidak boleh lebih dari 16 digit"),
         tpt_lahir_ibu: yup.string().required("Wajib diisi"),
         tgl_lahir_ibu: yup.string().required("Wajib diisi"),
         agama_ibu: yup.string().required("Wajib diisi"),
         warga_negara_ibu: yup.string().required("Wajib diisi"),
         alamat_ibu: yup.string().required("Wajib diisi"),
         no_HP_ibu: yup.string().required("Wajib diisi").matches(noHPRegex, { message: "Harap input nomor HP yang valid" }),
         email_ibu: yup.string().email("Harap input alamat email yang valid"),
         status_ibu: yup.string().required("Wajib diisi"),
         pekerjaan_ibu: yup.string().required("Wajib diisi"),
         pendidikan_ibu: yup.string().required("Wajib diisi"),
         penghasilan_ibu: yup.string().required("Wajib diisi"),
    })

    const { register, control, handleSubmit, reset, formState, setValue} = useForm({
        defaultValues: state,
        mode: "all",
        resolver: yupResolver(schema)
    });

    const { field: nikIbu } = useController({
        name: 'nik_ibu',
        control,
        shouldUnregister: false,
        rules: { required: true },
        defaultValue: '',
    });

    const { field: { value: agamaIbuValue, onChange: selectAgamaIbuChangeHandler, ...restAgamaIbuField } } = useController({ name: 'agama_ibu', control });

    const { field: { value: pendidikanIbuValue, onChange: selectPendidikanIbuChangeHandler, ...restPendidikanIbuField} } = useController({ name: 'pendidikan_ibu', control})

    const { field: { value: pekerjaanIbuValue, onChange: selectPekerjaanIbuChangeHandler, ...restPenkerjaanIbuField} } = useController({ name: 'pekerjaan_ibu', control})

    const { field: { value: gajiIbuValue, onChange: selectGajiIbuChangeHandler, ...restGajiIbuField} } = useController({ name: 'penghasilan_ibu', control})

    const { field: { value: negaraValue, onChange: selectNegaraChangeHandler, ...restNegaraField } } = useController({ name: 'warga_negara_ibu', control });

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
        navigate("../data-wali")
    }

    let pinInputRef = useRef(null);

    const resetFormHandler = () => {
        setShowConfirm(false)
        reset({
            nama_ibu: '',
            nik_ibu: '',
            tgl_lahir_ibu: '',
            tpt_lahir_ibu: '',
            agama_ibu: '',
            warga_negara_ibu: '',
            alamat_ibu: '',
            no_HP_ibu: '',
            email_ibu: '',
            status_ibu: '',
            pekerjaan_ibu: '',
            pendidikan_ibu: '',
            penghasilan_ibu: '',

        });
        setWargaAsingIbu(false)
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
                            <h3>E. Keterangan Ibu Kandung</h3>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.block}>
                                <label htmlFor='nama_ibu'>Nama Lengkap Ibu</label>
                                <span style={{ color: "red" }}>*</span>
                                <input style={errors.nama_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="nama_ibu" name="nama_ibu" type="text" {...register('nama_ibu')} onKeyDown={handleEnter}></input>
                                {errors.nama_ibu && <p className={classes.error}>{errors.nama_ibu.message}</p>}
                            </div>
                            <div>
                                <label htmlFor='nik'>NIK Ibu</label>
                                <span style={{ color: "red" }}>*</span>
                                <div className={classes.row}>
                                <PinInput
                                        style={{ paddingRigth: "10px", paddingBottom: "10px", paddingTop: "10px" }}
                                        inputStyle={errors.nik_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" } : { border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" }}
                                        inputFocusStyle={{ borderColor: 'blue' }}
                                        name="nik_ibu"
                                        ref={pinInputRef}
                                        length={16} // Specify the desired length of the PIN
                                        type="numeric" // Specify the input type
                                        initialValue={nikIbu.value}
                                        onChange={nikIbu.onChange}
                                        inputMode="number"
                                        onBlur={() => nikIbu.onBlur()}
                                        onKeyDown={handleEnter}
                                    />
                                </div>
                                {errors.nik_ibu && <p className={classes.error}>{errors.nik_ibu.message}</p>}
                            </div>
                            <div className={classes.row}>
                                <label htmlFor='tpt_lahir_ibu'>Tempat, Tanggal lahir </label>
                                <span style={{ color: "red" }}>*</span>
                                <input style={errors.tpt_lahir_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="tpt_lahir_ibu" name="tpt_lahir_ibu" type="text" {...register('tpt_lahir_ibu')} onKeyDown={handleEnter}></input>
                                <span>, </span>
                                <input id="tgl_lahir_ibu" name="tgl_lahir_ibu" type="date" {...register('tgl_lahir_ibu')}></input>
                                {errors.tpt_lahir_ibu && errors.tgl_lahir_ibu && <p className={classes.error}>{errors.tpt_lahir_ibu.message}</p>}
                            </div>
                            <div className={classes.row}>
                                <div style={{ width: '400px' }}>
                                    <label htmlFor='agama_ibu'>Agama</label>
                                    <span style={{ color: "red" }}>*</span>
                                    <Select id="agama" name="agama_ibu"  options={agamaOpsi} value={agamaIbuValue ? agamaOpsi.find(x => x.value === agamaIbuValue) : agamaIbuValue} onChange={option => selectAgamaIbuChangeHandler(option ? option.value : option)} {...restAgamaIbuField} />
                                    {errors.agama_ibu && <p className={classes.error}>{errors.agama_ibu.message}</p>}
                                </div>
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='warga_negara_ibu'>Warga Negara</label>
                                <span style={{ color: "red" }}>*</span>
                                <div className={classes.row}>
                                        <div>
                                            <Select defaultValue="Pilih Warga Negara" options={negaraOpsi}  value={negaraValue ? negaraOpsi.find(x => x.value === negaraValue) : negaraValue} onChange={option => selectNegaraChangeHandler(option ? option.value : option)} {...restNegaraField} onKeyDown={handleEnter} />
                                            {errors.warga_negara_ibu && <p className={classes.error}>{errors.warga_negara_ibu.message}</p>}
                                        </div>
                                </div>
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='pendidikan_ibu'>Pendidikan</label>
                                <span style={{ color: "red" }}>*</span>
                                <Select id="pendidkan" name="pendidkan_ibu" options={pendidikanOpsi} value={pendidikanIbuValue ? pendidikanOpsi.find(x => x.value === pendidikanIbuValue) : pendidikanIbuValue} onChange={option => selectPendidikanIbuChangeHandler(option ? option.value : option)} {...restPendidikanIbuField} />
                                {errors.pendidikan_ibu && <p className={classes.error}>{errors.pendidikan_ibu.message}</p>}
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='pekerjaan_ibu'>Pekerjaan</label>
                                <span style={{ color: "red" }}>*</span>
                                <Select id="pekerjaan" name="pekerjaan_ibu" options={pekerjaanOrtuOpsi} value={pekerjaanIbuValue ? pekerjaanOrtuOpsi.find(x => x.value === pekerjaanIbuValue) : pekerjaanIbuValue} onChange={option => selectPekerjaanIbuChangeHandler(option ? option.value : option)} {...restPenkerjaanIbuField} />
                                {errors.pekerjaan_ibu && <p className={classes.error}>{errors.pekerjaan_ibu.message}</p>}
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='penghasilan_ibu'>Penghasilan per-bulan Ibu</label>
                                <span style={{ color: "red" }}>*</span>
                                <Select id="penghasilan" name="penghasilan_ibu" options={rangeGajiOpsi} value={gajiIbuValue ? rangeGajiOpsi.find(x => x.value === gajiIbuValue) : gajiIbuValue} onChange={option => selectGajiIbuChangeHandler(option ? option.value : option)} {...restGajiIbuField} />
                                {errors.penghasilan_ibu && <p className={classes.error}>{errors.penghasilan_ibu.message}</p>}
                            </div>
                            <label htmlFor='alamat_ibu'>Alamat</label>
                            <span style={{ color: "red" }}>*</span>
                            <textarea style={errors.alamat_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="alamat_ibu" name="alamat_ibu" row="4" {...register('alamat_ibu')} onKeyDown={handleEnter}></textarea>
                            {errors.alamat_ibu && <p className={classes.error}>{errors.alamat_ibu.message}</p>}
                            <div className={classes.block}>
                                <label htmlFor='noHP_ibu'>No.HP/Whatsapp</label>
                                <span style={{ color: "red" }}>*</span>
                                <input style={errors.no_HP_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="noHP_ibu" name="no_HP_ibu" type="number" label="No.HP/Whatsapp" {...register('no_HP_ibu')} onKeyDown={handleEnter}></input>
                                {errors.no_HP_ibu && <p className={classes.error}>{errors.no_HP_ibu.message}</p>}
                            </div>
                            <div className={classes.block}>
                                <label htmlFor='email_ibu'>Email</label>
                                <input style={errors.email_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="email_ibu" name="email_ibu" type="email" label="Email" {...register('email_ibu')} onKeyDown={handleEnter}></input>
                                {errors.email_ibu && <p className={classes.error}>{errors.email_ibu.message}</p>}
                            </div>
                            <label htmlFor='status_ibu'>Status</label>
                            <span style={{ color: "red" }}>*</span>
                            <div className={classes.row}>
                                <label htmlFor='status_ibu'>Masih Hidup</label>
                                <input id="ibu_hidup" name="status_ibu" type="radio" value="Masih Hidup" {...register('status_ibu')} ></input>
                                <label htmlFor='status_ibu'>Meninggal</label>
                                <input id="ayam_mati" name="status_ibu" type="radio" value="Meninggal" {...register('status_ibu')} ></input>
                                {errors.status_ibu && <p className={classes.error}>{errors.status_ibu.message}</p>}
                            </div>
                        </div>
                        <div className={classes.button}>
                        <Link to="../data-ayah">
                            <button className={classes.cancel}>
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