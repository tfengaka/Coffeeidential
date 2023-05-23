import moment from 'moment';
import { Card, Tag } from '~/components';

function ProductInfo() {
  return (
    <Card className="flex flex-col py-4 rounded-md md:flex-row">
      <div className="w-full basis-1/2">
        <div className="w-full h-full overflow-hidden max-h-[460px]">
          <img
            src="https://thenobcoffee.com/wp-content/uploads/2021/08/Ca-phe-Arabica-4.png"
            alt=""
            className="object-fill w-full h-full"
          />
        </div>
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
        <div>
          <h5 className="mb-2 text-sm font-semibold text-icon2">Giấy chứng nhận</h5>
          <div className="flex items-center gap-x-2">
            <div className="relative transition-all duration-500 cursor-pointer basis-1/3 hover:shadow-card">
              <img
                src="https://dummyimage.com/206x371.png/cc0000/ffffff"
                alt=""
                className="object-contain w-full h-full rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProductInfo;
