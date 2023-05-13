import { createContext, useContext, useState } from "react";
import Stepper from 'react-stepper-horizontal'
import { useEffect } from "react";
export const AppStateContext = createContext({});

export function AppProvider({ children }) {
  const [state, setState] = useState([])
  const [ada_penyakit, setAdaPenyakit] = useState(false)
  const [ada_cacat, setAdaCacat] = useState(false)
  const [warga_asing, setWargaAsing] = useState(false)
  const [warga_asingAyah, setWargaAsingAyah] = useState(false)
  const [warga_asingIbu, setWargaAsingIbu] = useState(false)
  const [warga_asingWali, setWargaAsingWali] = useState(false)
  const [ada_wali, setAdaWali] = useState(true)
  const[negaraOpsi, setNegaraOpsi] = useState([])

  const steps = [
    { title: 'Data Pribadi' },
    { title: 'Data Kesehatan' },
    { title: 'Data Pendidikan' },
    { title: 'Data Ayah' },
    { title: 'Data Ibu' },
    { title: 'Data Wali' },
    { title: 'Konfirmasi Data' },
];

useEffect(() => {
  async function fetchData() {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    const data = await response.json();
    const filteredData = data.filter(
      (negara) =>
        negara.name.common !== "Indonesia" &&
        negara.name.common !== "World"
    );
    const mappedData = filteredData.map((negara) => ({
      label: negara.name.common,
      value: negara.name.common,
    }));
    const indonesiaOption = { label: "Indonesia", value: "Indonesia" };
    const optionsWithIndonesia = [indonesiaOption, ...mappedData];
    setNegaraOpsi(optionsWithIndonesia);
  }
  fetchData();
}, []);

  const contextValue = {

    negaraOpsi,
    state,
    setState,
    ada_penyakit,
    setAdaPenyakit,
    ada_cacat,
    setAdaCacat,
    warga_asingAyah,
    setWargaAsingAyah,
    warga_asing,
    setWargaAsing,
    warga_asingIbu,
    setWargaAsingIbu,
    warga_asingWali,
    setWargaAsingWali,
    ada_wali,
    setAdaWali,
    steps
  }
  return (

    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}