import { Fragment, useId, useState } from 'react';
import Icons from '~/assets/icons';
import { convertFileToBase64 } from '~/utils';
import Button from './Button';

interface IUploader {
  className?: string;
}

function Uploader({ className }: IUploader) {
  const id = useId();
  const [image, setImage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      convertFileToBase64(file).then((url) => {
        setImage(url);
      });
    }
  };

  return (
    <div className={`relative flex items-center justify-center border-dashed border-2 border-[#4191ff] ${className}`}>
      {image ? (
        <Fragment>
          <Button
            className="absolute -top-3 -right-3 text-white !rounded-full bg-danger hover:bg-red-700 z-50"
            onClick={() => setImage('')}
          >
            <Icons.Close />
          </Button>
          <img
            src={image}
            alt="avatar"
            className="z-0 object-cover w-full h-full"
            style={{ borderRadius: 'inherit' }}
          />
          <label
            htmlFor={id}
            className="absolute inset-0 z-0 w-full h-full transition-all bg-white opacity-0 cursor-pointer bg-opacity-95 hover:opacity-100"
            style={{ borderRadius: 'inherit' }}
          >
            <div className="flex flex-col items-center justify-center w-full h-full text-[#4191ff] scale-125">
              <Icons.Upload />
            </div>
          </label>
        </Fragment>
      ) : (
        <label
          htmlFor={id}
          className="z-0 flex flex-col items-center justify-center w-full transition-all border-dashed rounded-lg cursor-pointer hover:scale-125"
        >
          <div className="flex flex-col items-center justify-center text-[#4191ff]">
            <Icons.Upload />
          </div>
        </label>
      )}
      <input id={id} type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleInputChange} />
    </div>
  );
}

export default Uploader;
