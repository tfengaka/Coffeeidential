import { useForm } from 'react-hook-form';
import { Button, FormInput, TextField } from '~/components';
import { useAppSelector } from '~/redux';
import { AuthUser, IContentPanelProps } from '~/types';

interface IContactInfoProps extends IContentPanelProps {
  user?: AuthUser;
}

function ContactInfo({ isActive }: IContactInfoProps) {
  const { control } = useForm();
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className={`${isActive ? 'block' : 'hidden'}`}>
      <form>
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
        <FormInput control={control} name="phone_number" title="Số điện thoại" />
      </form>
    </div>
  );
}

export default ContactInfo;
