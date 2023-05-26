import { Fragment, useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { Backdrop, Loading } from '~/components';
import router from '~/constants/routers';
import { useAuth } from '~/hooks';
import { useAppSelector } from '~/redux';
import { SideBar, Topbar } from './components';

function DashboardLayout() {
  const navigate = useNavigate();
  const { loading, error, handleGetMe } = useAuth();
  const user = useAppSelector((state) => state.auth.user);

  useLayoutEffect(() => {
    if (!user) {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        setTimeout(() => {
          handleGetMe();
        }, 500);
      } else {
        navigate(router.auth.signIn);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="app-wrapper !bg-[#f8f8f8] min-h-screen">
        <Backdrop>
          <div className="flex flex-col items-center justify-center w-full h-full bg-white gap-y-4 font-landing">
            <img src={images.illustration_500} alt="" className="object-cover w-[400px] h-[300px]" />
            <div className="text-center">
              <h4 className="text-3xl font-bold text-icon">Hệ thống đang gặp sự cố</h4>
              <p className="text-lg font-semibold text-icon2">Xin vui lòng quay lại sau!</p>
            </div>
          </div>
        </Backdrop>
      </div>
    );
  }

  return (
    <div className="app-wrapper !bg-[#f8f8f8] min-h-screen">
      {loading ? (
        <Backdrop>
          <div className="flex flex-col items-center justify-center w-full h-full bg-white gap-y-4">
            <Loading />

            <h4 className="font-bold text-center text-icon">
              Hệ thống đang xử lý, <span className="font-semibold text-icon2">Xin vui lòng chờ trong giây lát!</span>
            </h4>
          </div>
        </Backdrop>
      ) : (
        <Fragment>
          <div>
            <SideBar />
          </div>
          <div className="relative app-main">
            <div className="ml-[300px] px-3 flex w-full h-[74px]">
              <Topbar />
            </div>
            <div className="app-content !pl-[300px]">
              <div className="app-content--inner">
                <Outlet />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default DashboardLayout;
