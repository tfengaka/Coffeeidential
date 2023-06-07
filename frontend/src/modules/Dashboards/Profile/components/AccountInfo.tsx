import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserApi } from '~/api';
import { Button, FormInput, QuillEditor } from '~/components';
import router from '~/constants/routers';
import { useAppDispatch, useAppSelector } from '~/redux';
import { setMe } from '~/redux/reducers/authSlice';

function AccountInfo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      full_name: user?.full_name || '',
      description: user?.description || '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await UserApi.updateAccountInfo(data);
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
            <h5 className="text-[20px] font-semibold text-icon mb-1">Thông tin tài khoản</h5>
            <p className="font-light text-slate-400">Tên, giới thiệu và mã doanh nghiệp</p>
          </div>
          <Button
            className="flex items-center px-4 py-2 text-white shadow-success bg-primary gap-x-2 hover:shadow-success_hover  hover:-translate-y-[2px]"
            type="submit"
          >
            Lưu lại
          </Button>
        </div>
        <FormInput control={control} name="full_name" title="Tên doanh nghiệp" required />
        <QuillEditor control={control} name="description" title="Giới thiệu doanh nghiệp" />
      </form>
    </div>
  );
}

export default AccountInfo;
