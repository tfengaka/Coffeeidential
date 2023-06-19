import { NavLink, Outlet } from 'react-router-dom';
import images from '~/assets/images';
import { Card } from '~/components';
import { profilePanelLinks } from '~/constants/navlinks';
import { useAppSelector } from '~/redux';

function Profile() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Card className="w-full h-fit min-h-[500px]">
      <div className="flex w-full h-full">
        <div className="border-r border-[#eeeff8] basis-1/4">
          <div className="p-6">
            <div className="border-b border-[#eeeff8] pb-5">
              <div className="block p-1 border-[3px] rounded-full w-28 h-28 border-primary20 mx-auto overflow-hidden">
                <img src={user?.avatar || images.logo} alt="avatar" className="object-cover w-full h-full" />
              </div>
              <div className="mt-5 font-bold text-center text-icon">
                <h4 className="my-1 text-base">{user?.full_name}</h4>
                <h5 className="my-1 text-sm">Mã số: {user?._id}</h5>
              </div>
            </div>
            <div className="flex flex-col mt-5 gap-y-2">
              {profilePanelLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.link}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-2 font-semibold text-icon2 gap-x-4 hover:bg-primary hover:bg-opacity-10 hover:text-primary40 text-[16px] ${
                      isActive ? 'bg-primary bg-opacity-10 text-primary40' : ''
                    } transition-all`
                  }
                >
                  {link.icon}
                  <span>{link.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Profile;
