import moment from 'moment';
import { Card, Tag } from '~/components';
import { LookUpProduct } from '~/types';
import ProductCertificates from './components/ProductCertificates';
import ProductImages from './components/ProductImages';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CoffeeTypesApi } from '~/api';

interface ProductInfoProps {
  data?: LookUpProduct;
}

function ProductInfo({ data }: ProductInfoProps) {
  const [typeName, setTypeName] = useState('Không xác định');
  useEffect(() => {
    (async () => {
      if (data?.product_type) {
        try {
          const res = await CoffeeTypesApi.getCoffeeTypeById(data.product_type);
          setTypeName(res.value);
        } catch (error) {
          toast.error('Lỗi tải dữ liệu giống cây!');
        }
      }
    })();
  }, [data]);

  return (
    <Card className="flex flex-col gap-1 py-4 rounded-md md:flex-row">
      <div className="max-w-full basis-1/2">
        <ProductImages images={data?.images || []} />
      </div>
      <div className="flex flex-col w-full px-2 pr-5 basis-1/2 gap-y-4 md:px-4">
        <div>
          <h3 className="text-[22px] font-bold text-icon mb-2 font-landing">{data?.name}</h3>
          <Tag type="success" text="Sản phẩm chính hãng" />
        </div>
        <div className="grid grid-cols-2 pb-2 border-b gap-x-2 border-slate-200">
          <div className="font-semibold">
            <h5 className="text-sm text-icon2">Mã sản phẩm</h5>
            <p className="text-icon">{data?.order_id}</p>
          </div>
          <div className="font-semibold">
            <h5 className="text-sm text-icon2">Giống</h5>
            <p className="text-icon">{typeName}</p>
          </div>
        </div>
        <div className="pb-2 font-semibold border-b border-slate-200">
          <h5 className="text-sm text-icon2">Đơn vị sản xuất:</h5>
          <p className="text-icon">{data?.producer.full_name}</p>
        </div>
        <div className="pb-2 font-semibold border-b border-slate-200">
          <h5 className="text-sm text-icon2">Ngày sản xuất</h5>
          <p className="text-icon">{moment(data?.createdAt).format('DD/MM/yyyy')}</p>
        </div>

        <ProductCertificates certificates={data?.certificated || []} />
      </div>
    </Card>
  );
}

export default ProductInfo;
