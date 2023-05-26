import { useState } from 'react';
import { Button, QuillEditor, TextField } from '~/components';
import { AuthUser, IContentPanelProps } from '~/types';

interface IAccountInfoProps extends IContentPanelProps {
  user?: AuthUser;
}

function AccountInfo({ isActive, user }: IAccountInfoProps) {
  const [companyName, setCompanyName] = useState(user?.full_name);
  const [companyDesc, setCompanyDesc] = useState('');

  return (
    <div className={`${isActive ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-[20px] font-semibold text-icon mb-1">Thông tin tài khoản</h5>
          <p className="font-light text-slate-400">Tên, giới thiệu và mã doanh nghiệp</p>
        </div>
        <Button className="flex items-center px-4 py-2 text-white shadow-success bg-primary gap-x-2 hover:shadow-success_hover  hover:-translate-y-[2px]">
          Lưu lại
        </Button>
      </div>
      <form>
        <TextField
          value={companyName}
          name="name"
          title="Tên doanh nghiệp"
          required
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div>
          <p className="mb-2 text-sm font-semibold font-body text-icon">Giới thiệu doanh nghiệp</p>
          <QuillEditor value={companyDesc} onChange={(value) => setCompanyDesc(value)} />
        </div>
      </form>
    </div>
  );
}

export default AccountInfo;
