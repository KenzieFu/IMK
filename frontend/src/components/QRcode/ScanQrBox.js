import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const ScanQrBox = (props) => {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '50%' }}
      />
      <p>{data}</p>
    </>
  );
};