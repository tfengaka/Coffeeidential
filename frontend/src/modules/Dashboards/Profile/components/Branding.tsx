import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import { UserApi } from '~/api';
import Icons from '~/assets/icons';
import images from '~/assets/images';
import { Button, Uploader } from '~/components';
import { useAppDispatch, useAppSelector } from '~/redux';
import { setMe } from '~/redux/reducers/authSlice';

function Branding() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [isEdit, setIsEdit] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [banner, setBanner] = useState('');

  const onReset = () => {
    setIsEdit(false);
    setAvatar('');
    setBanner('');
  };

  const handleComfirm = async () => {
    try {
      const res = await UserApi.updateBranding({ avatar, banner });
      if (res) {
        dispatch(setMe(res));
        setIsEdit(false);
        toast.success('Đã cập nhật thông tin!');
      }
    } catch (error) {
      toast.error('Lỗi!');
      console.error(error);
    }
  };

  return (
    <div>
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
                onClick={onReset}
              >
                Hủy bỏ
              </Button>
              <Button
                className="flex items-center px-4 py-2 text-white shadow-success bg-primary gap-x-2 hover:shadow-success_hover  hover:-translate-y-[2px]"
                onClick={handleComfirm}
              >
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
            <Uploader className="w-full h-full rounded-lg" value={banner} onChange={(url) => setBanner(url)} />
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
        <div className="relative flex items-center justify-center bg-white rounded-full w-36 h-36 -top-16 left-4 shadow-card">
          {isEdit ? (
            <Uploader className="w-full h-full rounded-full" value={avatar} onChange={(url) => setAvatar(url)} />
          ) : (
            <img
              src={user?.avatar || images.logo}
              alt="avatar"
              className="object-cover w-full h-full p-1 rounded-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Branding;
