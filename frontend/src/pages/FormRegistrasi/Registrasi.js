import { Outlet } from 'react-router-dom';
import { AppProvider } from "../../hooks/save-input";
import { Sidebar } from '../../UI/Sidebar';
import { useAppState } from '../../hooks/save-input';
import  Stepper from 'react-stepper-horizontal';
import { useState } from 'react';

export const Registrasi = (props) => {
    const { activeStep, setActiveStep } = useAppState();


    return (
        <>
            <AppProvider>
                <Outlet />
            </AppProvider>
        </>
    )
}