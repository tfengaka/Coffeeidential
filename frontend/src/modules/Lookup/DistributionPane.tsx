import images from '~/assets/images';
import { IContentPanelProps } from '~/types';

function DistributionPane({ isActive }: IContentPanelProps) {
  return (
    <div className={`${isActive ? 'block' : 'hidden'}`}>
      <div className="p-2 border-b border-slate-100">
        <p className="text-sm font-medium text-slate-400">Phân phối bởi</p>
        <h4 className="text-xl font-bold text-icon">{'Thông tin nhà phân phối'}</h4>
      </div>
      <div className="flex flex-col items-center justify-center pb-4 mt-4">
        <img src={images.coming_soon} alt="" className="w-full h-full max-h-[300px] object-contain mt-4" />
        <span className="px-2 py-1 mt-4 font-bold text-icon text-[18px]">Thông tin đang được cập nhật</span>
      </div>
    </div>
  );
}

export default DistributionPane;
