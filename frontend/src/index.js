import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./assets/admin/scss/style.scss";
import App from './App';
import { Provider } from 'react-redux';
import Loader from './layouts/loader/Loader';
import store from './features/store';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
    <Provider store={store}>
        <Suspense fallback={<Loader/>}>
            <App />
        </Suspense>
    </Provider>
     
   

 
);


