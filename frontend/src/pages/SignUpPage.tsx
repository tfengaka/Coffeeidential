import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Icons from '~/assets/icons';
import images from '~/assets/images';
import { Button, Checkbox, FormInput } from '~/components';
import router from '~/constants/routers';
import { useAuth } from '~/hooks';
import { SignUpForm } from '~/types';

function SignUpPage() {
  const { handleSignUp } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpForm>({
    resolver: yupResolver(
      Yup.object({
        email: Yup.string().email('Email không hợp lệ').required('Thông tin bắt buộc'),
        fullName: Yup.string().required('Thông tin bắt buộc'),
        password: Yup.string().required('Thông tin bắt buộc').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
        repassword: Yup.string()
          .required('Thông tin bắt buộc')
          .oneOf([Yup.ref('password')], 'Mật khẩu không khớp'),
      })
    ),
    mode: 'onSubmit',
  });

  const onSubmit = handleSubmit((data) => {
    handleSignUp({ email: data.email, fullName: data.fullName, password: data.password });
  });

  return (
    <div className="flex items-center">
      <div className="items-center flex-grow-0 flex-shrink-0 hidden px-3 md:flex w-[50%]">
        <img src={images.farmer_2} alt="..." className="block object-cover w-full h-full mx-auto" />
      </div>
      <div className="flex-1 md:max-w-[50%]">
        <div className="px-5 mx-auto">
          <div className="w-full ">
            <p className="my-3 text-2xl font-bold text-center text-icon">Đăng ký tài khoản</p>
            <form onSubmit={onSubmit}>
              <FormInput
                control={control}
                title="Địa chỉ Email"
                name="email"
                placeholder="Email"
                required
                type="text"
                icon={<Icons.Card />}
                error={errors.email?.message}
              />
              <FormInput
                control={control}
                title="Tên doanh nghiệp"
                name="fullName"
                placeholder="Tên doanh nghiệp"
                required
                type="text"
                icon={<Icons.Company />}
                error={errors.fullName?.message}
              />
              <div className="flex items-center justify-between gap-x-4">
                <FormInput
                  control={control}
                  title="Mật khẩu"
                  name="password"
                  placeholder="Mật khẩu"
                  required
                  type={showPass ? 'text' : 'password'}
                  icon={<Icons.Key />}
                  error={errors.password?.message}
                />
                <FormInput
                  control={control}
                  title="Nhập lại mật khẩu"
                  name="repassword"
                  placeholder="Mật khẩu"
                  required
                  type={showPass ? 'text' : 'password'}
                  icon={<Icons.Key />}
                  error={errors.repassword?.message}
                />
              </div>
              <div className="mb-4">
                <Checkbox
                  label="Hiện thị mật khẩu"
                  name="show_pass"
                  value={showPass}
                  onClick={() => setShowPass(!showPass)}
                />
              </div>
              <div className="text-left">
                <Button
                  type="submit"
                  className="w-full px-5 py-2 text-lg text-white bg-primary shadow-success hover:shadow-success_hover"
                >
                  Đăng ký
                </Button>
                <p className="mt-3 font-bold text-icon">
                  Đã có tài khoản?{' '}
                  <Link to={router.auth.signIn} className="text-primary20">
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
