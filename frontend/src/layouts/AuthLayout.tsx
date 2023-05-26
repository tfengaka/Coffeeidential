import { useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Backdrop, Loading } from '~/components';

import router from '~/constants/routers';
import { useAuth } from '~/hooks';
import { useAppSelector } from '~/redux';

function AuthLayout() {
  const navigate = useNavigate();
  const { loading, handleGetMe } = useAuth();
  const user = useAppSelector((state) => state.auth.user);

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    setTimeout(() => {
      if (user) {
        navigate(router.dashboard.root);
      } else {
        if (accessToken) {
          handleGetMe(() => navigate(router.dashboard.root));
        }
      }
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen app-wrapper">
      {loading && (
        <Backdrop>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Loading />
          </div>
        </Backdrop>
      )}
      <div className="app-main font-landing">
        <div className="app-content">
          <div className="items-center app-content--inner">
            <div className="flex items-center flex-grow w-full">
              <div className="relative z-10 w-full">
                <div className="w-full px-[20px] mx-auto md:max-w-[1140px]">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
