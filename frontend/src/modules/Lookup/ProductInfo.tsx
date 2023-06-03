import moment from 'moment';
import { Card, Tag } from '~/components';
import { LookUpProductData } from '~/types';
import ProductCertificates from './components/ProductCertificates';
import ProductImages from './components/ProductImages';

interface ProductInfoProps {
  data?: LookUpProductData;
}

function ProductInfo({ data }: ProductInfoProps) {
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
        <div className="flex justify-between pb-4 border-b border-slate-200">
          <div className="font-semibold">
            <h5 className="text-sm text-icon2">Mã sản phẩm</h5>
            <p className="text-icon">{data?.order_id}</p>
          </div>
          <div className="font-semibold">
            <h5 className="text-sm text-icon2">Ngày sản xuất</h5>
            <p className="text-icon">{moment(data?.createdAt).format('DD/MM/yyyy')}</p>
          </div>
        </div>
        <div className="pb-4 font-semibold border-b border-slate-200">
          <h5 className="text-sm text-icon2">Đơn vị sản xuất:</h5>
          <p className="text-icon">{data?.producer.full_name}</p>
        </div>

        <ProductCertificates certificates={data?.certificated || []} />
      </div>
    </Card>
  );
}

export default ProductInfo;
