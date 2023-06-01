import moment from 'moment';
import { Card, Tag } from '~/components';
import ProductImages from './components/ProductImages';
import ProductCertificates from './components/ProductCertificates';

function ProductInfo() {
  return (
    <Card className="flex flex-col gap-1 py-4 rounded-md md:flex-row">
      <div className="max-w-full basis-1/2">
        <ProductImages />
      </div>
      <div className="flex flex-col w-full px-2 pr-5 basis-1/2 gap-y-4 md:px-4">
        <div>
          <h3 className="text-[22px] font-bold text-icon mb-2 font-landing">Cà phê Arabica nguyên chất có bơ</h3>
          <p className="text-sm font-semibold text-icon2">Công ty TNHH Sản xuất Thương mại và Dịch vụ Phong Thúy</p>
          <div>
            <Tag type="success" text="Sản phẩm chính hãng" />
          </div>
        </div>

        <div className="flex flex-row justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="font-semibold">
            <h5 className="text-sm text-icon2">Mã sản phẩm</h5>
            <p className="text-icon">{'PM00000001'}</p>
          </div>
          <div className="font-semibold">
            <h5 className="text-sm text-icon2">Ngày sản xuất</h5>
            <p className="text-icon">{moment(Date.now()).format('DD/MM/yyyy')}</p>
          </div>
        </div>
        <ProductCertificates
          certificates={[
            'https://images.agridential.vn/api/v1/files/images/1631524961351-agdfs-278548e786730dfad5f2bb53c11602a7.jpg',
          ]}
        />
      </div>
    </Card>
  );
}

export default ProductInfo;
