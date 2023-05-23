import { Markup } from 'interweave';
import { IContentPanelProps } from '~/types';

function ProductDescription({ isActive }: IContentPanelProps) {
  return (
    <div className={`${isActive ? 'block' : 'hidden'}`}>
      <div className="p-2 border-b border-slate-100">
        <p className="text-sm font-medium text-slate-400">Giới thiệu</p>
        <h4 className="text-xl font-bold text-icon">Thông tin sản phẩm</h4>
      </div>
      <div className="w-full px-2 pb-4 mt-4">
        <Markup
          content={
            '<p><strong>Mô tả sản phẩm</strong>&nbsp;</p><p><span style="color: rgb(33, 43, 54);">Cà chua bi trái nhỏ, tròn hoặc dài, màu đỏ đều, đặc biệt có vị ngọt nhiều hơn cà chua thường. Cà chua bi cũng rất dễ trồng và cho quả sai. Với những món salad, bạn nên chọn cà chua bi để chế biến. Vì ngoài vị ngọt, cà chua bi còn rất giòn và tươi mát. Ngoài ra, loại cà chua này còn được sử dụng để lấy nước ép, làm mứt, trang trí món ăn cho đẹp mắt</span></p><p><strong style="color: rgb(33, 43, 54);">Khối lượng tịnh</strong></p><p><span style="color: rgb(33, 43, 54);">300g</span>&nbsp;</p>'
          }
        />
      </div>
    </div>
  );
}

export default ProductDescription;
