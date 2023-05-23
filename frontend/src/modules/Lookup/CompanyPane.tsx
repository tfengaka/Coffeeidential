import { Markup } from 'interweave';
import Icons from '~/assets/icons';
import { IContentPanelProps } from '~/types';

function CompanyPane({ isActive }: IContentPanelProps) {
  return (
    <div className={`${isActive ? 'block' : 'hidden'}`}>
      <div className="p-2 border-b border-slate-100">
        <p className="text-sm font-medium text-slate-400">Sản xuất bởi</p>
        <h4 className="text-xl font-bold">{'Công ty TNHH Sản xuất Thương mại và Dịch vụ Phong Thúy'}</h4>
      </div>
      <div className="px-2 py-4 border-b border-slate-100">
        <h4 className="mb-2 text-xl font-bold">Mô tả</h4>
        <Markup className="text-icon" content={'<p><strong>Lĩnh vực:</strong>&nbsp;Bán buôn thực phẩm</p>'} />
      </div>
      <div className="p-2 pb-4">
        <h4 className="mb-4 text-xl font-bold">Thông tin liên hệ</h4>
        <div className="flex flex-col gap-y-6">
          {/* Phone */}
          <div className="flex items-center px-2 gap-x-6">
            <div className="p-3 text-white rounded-full bg-primary20">
              <Icons.Phone />
            </div>
            <a
              className="text-base font-bold underline transition-colors hover:text-primary text-icon"
              href={`tel:${'0123456789'}`}
            >
              {'0123456789'}
            </a>
          </div>
          {/* Email */}
          <div className="flex items-center px-2 gap-x-6">
            <div className="p-3 text-white rounded-full bg-primary20">
              <Icons.Email />
            </div>
            <a
              className="text-base font-bold underline transition-colors text-icon hover:text-primary"
              href={`mailto:${'nthoa2.lhp.nh@gmail.com'}`}
            >
              {'nthoa2.lhp.nh@gmail.com'}
            </a>
          </div>
          {/* Website */}
          <div className="flex items-center px-2 gap-x-6">
            <div className="p-3 text-white rounded-full bg-primary20">
              <Icons.Globe />
            </div>
            <a
              className="text-base font-bold underline transition-colors hover:text-primary text-icon"
              href={'https://www.google.com'}
              target="_blank"
              rel="noreferrer"
            >
              {'https://www.google.com'}
            </a>
          </div>
          {/* Address */}
          <div className="flex items-center px-2 gap-x-6">
            <div className="p-3 text-white rounded-full bg-primary20">
              <Icons.Location />
            </div>
            <span className="text-base font-bold transition-colors hover:text-primary text-icon">
              {'Số 450 Lê Văn Việt, Phường Tăng Nhơn Phú A, Quận 9, Thành phố Hồ Chí Minh'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyPane;
