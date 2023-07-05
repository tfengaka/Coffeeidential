import { Markup } from 'interweave';
import Icons from '~/assets/icons';
import { AuthUser } from '~/types';

interface ICompanyPane {
  isActive: boolean;
  producer: AuthUser;
}

function CompanyPane({ isActive, producer }: ICompanyPane) {
  return (
    <div className={`${isActive ? 'block' : 'hidden'}`}>
      <div className="p-2 border-b border-slate-100">
        <p className="text-sm font-semibold text-slate-400">Sản xuất bởi</p>
        <h4 className="text-lg font-bold text-icon">{producer.full_name}</h4>
      </div>
      <div className="px-2 py-4 border-b border-slate-100">
        <h4 className="mb-2 text-xl font-bold">Mô tả</h4>
        <Markup className="font-semibold text-icon2 font-landing" content={producer.description} />
      </div>
      <div className="p-2 pb-4">
        <h4 className="mb-4 text-xl font-bold">Thông tin liên hệ</h4>
        <div className="flex flex-col gap-y-6">
          {/* Phone */}
          {producer?.phone && (
            <div className="flex items-center px-2 gap-x-6">
              <div className="p-3 text-white rounded-full bg-primary20">
                <Icons.Phone />
              </div>

              <a
                className="text-base font-bold underline transition-colors hover:text-primary text-icon"
                href={`tel:${producer.phone}`}
              >
                {producer.phone}
              </a>
            </div>
          )}

          {/* Email */}
          <div className="flex items-center px-2 gap-x-6">
            <div className="p-3 text-white rounded-full bg-primary20">
              <Icons.Email />
            </div>
            <a
              className="text-base font-bold underline transition-colors text-icon hover:text-primary"
              href={`mailto:${producer?.email}`}
            >
              {producer?.email}
            </a>
          </div>
          {/* Website */}
          {producer?.website && (
            <div className="flex items-center px-2 gap-x-6">
              <div className="p-3 text-white rounded-full bg-primary20">
                <Icons.Globe />
              </div>
              <a
                className="text-base font-bold underline transition-colors hover:text-primary text-icon"
                href={producer?.website}
                target="_blank"
                rel="noreferrer"
              >
                {producer?.website}
              </a>
            </div>
          )}
          {/* Address */}
          {producer?.address && (
            <div className="flex items-center px-2 gap-x-6">
              <div className="p-3 text-white rounded-full bg-primary20">
                <Icons.Location />
              </div>
              {producer?.address && (
                <span className="text-base font-bold transition-colors hover:text-primary text-icon">
                  {producer.address}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyPane;
