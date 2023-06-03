import { Markup } from 'interweave';

interface IProductDescription {
  isActive: boolean;
  content: string;
}

function ProductDescription({ isActive, content }: IProductDescription) {
  return (
    <div className={`${isActive ? 'block' : 'hidden'}`}>
      <div className="p-2 border-b border-slate-100">
        <p className="text-sm font-medium text-slate-400">Giới thiệu</p>
        <h4 className="text-xl font-bold text-icon">Thông tin sản phẩm</h4>
      </div>
      <div className="w-full px-2 pb-4 mt-4">
        <Markup content={content} />
      </div>
    </div>
  );
}

export default ProductDescription;
