import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserApi } from '~/api';
import { Button, FormInput, TextField } from '~/components';
import router from '~/constants/routers';
import { useAppDispatch, useAppSelector } from '~/redux';
import { setMe } from '~/redux/reducers/authSlice';

function ContactInfo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      website: user?.website || '',
      address: user?.address || '',
      phone: user?.phone || '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await UserApi.updateContactInfo(data);
      if (res) {
        dispatch(setMe(res));
        navigate(router.dashboard.profile.branding);
        toast.success('Đã cập nhật thông tin!');
      }
    } catch (error) {
      toast.error('Lỗi!');
      console.error(error);
    }
  });
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="text-[20px] font-semibold text-icon mb-1">Thông tin liên lạc</h5>
            <p className="font-light text-slate-400">Thông tin địa chỉ liên lạc</p>
          </div>
          <Button
            className="flex items-center px-4 py-2 text-white shadow-success bg-primary gap-x-2 hover:shadow-success_hover  hover:-translate-y-[2px]"
            type="submit"
          >
            Lưu lại
          </Button>
        </div>
        <TextField title="Email đăng nhập tài khoản" required disable value={user?.email} />
        <FormInput control={control} name="website" title="Địa chỉ website" />
        <FormInput control={control} name="address" title="Địa chỉ" />
        <FormInput control={control} name="phone" title="Số điện thoại" />
      </form>
    </div>
  );
}

export default ContactInfo;
