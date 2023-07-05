import { Markup } from 'interweave';

interface IProductDescription {
  isActive: boolean;
  content?: string;
  hash?: string;
}

function ProductDescription({ isActive, content, hash }: IProductDescription) {
  return (
    <div className={`${isActive ? 'block' : 'hidden'}`}>
      <div className="p-2 pb-1 border-b border-slate-100">
        <p className="text-sm font-medium text-slate-400">Giới thiệu</p>
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-bold text-icon">Thông tin sản phẩm</h4>
          <a
            href={`${import.meta.env.VITE_EXPLORER_URL}/tx/${hash}`}
            className="inline-flex ml-1 font-bold underline transition-colors text-primary20 gap-x-1"
            target="_blank"
            rel="noreferrer"
          >
            Link Block Explorer sản phẩm
          </a>
        </div>
      </div>
      <div className="w-full px-2 pb-4 mt-4">
        <Markup content={content} className="text-icon" />
      </div>
    </div>
  );
}

export default ProductDescription;
