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
import { SignInForm } from '~/types';

function SignInPage() {
  const { handleSignIn } = useAuth();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInForm>({
    resolver: yupResolver(
      Yup.object({
        email: Yup.string().email('Email không hợp lệ').required('Thông tin bắt buộc'),
        password: Yup.string().required('Thông tin bắt buộc'),
      })
    ),
    mode: 'onSubmit',
  });
  const [showPass, setShowPass] = useState(false);

  const onSubmit = handleSubmit((data) => handleSignIn(data));

  return (
    <div className="flex items-center">
      <div className="items-center flex-grow-0 flex-shrink-0 hidden px-3 md:flex w-[50%]">
        <img src={images.farmer} alt="..." className="block object-cover w-full h-full mx-auto" />
      </div>
      <div className="flex-1 md:max-w-[50%]">
        <div className="px-5 mx-auto">
          <div className="w-full ">
            <p className="my-3 text-2xl font-bold text-center text-icon">Đăng nhập</p>
            <form onSubmit={onSubmit}>
              <FormInput
                control={control}
                title="Địa chỉ Email"
                name="email"
                placeholder="Email"
                required
                type="text"
                icon={<Icons.User />}
                error={errors.email?.message}
              />
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
                  Đăng nhập
                </Button>
                <p className="mt-3 font-bold text-icon">
                  Chưa có tài khoản?{' '}
                  <Link to={router.auth.signUp} className="text-primary">
                    Đăng ký
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

export default SignInPage;
