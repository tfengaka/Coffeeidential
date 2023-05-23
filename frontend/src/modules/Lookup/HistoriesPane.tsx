import { IContentPanelProps } from '~/types';
import DiaryProcess from './components/DiaryProcess';
function HistoriesPane({ isActive }: IContentPanelProps) {
  return (
    <div className={`${isActive ? 'block' : 'hidden'} font-landing`}>
      <div className="p-2 border-b border-slate-100">
        <p className="text-[16px] text-slate-400">Nhật ký sản xuất</p>
        <h4 className="text-[22px] font-bold text-icon mb-1">Truy xuất nguồn gốc</h4>
        <p className="text-[16px] text-icon2">
          Thông tin được <b className="text-icon">{'Công ty TNHH Sản xuất Thương mại và Dịch vụ Phong Thúy'}</b> ghi
          nhật ký trong quá trình sản xuất
        </p>
      </div>
      <div className="px-2 mt-4">
        <ol className="relative border-l-[2px] border-primary40">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <DiaryProcess key={index} />
            ))}
        </ol>
      </div>
    </div>
  );
}

export default HistoriesPane;
