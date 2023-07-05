import moment from 'moment';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductApi } from '~/api';
import Icons from '~/assets/icons';
import images from '~/assets/images';
import { Button, Card, Tag } from '~/components';
import router from '~/constants/routers';
import { useAppDispatch } from '~/redux';
import { setProduct, updateStatus } from '~/redux/reducers/productSlice';
import { Product } from '~/types';

interface ProductTableProps {
  title?: string;
  height?: number;
  data: Product[];
}

function ProductTable({ title, height, data }: ProductTableProps) {
  const dispatch = useAppDispatch();

  const handleUpdateStatus = async (id: string, status: boolean) => {
    try {
      const res = await ProductApi.updateProductStatus(id, status);
      if (res._id) {
        dispatch(updateStatus({ id: res._id, status }));
        toast.success('Cập nhật trạng thái thành công');
      }
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  return (
    <Card className="p-2 mt-5 ">
      {title && (
        <div className="mb-4 text-sm font-semibold font-body text-icon">
          <span>{title}</span>
        </div>
      )}

      <table className="w-full h-full overflow-y-auto">
        <thead className="w-full font-semibold text-[15px] font-body text-icon border-b border-slate-200">
          <tr className="flex items-center w-full text-left select-none">
            <th className="px-5 py-3">STT</th>
            <th className="flex-auto px-5 py-3 max-w-[35%]">Sản phẩm</th>
            <th className="w-[15%] px-5 py-3">Mã GTIN</th>
            <th className="w-[10%] px-5 py-3">Trạng thái</th>
            <th className="w-2/12 px-5 py-3">Ngày sản xuất</th>
            <th className="w-[20%] px-5 py-3">Hành động</th>
          </tr>
        </thead>

        <tbody
          className="block w-full overflow-y-auto scroll-bar"
          style={{ height: `${height ? `${height}px` : 'auto'}` }}
        >
          {data &&
            data.map((item, index) => (
              <tr
                className={`flex items-center transition-colors bg-opacity-70 hover:bg-slate-50 text-icon2 select-none font-bold font-landing text-[14px] ${
                  index % 2 === 0 ? 'bg-slate-100' : 'bg-white'
                }`}
                key={index}
              >
                <td className="px-5 py-2 text-icon">{index + 1}</td>
                <td className="flex items-center flex-auto px-5 py-2 gap-x-4 max-w-[35%]">
                  <img src={item.images?.[0] || images.logo} alt="product" className="w-10 h-10" />
                  <div className="flex-grow-0 max-w-[85%] ml-2">
                    <p className="truncate font-body text-icon">{item.name}</p>
                    <p className="text-icon2">{`Mã: ${item._id}`}</p>
                  </div>
                </td>
                <td className="w-[15%] px-5 py-2">{item.gtin_code ? item.gtin_code : 'Chưa có'}</td>
                <td className="w-[10%] px-5 py-2">
                  <Tag
                    text={item.is_production ? 'Đang sản xuất' : 'Ngưng sản xuất'}
                    type={`${item.is_production ? 'success' : 'danger'}`}
                  />
                </td>
                <td className="w-2/12 px-5 py-2">{moment(item.createdAt).format('DD/MM/yyyy - hh:mm A')}</td>
                <td className="flex items-center w-[20%] gap-x-2 px-5 py-2	">
                  <Link
                    className="px-2 py-1 bg-[rgba(84,184,98,.15)] rounded-md text-primary flex items-center text-xs gap-x-2 hover:opacity-80 min-w-[115px]"
                    to={router.dashboard.products.edit}
                    onClick={() => dispatch(setProduct(item))}
                  >
                    <Icons.Edit />
                    Chỉnh sửa
                  </Link>
                  {item.is_production ? (
                    <Button
                      className="flex items-center px-2 py-[2px] text-xs bg-opacity-25 bg-danger text-danger gap-x-2 hover:opacity-80 !rounded-md min-w-[115px]"
                      onClick={() => handleUpdateStatus(item._id, false)}
                    >
                      <Icons.Close />
                      Vô hiệu hóa
                    </Button>
                  ) : (
                    <Button
                      className="px-2 py-[2px] bg-[rgba(17,197,219,.15)] text-info text-xs flex items-center gap-x-2 hover:opacity-80 !rounded-md min-w-[115px]"
                      onClick={() => handleUpdateStatus(item._id, true)}
                    >
                      <Icons.Close />
                      Kích hoạt
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Card>
  );
}

export default ProductTable;
