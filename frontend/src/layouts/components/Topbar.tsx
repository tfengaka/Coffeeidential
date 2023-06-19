import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icons from '~/assets/icons';
import images from '~/assets/images';
import { Button, Card } from '~/components';
import router from '~/constants/routers';
import { useAppDispatch, useAppSelector } from '~/redux';
import { signOut } from '~/redux/reducers/authSlice';

function Topbar() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const dispath = useAppDispatch();
  const [openMenu, setOpenMenu] = useState(false);

  const handleSignOut = () => {
    setOpenMenu(false);
    dispath(signOut());
    navigate(router.auth.signIn);
  };

  return (
    <div className="fixed right-[2rem] top-[1rem] w-[calc(100%-300px-4rem)] flex items-center py-1 bg-white rounded-lg shadow-card z-50">
      <div className="flex items-center justify-between w-full">
        <div></div>
        <div className="relative px-3 py-1 ml-3 bg-white rounded">
          <Button
            className={`flex items-center p-0 text-left cursor-pointer hover:text-primary ${
              openMenu ? 'text-primary20' : 'text-icon'
            }`}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <div className="hidden pr-2 text-right md:block">
              <p className="font-bold text-icon">{user?.full_name}</p>
              <span className="font-medium text-icon opacity-70">Nhà sản xuất</span>
            </div>
            <div className="relative p-0">
              <div className="rounded-xl overflow-hidden w-[44px] h-[44px] ">
                <img src={user?.avatar || images.logo} alt="" className="object-cover" />
              </div>
            </div>
          </Button>
          <Card
            className={`${
              openMenu ? 'block' : 'hidden'
            } absolute right-0 w-full max-w-[200px] py-2 rounded-md -bottom-23 shadow-dropdown`}
          >
            <h6 className="px-2 pb-2 mb-2 text-sm font-medium border-b border-slate-200 text-slate-500">Xin chào,</h6>
            <Link
              to={router.dashboard.profile.root}
              className="flex items-center px-3 py-2 font-medium transition-colors rounded-sm gap-x-4 text-icon hover:text-primary hover:bg-slate-200 hover:bg-opacity-50"
              onClick={() => setOpenMenu(false)}
            >
              <Icons.User />
              Tài khoản
            </Link>
            <Button
              className="flex items-center w-full px-3 py-2 font-medium transition-colors rounded-sm gap-x-4 text-icon hover:text-primary hover:bg-slate-200 hover:bg-opacity-50"
              onClick={handleSignOut}
            >
              <Icons.Logout />
              Đăng xuất
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
