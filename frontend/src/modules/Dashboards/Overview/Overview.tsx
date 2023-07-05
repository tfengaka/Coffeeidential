import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LookupApi } from '~/api';
import Icons from '~/assets/icons';
import images from '~/assets/images';
import { BarChart, Card, FormRow } from '~/components';
import { overviewLinks } from '~/constants/navlinks';
import router from '~/constants/routers';
import { useAppSelector } from '~/redux';
import { OverviewData } from '~/types';

function Overview() {
  const user = useAppSelector((state) => state.auth.user);
  const [data, setData] = useState<OverviewData>();
  useEffect(() => {
    (async () => {
      try {
        const res = await LookupApi.getStatisticData();
        setData(res);
      } catch (error) {
        toast.error('Lỗi tải dữ liệu');
      }
    })();
  }, []);

  return (
    <div className="w-full">
      <div className="relative">
        {/* Banner */}
        <div className="flex w-full gap-x-5">
          <div className="basis-1/3 max-w-[33.3333%]">
            <div className="relative w-full h-full pb-5 text-white rounded-md bg-primary_gradient shadow-success">
              <img src={images.ribbon_left} alt="" className="absolute top-0 left-0 w-[200px]" />
              <img src={images.ribbon_right} alt="" className="absolute top-0 right-0 w-[200px]" />
              <div className="flex items-center justify-center w-full">
                <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-primary shadow-[0_4px_24px_0_rgba(34,41,47,0.1)] mt-12">
                  <Icons.Star />
                </div>
              </div>
              <div className="text-xl font-bold text-center font-landing">
                <span>Welcome!</span>
                <p className="text-lg font-body">{user?.full_name}</p>
              </div>
            </div>
          </div>
          <div className="basis-2/3 max-w-[66.666%]">
            <div className="w-full h-full bg-bottom bg-no-repeat bg-cover rounded-md bg-hero_banner shadow-success"></div>
          </div>
        </div>
        {/* Button */}
        <div className="mt-5">
          <div className="relative w-full py-2">
            <div className="grid w-full grid-cols-4 gap-x-4">
              {overviewLinks.map((item, index) => (
                <Card key={index} className="w-full">
                  <Link
                    className="flex flex-col items-center justify-center w-full py-2 transition-all rounded-md hover:bg-primary gap-y-2 text-primary hover:text-white hover:shadow-success_hover"
                    to={item.link}
                  >
                    <div className="mx-auto">
                      <span className="inline-flex items-center justify-center text-primary bg-primary80 h-[56px] w-[56px] rounded-full">
                        <img src={item.icon} alt="" className="h-[25px]" />
                      </span>
                    </div>
                    <span className="text-sm font-semibold font-body">{item.title}</span>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
        {/* Overview Data */}
        <FormRow className="w-full mt-5 gap-x-4">
          <Card className="flex-auto w-full h-[400px] p-4">
            <div className="pb-4 font-semibold border-b font-body text-icon border-slate-100">
              <p>Tổng lượt truy xuất</p>
            </div>
            {data?.scan_count.reverse() && <BarChart width={1050} height={300} dataSet={data.scan_count} />}
          </Card>
          <Card className="p-5 basis-1/3">
            <div className="pb-4 font-semibold border-b font-body text-icon border-slate-100">
              <p>Top sản phẩm được quan tâm</p>
            </div>
            <div className="w-full mt-2">
              {data &&
                data.top_products.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center py-3 rounded-sm select-none gap-x-2">
                    <img src={item.images[0] || images.logo} alt="" className="object-cover rounded-md w-9 h-9" />
                    <div className="w-full">
                      <Link
                        to={`${router.home.lookup}/${item?._id}`}
                        className="w-full max-w-[92%] text-sm truncate  font-semibold text-icon hover:text-primary20 cursor-pointer transition-colors inline-block"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-baseline w-full text-xs font-bold gap-x-1 font-landing">
                        <span className="text-slate-800">Lượt tra cứu:</span>
                        <b className="leading-none text-primary">{`${item.count} lượt`}</b>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </FormRow>
      </div>
    </div>
  );
}

export default Overview;
