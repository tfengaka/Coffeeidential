import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

function useQRCode(value: string) {
  const [qrData, setQRData] = useState('');

  useEffect(() => {
    // initial QR Code
    (function () {
      const QRValue = value;
      QRCode.toDataURL(
        QRValue,
        {
          width: 256,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        },
        (err, url) => {
          if (err) return console.error(err);
          setQRData(url);
        }
      );
    })();
  }, [value]);

  return qrData;
}

export default useQRCode;
