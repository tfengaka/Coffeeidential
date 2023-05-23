import { Fragment, useState } from 'react';
import Icons from '~/assets/icons';
import images from '~/assets/images';
import { Button, Uploader } from '~/components';
import { AuthUser, IContentPanelProps } from '~/types';

interface IBrandingProps extends IContentPanelProps {
  user?: AuthUser;
}

function Branding({ isActive, user }: IBrandingProps) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className={`${isActive ? 'block' : 'hidden'}`}>
      <div className="mb-4">
        <h5 className="text-[20px] font-semibold text-icon mb-1">Thương hiệu</h5>
        <p className="font-light text-slate-400">Thiết lập logo và banner</p>
      </div>
      <div className="relative h-[180px] mt-5 shadow-card">
        <div className="absolute z-50 flex items-center bottom-4 right-4 gap-x-4">
          {isEdit ? (
            <Fragment>
              <Button
                className="flex items-center px-4 py-2 text-white shadow-dangers bg-danger gap-x-2 hover:shadow-danger_hover hover:-translate-y-[2px]"
                onClick={() => setIsEdit(false)}
              >
                Hủy bỏ
              </Button>
              <Button className="flex items-center px-4 py-2 text-white shadow-success bg-primary gap-x-2 hover:shadow-success_hover  hover:-translate-y-[2px]">
                Lưu lại
              </Button>
            </Fragment>
          ) : (
            <Button
              className="flex items-center px-4 py-2 text-white shadow-success bg-primary gap-x-2 hover:shadow-success hover:-translate-y-[2px]"
              onClick={() => setIsEdit(true)}
            >
              <Icons.Edit />
              Chỉnh sửa
            </Button>
          )}
        </div>
        <div className="relative w-full h-full">
          {isEdit ? (
            <Uploader className="w-full h-full rounded-lg" />
          ) : (
            <img
              src={user?.banner || images.default_banner}
              alt="banner"
              className="object-cover w-full h-full rounded-md"
            />
          )}
        </div>
      </div>
      <div>
        <div className="relative flex items-center justify-center p-2 bg-white rounded-full w-36 h-36 -top-16 left-4 shadow-card">
          {isEdit ? (
            <Uploader className="w-full h-full rounded-full" />
          ) : (
            <img src={user?.avatar || images.logo} alt="" className="object-cover w-full h-full" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Branding;
