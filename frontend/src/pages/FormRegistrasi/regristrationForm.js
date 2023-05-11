import React, { useState, useRef } from 'react'
import { Sidebar } from '../../UI/Sidebar';
import { useForm, useController } from 'react-hook-form';
import classes from './regristrationForm.module.css'
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import PinInput from 'react-pin-input';
const agamaOpsi = [

    { value: "islam", label: "Islam" },
    { value: "kristen_protestan", label: "Kristen Protestan" },
    { value: "khatolik", label: "Khatolik" },
    { value: "hindu", label: "Hindu" },
    { value: "buddha", label: "Buddha" },
    { value: "konghucu", label: "Konghucu" }

]
const noHPRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const Akteregex = /^\d{4}\/[A-Z]\/\d{4}$/;
export default function Registrasi(props) {


    const schema = yup.object().shape({
        //validasi data siswa

        // nama_siswa: yup.string().required("Wajib diisi"),
        // nik_siswa: yup.string().required("Wajib diisi").matches(/^[0-9]+$/gi, "Input angka yang valid").min(16, "NIK tidak boleh kurang dari 16 digit").max(16, "NIK tidak boleh lebih dari 16 digit"),
        // no_akteLahir: yup.string().required("Wajib diisi").matches(Akteregex, "Input Akte Lahir dengan format yang telah dicontohkan"),
        // tptLahir: yup.string().required("Wajib diisi"),
        // tglLahir: yup.date().required("Wajib diisi"),
        // kelamin: yup.string().required("Wajib diisi"),
        // agama: yup.string().required("Wajib diisi"),
        // warga_negara: yup.string().required("Wajib diisi"),
        // anak_ke: yup.number().typeError('Wajib diisi').positive("Mohon input angka yang valid").required("Wajib diisi"),
        // jmlh_saudara: yup.number().typeError('Wajib diisi').positive("Mohon input angka yang valid").required("Wajib diisi"),
        // alamat: yup.string().required("Wajib diisi"),
        // no_HP_siswa: yup.string().matches(noHPRegex, { message: "Harap input nomor HP yang valid", excludeEmptyString: true }),
        // email_siswa: yup.string().email("Harap input alamat email yang valid"),
        // goldar: yup.string().required("Wajib diisi"),
        // berat_badan: yup.number().typeError('Wajib diisi').positive("Mohon input angka yang valid").required("Wajib diisi"),
        // tinggi_badan: yup.number().typeError('Wajib diisi').positive("Mohon input angka yang valid").required("Wajib diisi"),
        // nisn: yup.string().required("Wajib diisi").matches(/^[0-9]+$/gi, "Input angka yang valid").min(10, "NIK tidak boleh kurang dari 10 digit").max(10, "NIK tidak boleh lebih dari 10 digit"),
        // sklh_lama: yup.string().required("Wajib diisi"),
        // no_ijazah: yup.string().required("Wajib diisi").min(6, "Input nomor ijazah yang valid").required("Wajib diisi"),
        // diterima: yup.string().required("Wajib diisi"),
        // tgl_ijazah: yup.date().typeError('Wajib diisi').required("Wajib diisi"),

        //validasi data ayah

        // nama_ayah: yup.string().required("Wajib diisi"),
        // nik_ayah: yup.string().required("Wajib diisi").matches(/^[0-9]+$/gi, "Input angka yang valid").min(16, "NIK tidak boleh kurang dari 16 digit").max(16, "NIK tidak boleh lebih dari 16 digit"),
        // tpt_lahir_ayah: yup.string().required("Wajib diisi"),
        // tgl_lahir_ayah: yup.date().required("Wajib diisi"),
        // agama_ayah: yup.string().required("Wajib diisi"),
        // warga_negara_ayah: yup.string().required("Wajib diisi"),
        // alamat_ayah: yup.string().required("Wajib diisi"),
        // no_HP_ayah: yup.string().required("Wajib diisi").matches(noHPRegex, { message: "Harap input nomor HP yang valid" }),
        // email_ayah: yup.string().email("Harap input alamat email yang valid"),
        // status_ayah: yup.string().required("Wajib diisi"),
        // pekerjaan_ayah: yup.string().required("Wajib diisi"),
        // pendidikan_ayah: yup.string().required("Wajib diisi"),
        // penghasilan_ayah: yup.number().typeError('Wajib diisi').positive("Mohon input angka yang valid").required("Wajib diisi"),

        //validasi data ibu

        // nama_ibu: yup.string().required("Wajib diisi"),
        // nik_ibu: yup.string().required("Wajib diisi").matches(/^[0-9]+$/gi, "Input angka yang valid").min(16, "NIK tidak boleh kurang dari 16 digit").max(16, "NIK tidak boleh lebih dari 16 digit"),
        // tpt_lahir_ibu: yup.string().required("Wajib diisi"),
        // tgl_lahir_ibu: yup.date().required("Wajib diisi"),
        // agama_ibu: yup.string().required("Wajib diisi"),
        // warga_negara_ibu: yup.string().required("Wajib diisi"),
        // alamat_ibu: yup.string().required("Wajib diisi"),
        // no_HP_ibu: yup.string().required("Wajib diisi").matches(noHPRegex, { message: "Harap input nomor HP yang valid" }),
        // email_ibu: yup.string().email("Harap input alamat email yang valid"),
        // status_ibu: yup.string().required("Wajib diisi"),
        // pekerjaan_ibu: yup.string().required("Wajib diisi"),
        // pendidikan_ibu: yup.string().required("Wajib diisi"),
        // penghasilan_ibu: yup.number().typeError('Wajib diisi').positive("Mohon input angka yang valid").required("Wajib diisi"),

        //validasi data wali
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
        tgl_lahir_wali: yup.date().when("ada_wali", {
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
            then: () => yup.string().typeError('Wajib diisi').required("Wajib diisi").matches(/^[0-9]+$/gi, "Input angka yang valid"),
            otherwise: () => yup.string()

        }),


    });


    const handleNIKSiswa = (nik) => {
        setValue('nik_siswa', nik); // Set the value of 'nik_siswa' field using setValue
    };

    const handleNIKIbu = (nik) => {
        setValue('nik_ibu', nik); // Set the value of 'nik_siswa' field using setValue
    };

    const handleNIKAyah = (nik) => {
        setValue('nik_ayah', nik); // Set the value of 'nik_siswa' field using setValue
    };

    const handleNIKWali = (nik) => {
        setValue('nik_wali', nik); // Set the value of 'nik_siswa' field using setValue
    };

    const handleAkteLahir = (akteLahir) => {
        setValue('no_akteLahir', akteLahir); // Set the value of 'nik_siswa' field using setValue
    };
    const handleNikBlur = (nik) => {
        schema.validate("nik_wali")
    };



    const { register, control, handleSubmit, formState, setValue, } = useForm({
        mode: "all",
        resolver: yupResolver(schema)
    });
    const [enteredData, SetEnteredData] = useState()
    const [ada_wali, setAdaWali] = useState(true)
    const [waliAyah, SetWaliAyah] = useState(false)
    const [waliIbu, SetWaliIbu] = useState(false)
    const [warga_asing, setWargaAsing] = useState(false)

    function WaliOrtuHandler(event) {
        setAdaWali(!ada_wali)
    }

    function WargaAsingHandler(event) {
        setWargaAsing(true)
    }
    function WargaIndoHandler(event) {
        setWargaAsing(false)
        console.log(warga_asing)
    }
    const { field: { value: agamaValue, onChange: selectAgamaChangeHandler, ...restAgamaField } } = useController({ name: 'agama', control });

    const { field: { value: agamaAyahValue, onChange: selectAgamaAyahChangeHandler, ...restAgamaAyahField } } = useController({ name: 'agama_ayah', control });

    const { field: { value: agamaIbuValue, onChange: selectAgamaIbuChangeHandler, ...restAgamaIbuField } } = useController({ name: 'agama_ibu', control });

    const { field: { value: agamaWaliValue, onChange: selectAgamaWaliChangeHandler, ...restAgamaWaliField } } = useController({ name: 'agama_wali', control });

    const { name } = register("ada_wali");

    const { errors } = formState;

    // const namaAyah = watch("nama_ayah")
    // const nikAyah = watch("nik_ayah")
    // const tptLahirAyah = watch("tpt_lahir_ayah")
    // const tglLahirAyah = watch("tgl_lahir_ayah")
    // const agamaAyah = watch("agama_ayah")
    // const wargaNegaraAyah = watch("warga_negara_ayah")
    // const noHPAyah = watch("no_HP_ayah")
    // const emailAyah = watch("email_ayah")
    // const pekerjaanAyah = watch("pekerjaan_ayah")
    // const penghasilanAyah = watch("penghasilan_ayah")
    // const pendidikanAyah = watch("pendidikan_ayah")
    // const alamatAyah = watch("alamat_ayah")



    // const namaIbu = watch("nama_ibu")
    // const nikIbu = watch("nik_ibu")
    // const tptLahirIbu = watch("tpt_lahir_ibu")
    // const tglLahirIbu = watch("tgl_lahir_ibu")
    // const agamaIbu = watch("agama_ibu")
    // const wargaNegaraIbu = watch("warga_negara_ibu")
    // const noHPIbu = watch("no_HP_ibu")
    // const emailIbu = watch("email_ibu")
    // const pekerjaanIbu = watch("pekerjaan_ibu")
    // const penghasilanIbu = watch("penghasilan_ibu")
    // const pendidikanIbu = watch("pendidikan_ibu")
    // const alamatIbu = watch("alamat_ibu")

    const formSubmitHandler = formValues => {
        try {
            SetEnteredData(formValues)
        } catch (error) {
            console.error(error);
        }
        console.log(ada_wali)
        console.log(formValues)
    }

    return (
        <React.Fragment>
            <div className={classes.content}>
                <Sidebar />
                <div className={classes.content_inner}>
                    <form onSubmit={handleSubmit(formSubmitHandler)}>
                        <div>
                            <span style={{ float: "right", fontWeight: "bold" }}>
                                <span className={classes["wajibstar"]}>*</span> artinya wajib diisi
                            </span>
                            <h3>A. Keterangan Data Pribadi</h3>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.grid}>
                                <div>
                                    <div className={classes.block}>
                                        <label htmlFor='nama'>Nama Lengkap</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.nama_siswa ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="nama" type="text" {...register('nama_siswa')}></input>
                                        {errors.nama_siswa && <p className={classes.error}>{errors.nama_siswa.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor='nik'>NIK Siswa</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <div className={classes.row}>
                                            <PinInput
                                                style={{ paddingRigth: "10px", paddingBottom: "10px", paddingTop: "10px" }}
                                                inputStyle={errors.nik_siswa ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" } : { border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" }}
                                                inputFocusStyle={{ borderColor: 'blue' }}
                                                name="nik_siswa"
                                                onChange={handleNIKSiswa}
                                                length={16} // Specify the desired length of the PIN
                                                type="numeric" // Specify the input type
                                                inputMode="numeric" // Specify the input mode
                                            />
                                        </div>
                                        {errors.nik_siswa && <p className={classes.error}>{errors.nik_siswa.message}</p>}
                                    </div>
                                    
                                    <div>
                                        <label htmlFor='akteLahir'>No. Akte Lahir</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        {/* <p style={{padding: "0", color:"grey", fontSize: "10px"}}>Cth: 2075/K/2004</p> */}
                                        <div className={classes.row}>
                                            <input placeholder="Cth: 2075/K/2004" style={errors.no_akteLahir ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="nama" type="text" {...register('no_akteLahir')}></input>
                                        </div>
                                        {errors.no_akteLahir && <p className={classes.error}>{errors.no_akteLahir.message}</p>}
                                    </div>
                                    <div className={classes.row}>
                                        <label htmlFor='tpt_lahir'>Tempat, tanggal lahir</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.tptLahir ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="tpt_lahir" name="tptLahir" type="text" {...register('tptLahir')} ></input>
                                        <span>, </span>
                                        <input id="tgl_lahir" name="tglLahir" type="date" {...register('tglLahir')} ></input>
                                    </div>
                                    {errors.tptLahir && errors.tglLahir && <p className={classes.error}>{errors.tptLahir.message}</p>}

                                    <label htmlFor='kelamin'>Jenis Kelamin</label>
                                    <span className={classes["wajibstar"]}>*</span>
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
                                            <span className={classes["wajibstar"]}>*</span>
                                            <Select id="agama" name="agama" options={agamaOpsi} value={agamaValue ? agamaOpsi.find(x => x.value === agamaValue) : agamaValue} onChange={option => selectAgamaChangeHandler(option ? option.value : option)} {...restAgamaField} />
                                            {errors.agama && <p className={classes.error}>{errors.agama.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div>

                                    <label htmlFor='warga_negara'>Warga Negara</label>
                                    <span className={classes["wajibstar"]}>*</span>
                                    <div className={classes.row}>
                                        <input id="indonesia" name="warga_negara" type="radio" value="Indonesia" {...register('warga_negara')} onChange={WargaIndoHandler}></input>
                                        <label htmlFor='indonesia'>Indonesia</label>
                                        <input id="indonesia" name="warga_negara" type="radio" onChange={WargaAsingHandler}></input>
                                        <label htmlFor='indonesia'>Lainnya:</label>
                                       {warga_asing && <Select id="agama" name="agama" options={agamaOpsi} value={agamaValue ? agamaOpsi.find(x => x.value === agamaValue) : agamaValue} onChange={option => selectAgamaChangeHandler(option ? option.value : option)} {...restAgamaField} />}

                                    </div>
                                    {errors.warga_negara && <p className={classes.error}>{errors.warga_negara.message}</p>}

                                    <div className={classes.row}>
                                        <label htmlFor='anak_ke'>Anak Ke-</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.anak_ke ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "50px" } : { width: "50px" }} id="anak_ke" name="anak_ke" type="number" {...register('anak_ke')}></input>
                                        {errors.anak_ke && <p className={classes.error}>{errors.anak_ke.message}</p>}
                                    </div>
                                    <div className={classes.row}>
                                        <label htmlFor='jmlh_saudara'>Jumlah Saudara Kandung</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.jmlh_saudara ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "50px" } : { width: "50px" }} id="jmlh_saudara" name="jmlh_saudara" type="number" {...register('jmlh_saudara')}></input>
                                        {errors.jmlh_saudara && <p className={classes.error}>{errors.jmlh_saudara.message}</p>}
                                    </div>
                                    <div className={classes.block}>
                                        <label htmlFor='alamat'>Alamat Tempat Tinggal</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <textarea style={errors.alamat ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="alamat" name="alamat_rumah" row="4" {...register('alamat_rumah')}></textarea>
                                        {errors.alamat_rumah && <p className={classes.error}>{errors.alamat_rumah.message}</p>}
                                    </div>
                                    <div className={classes.block}>
                                        <label htmlFor='no_hp'>No.HP/Whatsapp</label>
                                        <input style={errors.no_HP_siswa ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="no_hp" name="no_HP_siswa" type="number" {...register('no_HP_siswa')}></input>
                                        {errors.no_HP_siswa && <p className={classes.error}>{errors.no_HP_siswa.message}</p>}
                                    </div>
                                    <div className={classes.block}>
                                        <label htmlFor='email'>Email</label>
                                        <input style={errors.email_siswa ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="email" name="email_siswa" type="email" {...register('email_siswa')}></input>
                                        {errors.email_siswa && <p className={classes.error}>{errors.email_siswa.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.grid}>
                            <div>
                                <h3>B. Keterangan Kesehatan</h3>
                            </div>
                            <div>
                                <h3>C. Keterangan Pendidikan</h3>
                            </div>
                            <div className={classes.card}>
                                <div className={classes.row}>
                                    <label htmlFor='goldar'>Golongan Darah</label>
                                    <span className={classes["wajibstar"]}>*</span>
                                    <input style={errors.goldar ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="goldar" name="goldar" type="text" {...register('goldar')}></input>
                                    {errors.goldar && <p className={classes.error}>{errors.goldar.message}</p>}

                                </div>
                                <div className={classes.row}>
                                    <label htmlFor='berat_badan'>Berat Badan</label>
                                    <span className={classes["wajibstar"]}>*</span>
                                    <input style={errors.berat_badan ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="berat_badan" name="beratBadan" type="number"  {...register('berat_badan')}></input>
                                    <span>kg </span>
                                    {errors.berat_badan && <p className={classes.error}>{errors.berat_badan.message}</p>}

                                </div>
                                <div className={classes.row}>
                                    <label htmlFor='tinggi_badan'>Tinggi Badan</label>
                                    <span className={classes["wajibstar"]}>*</span>
                                    <input style={errors.tinggi_badan ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="tinggi_badan" name="tinggiBadan" type="number"  {...register('tinggi_badan')}></input>
                                    <span>cm </span>
                                    {errors.tinggi_badan && <p className={classes.error}>{errors.tinggi_badan.message}</p>}
                                </div>
                                <label htmlFor='penyakit'>Penyakit yang pernah diderita</label>
                                <textarea id="penyakit" name="penyakit" row="4" {...register('penyakit')}></textarea>
                                <label htmlFor='cacat'>Cacat Jasmani</label>
                                <textarea id="cacat" name="cacat_jasmani" row="4" {...register('cacat_jasmani')}></textarea>
                            </div>

                            <div className={classes.card}>
                                <div className={classes.block}>
                                    <label htmlFor='nisn'>NISN Siswa</label>
                                    <span className={classes["wajibstar"]}>*</span>
                                    <input style={errors.nisn ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="nisn" name="nisn" type="number" {...register('nisn')}></input>
                                    {errors.nisn && <p className={classes.error}>{errors.nisn.message}</p>}
                                </div>
                                <div className={classes.block}>
                                    <label htmlFor='sklh_lama'>Nama Sekolah Lama</label>
                                    <span className={classes["wajibstar"]}>*</span>
                                    <input style={errors.sklh_lama ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="sklh_lama" name="sklh_lama" type="text" {...register('sklh_lama')}></input>
                                    {errors.sklh_lama && <p className={classes.error}>{errors.sklh_lama.message}</p>}
                                </div>
                                <div className={classes.row}>
                                    <label htmlFor='diterima'>Diterima di sekolah ini di kelas</label>
                                    <span className={classes["wajibstar"]}>*</span>
                                    <input style={errors.diterima ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="diterima" name="diterima" type="number" {...register('diterima')}></input>
                                    {errors.diterima && <p className={classes.error}>{errors.diterima.message}</p>}
                                </div>
                                <div className={classes.block}>
                                    <label htmlFor='no_ijazah'>No. Ijazah Terakhir</label>
                                    <span className={classes["wajibstar"]}>*</span>
                                    <input style={errors.no_ijazah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="no_ijazah" name="no_ijazah" type="text" {...register('no_ijazah')}></input>
                                    {errors.no_ijazah && <p className={classes.error}>{errors.no_ijazah.message}</p>}
                                </div>
                                <div className={classes.row}>
                                    <label htmlFor='tgl_ijazah'>Tanggal Penerbitan Ijazah Terakhir</label>
                                    <span className={classes["wajibstar"]}>*</span>
                                    <input id="tgl_ijazah" name="tgl_ijazah" type="date" label="Tanggal Penerbitan Ijazah Terakhir" {...register('tgl_ijazah')}></input>
                                    {errors.tgl_ijazah && <p className={classes.error}>{errors.tgl_ijazah.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>D. Keterangan Ayah Kandung</h3>
                        </div>
                        <div className={classes.card}>

                            <div className={classes.grid}>
                                <div>
                                    <div className={classes.block}>
                                        <label htmlFor='nama_ayah'>Nama Lengkap Ayah</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.nama_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="nama_ayah" name="nama_ayah" type="text" {...register('nama_ayah')}></input>
                                        {errors.nama_ayah && <p className={classes.error}>{errors.nama_ayah.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor='nik'>NIK Ayah</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <div className={classes.row}>
                                            <PinInput
                                                style={{ paddingRigth: "10px", paddingBottom: "10px", paddingTop: "10px" }}
                                                inputStyle={errors.nik_siswa ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" } : { border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" }}
                                                inputFocusStyle={{ borderColor: 'blue' }}
                                                name="nik_ayah"
                                                onChange={handleNIKAyah}
                                                length={16} // Specify the desired length of the PIN
                                                type="numeric" // Specify the input type
                                                inputMode="numeric" // Specify the input mode
                                            />
                                        </div>
                                        {errors.nik_ayah && <p className={classes.error}>{errors.nik_ayah.message}</p>}
                                    </div>
                                    <div className={classes.row}>
                                        <label htmlFor='tpt_lahir_ayah'>Tempat, Tanggal lahir </label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.tpt_lahir_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="tpt_lahir_ayah" name="tpt_lahir_ayah" type="text" {...register('tpt_lahir_ayah')}></input>
                                        <span>, </span>
                                        <input id="tgl_lahir_ayah" name="tgl_lahir_ayah" type="date" {...register('tgl_lahir_ayah')}></input>
                                        {errors.tpt_lahir_ayah && errors.tgl_lahir_ayah && <p className={classes.error}>{errors.tpt_lahir_ayah.message}</p>}
                                    </div>
                                    <div className={classes.row}>
                                        <div style={{ width: '400px' }}>
                                            <label htmlFor='agama_ayah'>Agama</label>
                                            <span className={classes["wajibstar"]}>*</span>
                                            <Select id="agama" name="agama_ayah" options={agamaOpsi} value={agamaAyahValue ? agamaOpsi.find(x => x.value === agamaAyahValue) : agamaAyahValue} onChange={option => selectAgamaAyahChangeHandler(option ? option.value : option)} {...restAgamaAyahField} />
                                            {errors.agama_ayah && <p className={classes.error}>{errors.agama_ayah.message}</p>}
                                        </div>
                                    </div>
                                    <div className={classes.block}>
                                        <label htmlFor='warga_negara_ayah'>Warga Negara</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.warga_negara_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="warga_negara_ayah" name="warga_negara_ayah" type="text" {...register('warga_negara_ayah')}></input>
                                        {errors.warga_negara_ayah && <p className={classes.error}>{errors.warga_negara_ayah.message}</p>}
                                    </div>
                                    <div className={classes.block}>
                                        <label htmlFor='pendidikan_ayah'>Pendidikan</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.pendidikan_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="pendidikan_ayah" name="pendidikan_ayah" type="text" {...register('pendidikan_ayah')}></input>
                                        {errors.pendidikan_ayah && <p className={classes.error}>{errors.pendidikan_ayah.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <div className={classes.block}>
                                        <label htmlFor='pekerjaan_ayah'>Pekerjaan</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.pekerjaan_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="pekerjaan_ayah" name="pekerjaan_ayah" type="text" {...register('pekerjaan_ayah')}></input>
                                        {errors.pekerjaan_ayah && <p className={classes.error}>{errors.pekerjaan_ayah.message}</p>}
                                    </div>
                                    <div className={classes.block}>
                                        <label htmlFor='penghasilan_ayah'>Penghasilan per-bulan Ayah</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.penghasilan_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="penghasilan_ayah" name="penghasilan_ayah" type="number" {...register('penghasilan_ayah')}></input>
                                        {errors.penghasilan_ayah && <p className={classes.error}>{errors.penghasilan_ayah.message}</p>}
                                    </div>
                                    <label htmlFor='alamat_ayah'>Alamat</label>
                                    <span className={classes["wajibstar"]}>*</span>
                                    <textarea style={errors.alamat_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="alamat_ayah" name="alamat_ayah" row="4" {...register('alamat_ayah')}></textarea>
                                    {errors.alamat_ayah && <p className={classes.error}>{errors.alamat_ayah.message}</p>}
                                    <div className={classes.block}>
                                        <label htmlFor='noHP_ayah'>No.HP/Whatsapp</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.no_HP_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="noHP_ayah" name="no_HP_ayah" type="number" label="No.HP/Whatsapp" {...register('no_HP_ayah')}></input>
                                        {errors.no_HP_ayah && <p className={classes.error}>{errors.no_HP_ayah.message}</p>}
                                    </div>
                                    <div className={classes.block}>
                                        <label htmlFor='email_ayah'>Email</label>
                                        <input style={errors.email_ayah ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="email_ayah" name="email_ayah" type="email" label="Email" {...register('email_ayah')}></input>
                                        {errors.email_ayah && <p className={classes.error}>{errors.email_ayah.message}</p>}
                                    </div>
                                    <label htmlFor='status_ayah'>Status</label>
                                    <span className={classes["wajibstar"]}>*</span>
                                    <div className={classes.row}>
                                        <label htmlFor='status_ayah'>Masih Hidup</label>
                                        <input id="ayah_hidup" name="status_ayah" type="radio" value="Masih Hidup" {...register('status_ayah')} ></input>
                                        <label htmlFor='status_ayah'>Meninggal</label>
                                        <input id="ayam_mati" name="status_ayah" type="radio" value="Meninggal" {...register('status_ayah')} ></input>
                                        {errors.status_ayah && <p className={classes.error}>{errors.status_ayah.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>E. Keterangan Ibu Kandung</h3>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.grid}>
                                <div>
                                    <div className={classes.block}>
                                        <label htmlFor='nama_ayah'>Nama Lengkap Ibu</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.nama_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="nama_ibu" name="nama_ibu" type="text" {...register('nama_ibu')}></input>
                                        {errors.nama_ibu && <p className={classes.error}>{errors.nama_ibu.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor='nik'>NIK Ibu</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <div className={classes.row}>
                                            <PinInput
                                                style={{ paddingRigth: "10px", paddingBottom: "10px", paddingTop: "10px" }}
                                                inputStyle={errors.nik_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" } : { border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" }}
                                                inputFocusStyle={{ borderColor: 'blue' }}
                                                name="nik_ibu"
                                                onChange={handleNIKIbu}
                                                length={16} // Specify the desired length of the PIN
                                                type="numeric" // Specify the input type
                                                inputMode="numeric" // Specify the input mode
                                            />
                                        </div>
                                        {errors.nik_ibu && <p className={classes.error}>{errors.nik_ibu.message}</p>}
                                    </div>
                                    <div className={classes.row}>
                                        <label htmlFor='tpt_lahir_ibu'>Tempat, Tanggal lahir </label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.tpt_lahir_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="tpt_lahir_ibu" name="tpt_lahir_ibu" type="text" {...register('tpt_lahir_ibu')}></input>
                                        <span>, </span>
                                        <input id="tgl_lahir_ibu" name="tgl_lahir_ibu" type="date" {...register('tgl_lahir_ibu')}></input>
                                        {errors.tpt_lahir_ibu && errors.tgl_lahir_ibu && <p className={classes.error}>{errors.tpt_lahir_ibu.message}</p>}
                                    </div>
                                    <div className={classes.row}>
                                        <div style={{ width: '400px' }}>
                                            <label htmlFor='agama_ibu'>Agama</label>
                                            <span className={classes["wajibstar"]}>*</span>
                                            <Select id="agama" name="agama_ibu" options={agamaOpsi} value={agamaIbuValue ? agamaOpsi.find(x => x.value === agamaIbuValue) : agamaIbuValue} onChange={option => selectAgamaIbuChangeHandler(option ? option.value : option)} {...restAgamaIbuField} />
                                            {errors.agama_ibu && <p className={classes.error}>{errors.agama_ibu.message}</p>}
                                        </div>
                                    </div>
                                    <div className={classes.block}>
                                        <label htmlFor='warga_negara_ibu'>Warga Negara</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.warga_negara_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="warga_negara_ibu" name="warga_negara_ibu" type="text" {...register('warga_negara_ibu')}></input>
                                        {errors.warga_negara_ibu && <p className={classes.error}>{errors.warga_negara_ibu.message}</p>}
                                    </div>
                                    <div className={classes.block}>
                                        <label htmlFor='pendidikan_ibu'>Pendidikan</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.pendidikan_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="pendidikan_ibu" name="pendidikan_ibu" type="text" {...register('pendidikan_ibu')}></input>
                                        {errors.pendidikan_ibu && <p className={classes.error}>{errors.pendidikan_ibu.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <div className={classes.block}>
                                        <label htmlFor='pekerjaan_ibu'>Pekerjaan</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.pekerjaan_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="pekerjaan_ibu" name="pekerjaan_ibu" type="text" {...register('pekerjaan_ibu')}></input>
                                        {errors.pekerjaan_ibu && <p className={classes.error}>{errors.pekerjaan_ibu.message}</p>}
                                    </div>
                                    <div className={classes.block}>
                                        <label htmlFor='penghasilan_ibu'>Penghasilan per-bulan Ibu</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.penghasilan_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="penghasilan_ibu" name="penghasilan_ibu" type="number" {...register('penghasilan_ibu')}></input>
                                        {errors.penghasilan_ibu && <p className={classes.error}>{errors.penghasilan_ibu.message}</p>}
                                    </div>
                                    <label htmlFor='alamat_ibu'>Alamat</label>
                                    <span className={classes["wajibstar"]}>*</span>
                                    <textarea style={errors.alamat_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="alamat_ibu" name="alamat_ibu" row="4" {...register('alamat_ibu')}></textarea>
                                    {errors.alamat_ibu && <p className={classes.error}>{errors.alamat_ibu.message}</p>}
                                    <div className={classes.block}>
                                        <label htmlFor='noHP_ibu'>No.HP/Whatsapp</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <input style={errors.no_HP_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="noHP_ibu" name="no_HP_ibu" type="number" label="No.HP/Whatsapp" {...register('no_HP_ibu')}></input>
                                        {errors.no_HP_ibu && <p className={classes.error}>{errors.no_HP_ibu.message}</p>}
                                    </div>
                                    <div className={classes.block}>
                                        <label htmlFor='email_ibu'>Email</label>
                                        <input style={errors.email_ibu ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="email_ibu" name="email_ibu" type="email" label="Email" {...register('email_ibu')}></input>
                                        {errors.email_ibu && <p className={classes.error}>{errors.email_ibu.message}</p>}
                                    </div>
                                    <label htmlFor='status_ibu'>Status</label>
                                    <span className={classes["wajibstar"]}>*</span>
                                    <div className={classes.row}>
                                        <label htmlFor='status_ibu'>Masih Hidup</label>
                                        <input id="ibu_hidup" name="status_ibu" type="radio" value="Masih Hidup" {...register('status_ibu')} ></input>
                                        <label htmlFor='status_ibu'>Meninggal</label>
                                        <input id="ayam_mati" name="status_ibu" type="radio" value="Meninggal" {...register('status_ibu')} ></input>
                                        {errors.status_ibu && <p className={classes.error}>{errors.status_ibu.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>F. Keterangan Wali</h3>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.row}>
                                <label htmlFor='wali_ortu'>Tidak ada wali</label>
                                <input id="wali_ortu" type="checkbox"
                                    checked={ada_wali}
                                    {...register("ada_wali")} onChange={WaliOrtuHandler}></input>
                            </div>
                            {/* {!ada_wali &&
                                <div className={classes.button}>
                                    <button style={waliAyah ? { backgroundColor: "darkblue", color: "aliceblue", border: "solid", borderColor: "#D9D9D9" } : {}} type="button" onClick={() => {

                                        SetWaliIbu(false)
                                        SetWaliAyah(true)

                                        setValue("nama_wali", namaAyah);
                                        setValue("nik_wali", nikAyah);
                                        setValue("agama_wali", agamaAyah);
                                        setValue("tgl_lahir_wali", tglLahirAyah);
                                        setValue("tpt_lahir_wali", tptLahirAyah);
                                        setValue("no_HP_wali", noHPAyah);
                                        setValue("email_wali", emailAyah);
                                        setValue("alamat_wali", alamatAyah);
                                        setValue("penghasilan_wali", penghasilanAyah);
                                        setValue("pekerjaan_wali", pekerjaanAyah);
                                        setValue("pendidikan_wali", pendidikanAyah);
                                        setValue("warga_negara_wali", wargaNegaraAyah);
                                    }}>
                                        Ayah
                                    </button>
                                    <button style={waliIbu ? { backgroundColor: "darkblue", color: "aliceblue", border: "solid", borderColor: "#D9D9D9" } : {}} type="button" onClick={() => {

                                        SetWaliAyah(false)
                                        SetWaliIbu(true)

                                        setValue("nama_wali", namaIbu);
                                        setValue("nik_wali", nikIbu);
                                        setValue("agama_wali", agamaIbu);
                                        setValue("tgl_lahir_wali", tglLahirIbu);
                                        setValue("tpt_lahir_wali", tptLahirIbu);
                                        setValue("no_HP_wali", noHPIbu);
                                        setValue("email_wali", emailIbu);
                                        setValue("alamat_wali", alamatIbu);
                                        setValue("penghasilan_wali", penghasilanIbu);
                                        setValue("pekerjaan_wali", pekerjaanIbu);
                                        setValue("pendidikan_wali", pendidikanIbu);
                                        setValue("warga_negara_wali", wargaNegaraIbu);
                                    }}>
                                        Ibu
                                    </button>
                                </div>
                            } */}
                            {!ada_wali &&
                                <div className={classes.grid}>
                                    <div>
                                        <div className={classes.block}>
                                            <label htmlFor='nama_ayah'>Nama Lengkap Wali</label>
                                            <span className={classes["wajibstar"]}>*</span>
                                            <input style={errors.nama_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="nama_wali" name="nama_wali" type="text" {...register('nama_wali')}></input>
                                            {errors.nama_wali && <p className={classes.error}>{errors.nama_wali.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor='nik'>NIK Wali</label>
                                            <span className={classes["wajibstar"]}>*</span>
                                            <div className={classes.row}>
                                                <PinInput
                                                    style={{ paddingRigth: "10px", paddingBottom: "10px", paddingTop: "10px" }}
                                                    inputStyle={errors.nik_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" } : { border: "solid", borderColor: "#D9D9D9", width: "25px", height: "25px" }}
                                                    inputFocusStyle={{ borderColor: 'blue' }}
                                                    name="nik_wali"
                                                    onChange={handleNIKWali}
                                                    onBlur={handleNikBlur}
                                                    length={16} // Specify the desired length of the PIN
                                                    type="numeric" // Specify the input type
                                                    inputMode="numeric" // Specify the input mode
                                                />
                                            </div>
                                            {errors.nik_wali && <p className={classes.error}>{errors.nik_wali.message}</p>}
                                        </div>

                                        <div className={classes.row}>
                                            <label htmlFor='tpt_lahir_wali'>Tempat, Tanggal lahir </label>
                                            <span className={classes["wajibstar"]}>*</span>
                                            <input style={errors.tpt_lahir_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9", width: "75px" } : { width: "75px" }} id="tpt_lahir_wali" name="tpt_lahir_wali" type="text" {...register('tpt_lahir_wali')}></input>
                                            <span>, </span>
                                            <input id="tgl_lahir_wali" name="tgl_lahir_wali" type="date" {...register('tgl_lahir_wali')}></input>
                                            {errors.tpt_lahir_wali && errors.tgl_lahir_wali && <p className={classes.error}>{errors.tpt_lahir_wali.message}</p>}
                                        </div>
                                        <div className={classes.row}>
                                            <label htmlFor='agama_wali'>Agama</label>
                                            <span className={classes["wajibstar"]}>*</span>
                                            <Select id="agama" name="agama_wali" options={agamaOpsi} value={agamaWaliValue ? agamaOpsi.find(x => x.value === agamaWaliValue) : agamaWaliValue} onChange={option => selectAgamaWaliChangeHandler(option ? option.value : option)} {...restAgamaWaliField} />
                                            {errors.agama_wali && <p className={classes.error}>{errors.agama_wali.message}</p>}
                                        </div>
                                        <div className={classes.block}>
                                            <label htmlFor='warga_negara_wali'>Warga Negara</label>
                                            <span className={classes["wajibstar"]}>*</span>
                                            <input style={errors.warga_negara_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="warga_negara_wali" name="warga_negara_wali" type="text" {...register('warga_negara_wali')}></input>
                                            {errors.warga_negara_wali && <p className={classes.error}>{errors.warga_negara_wali.message}</p>}
                                        </div>
                                        <div className={classes.block}>
                                            <label htmlFor='pendidikan_wali'>Pendidikan</label>
                                            <span className={classes["wajibstar"]}>*</span>
                                            <input style={errors.pendidikan_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="pendidikan_wali" name="pendidikan_wali" type="text" {...register('pendidikan_wali')}></input>
                                            {errors.pendidikan_wali && <p className={classes.error}>{errors.pendidikan_wali.message}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <div className={classes.block}>
                                            <label htmlFor='pekerjaan_wali'>Pekerjaan</label>
                                            <span className={classes["wajibstar"]}>*</span>
                                            <input style={errors.pekerjaan_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="pekerjaan_wali" name="pekerjaan_wali" type="text" {...register('pekerjaan_wali')}></input>
                                            {errors.pekerjaan_wali && <p className={classes.error}>{errors.pekerjaan_wali.message}</p>}
                                        </div>
                                        <div className={classes.block}>
                                            <label htmlFor='penghasilan_wali'>Penghasilan per-bulan Wali</label>
                                            <span className={classes["wajibstar"]}>*</span>
                                            <input style={errors.penghasilan_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="penghasilan_wali" name="penghasilan_wali" type="number" {...register('penghasilan_wali')}></input>
                                            {errors.penghasilan_wali && <p className={classes.error}>{errors.penghasilan_wali.message}</p>}
                                        </div>
                                        <label htmlFor='alamat_wali'>Alamat</label>
                                        <span className={classes["wajibstar"]}>*</span>
                                        <textarea style={errors.alamat_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="alamat_wali" name="alamat_wali" row="" {...register('alamat_wali')}></textarea>
                                        {errors.alamat_wali && <p className={classes.error}>{errors.alamat_wali.message}</p>}
                                        <div className={classes.block}>
                                            <label htmlFor='noHP_wali'>No.HP/Whatsapp</label>
                                            <span className={classes["wajibstar"]}>*</span>
                                            <input style={errors.no_HP_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="noHP_wali" name="no_HP_wali" type="number" label="No.HP/Whatsapp" {...register('no_HP_wali')}></input>
                                            {errors.no_HP_wali && <p className={classes.error}>{errors.no_HP_wali.message}</p>}
                                        </div>
                                        <div className={classes.block}>
                                            <label htmlFor='email_wali'>Email</label>
                                            <input style={errors.email_wali ? { backgroundColor: "#ffa6a6", border: "solid", borderColor: "#D9D9D9" } : {}} id="email_wali" name="email_wali" type="email" label="Email" {...register('email_wali')}></input>
                                            {errors.email_wali && <p className={classes.error}>{errors.email_wali.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={classes.card}>
                            <div className={classes.button}>

                                <button className={classes.submit} type="submit">Submit</button>
                                <button className={classes.reset}>Reset</button>
                                <button className={classes.cancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </React.Fragment >
    )
}