import { useForm } from 'react-hook-form';
import { Button, FormInput, QuillEditor } from '~/components';
import { AuthUser, IContentPanelProps } from '~/types';

interface IAccountInfoProps extends IContentPanelProps {
  user?: AuthUser;
}

function AccountInfo({ isActive, user }: IAccountInfoProps) {
  const { control } = useForm({
    defaultValues: {
      full_name: user?.full_name,
      description: user?.description,
    },
  });

  return (
    <div className={`${isActive ? 'block' : 'hidden'}`}>
      <form>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="text-[20px] font-semibold text-icon mb-1">Thông tin tài khoản</h5>
            <p className="font-light text-slate-400">Tên, giới thiệu và mã doanh nghiệp</p>
          </div>
          <Button
            className="flex items-center px-4 py-2 text-white shadow-success bg-primary gap-x-2 hover:shadow-success_hover  hover:-translate-y-[2px]"
            type="submit"
          >
            Lưu lại
          </Button>
        </div>
        <FormInput control={control} name="full_name" title="Tên doanh nghiệp" required />
        <div>
          <p className="mb-2 text-sm font-semibold font-body text-icon">Giới thiệu doanh nghiệp</p>
          <QuillEditor control={control} name="description" />
        </div>
      </form>
    </div>
  );
}

export default AccountInfo;
