import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Button, Checkbox, FormInput } from '~/components';
import { ChangePasswordForm } from '~/types';

function ChangePassword() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(
      Yup.object({
        oldPassword: Yup.string().required('Thông tin bắt buộc'),
        newPassword: Yup.string().required('Thông tin bắt buộc').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
        reNewPassword: Yup.string()
          .required('Thông tin bắt buộc')
          .oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp'),
      })
    ),
  });
  const [showPass, setShowPass] = useState(false);

  const onSubmit = handleSubmit((data) => console.log('ChangePassword', data));

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="text-[20px] font-semibold text-icon mb-1">Đổi mật khẩu</h5>
            <p className="font-light text-slate-400">Thay đổi mật khẩu tài khoản</p>
          </div>
          <Button
            className="flex items-center px-4 py-2 text-white shadow-success bg-primary gap-x-2 hover:shadow-success_hover  hover:-translate-y-[2px]"
            type="submit"
          >
            Xác nhận
          </Button>
        </div>
        <FormInput
          control={control}
          title="Mật khẩu cũ"
          name="oldPassword"
          placeholder="Mật khẩu cũ"
          required
          type={showPass ? 'text' : 'password'}
          error={errors.oldPassword?.message}
        />
        <FormInput
          control={control}
          title="Mật khẩu"
          name="newPassword"
          placeholder="Mật khẩu mới"
          required
          type={showPass ? 'text' : 'password'}
          error={errors.newPassword?.message}
        />
        <FormInput
          control={control}
          title="Nhập lại mật khẩu mới"
          name="reNewPassword"
          placeholder="Mật khẩu"
          required
          type={showPass ? 'text' : 'password'}
          error={errors.reNewPassword?.message}
        />
        <div className="mb-4">
          <Checkbox
            label="Hiện thị mật khẩu"
            name="show_pass"
            value={showPass}
            onClick={() => setShowPass(!showPass)}
          />
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
