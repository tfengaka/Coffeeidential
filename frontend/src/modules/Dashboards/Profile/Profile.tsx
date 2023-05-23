import { useState } from 'react';
import { Button, Card } from '~/components';
import { profilePanelLinks } from '~/constants/navlinks';
import { AccountInfo, Branding, ChangePassword, ContactInfo } from './components';
import { useAppSelector } from '~/redux';

function Profile() {
  const [activePanel, setActivePanel] = useState(2);
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Card className="w-full h-fit min-h-[500px]">
      <div className="flex w-full h-full">
        <div className="border-r border-[#eeeff8] basis-1/4">
          <div className="p-6">
            <div className="border-b border-[#eeeff8] pb-5">
              <div className="block p-1 border-[3px] rounded-full w-28 h-28 border-primary20 mx-auto overflow-hidden">
                <img
                  src="https://res.cloudinary.com/agridential/image/upload/v1590569683/New_agridential/agd_black_text_wvvrqr.png"
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-5 font-bold text-center text-icon">
                <h4 className="my-1 text-base">{user?.fullName}</h4>
                <h5 className="my-1 text-sm">Mã số: {user?.id}</h5>
              </div>
            </div>
            <div className="flex flex-col mt-5 gap-y-2">
              {profilePanelLinks.map((link, index) => (
                <Button
                  key={index}
                  className={`flex items-center px-6 py-2 font-semibold text-icon2 gap-x-4 hover:bg-primary hover:bg-opacity-10 hover:text-primary40 text-[16px] ${
                    activePanel === index ? 'bg-primary bg-opacity-10 text-primary40' : ''
                  }`}
                  onClick={() => setActivePanel(index)}
                >
                  {link.icon}
                  <span>{link.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-auto">
          <div className="p-6">
            <AccountInfo isActive={activePanel === 0} user={user} />
            <ContactInfo isActive={activePanel === 1} user={user} />
            <Branding isActive={activePanel === 2} user={user} />
            <ChangePassword isActive={activePanel === 3} />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Profile;
