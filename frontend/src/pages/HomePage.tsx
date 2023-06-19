import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icons from '~/assets/icons';
import images from '~/assets/images';
import { Button, Card, TextField } from '~/components';
import router from '~/constants/routers';
import { ProductSlider } from '~/modules/Home';

const benefitArr = [
  {
    title: 'Tăng giá trị sản phẩm',
    icon: images.benefit_1,
    description: 'Kênh giao tiếp giúp doanh nghiệp chứng minh chất lượng của sản phẩm tương xứng với giá thành bán ra',
  },
  {
    title: 'Bảo vệ thương hiệu',
    icon: images.benefit_2,
    description:
      'Giúp người tiêu dùng phân biệt với hàng giả, hàng kém chất lượng, qua đó bảo vệ thương hiệu của sản phẩm',
  },
  {
    title: 'Xác thực bằng Blockchain',
    icon: images.benefit_3,
    description:
      'Công nghệ Blockchain 4.0 đảm bảo thông tin truy xuất không thể bị làm giả thông qua lớp giao thức Web3 phi tập trung',
  },
];

const featureArr = [
  {
    id: '01',
    title: 'Tạo mã QR sản phẩm',
  },
  {
    id: '02',
    title: 'Ghi nhận nhật ký sản xuất trên Blockchain',
  },
  {
    id: '03',
    title: 'Kích hoạt tem và truy xuất từng sản phẩm',
  },
];

function Home() {
  const [emailContact, setEmailContact] = useState('');

  return (
    <div className="font-landing">
      {/* Header */}
      <div className="sticky top-0 z-50 w-full bg-white bg-opacity-10 shadow-card backdrop-blur-3xl">
        <div className="py-0 flex items-center px-4 mx-auto w-[70%]">
          <nav className="relative flex items-center justify-between w-full px-0 py-2 bg-inherit">
            <div>
              <Link
                to={router.home.root}
                className="flex items-center transition-colors gap-x-2 hover:text-primary20 text-icon"
              >
                <img src={images.logo} alt="logo" className="w-full object-cover max-w-[50px] h-10" />
                <span className="text-lg font-bold leading-none font-landing">Coffeeidential</span>
              </Link>
            </div>
            {/* NavLink */}
            <div></div>
            {/* Auth Button */}
            <div className="flex items-center gap-x-5">
              <Link
                to={router.auth.signUp}
                className="block px-5 py-3 text-sm font-bold text-white transition-all duration-500 rounded-md bg-primary hover:shadow-success_hover shadow-success"
              >
                Đăng ký miễn phí
              </Link>
              <Link
                to={router.auth.signIn}
                className="text-sm font-bold transition-colors text-icon hover:text-primary20"
              >
                Đăng nhập
              </Link>
            </div>
          </nav>
        </div>
      </div>
      {/* introduction */}
      <div className="w-[70%] mx-auto">
        <div className="absolute left-[5%] w-[95%] h-[320px] rounded-es-[120px] bg-bg_gradient -z-10"></div>
        <div className="w-full pb-20">
          <div className="pt-16 mx-auto">
            <div className="flex flex-wrap">
              <div className="px-[15px] flex-[0_0_50%] max-w-[50%] w-full text-white">
                <div className="max-w-[80%]">
                  <h3 className="mb-1 text-3xl font-bold">ỨNG DỤNG BLOCKCHAIN TRUY XUẤT NGUỒN GỐC CÀ PHÊ</h3>
                  <p className="text-base">Gia tăng giá trị - Bảo vệ thương hiệu cà phê tại địa phương</p>
                </div>
                <div className="mt-5">
                  <Link
                    to={router.auth.signUp}
                    className="inline-flex items-center px-5 py-[10px] font-bold transition-all bg-white rounded-sm gap-x-2 text-primary hover:-translate-y-[2px] hover:shadow-success"
                  >
                    <Icons.Plus />
                    <span>Tạo mã miễn phí</span>
                  </Link>
                </div>
              </div>
              <div className="px-[15px] flex-[0_0_50%]">
                <div className="relative w-full h-[325px]">
                  <img src={images.coffee_farmer} alt="" className="object-contain w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Benefit */}
      <div className="w-[70%] mx-auto mb-20">
        <div className="flex items-center justify-between gap-x-4">
          {benefitArr.map((item, index) => (
            <Card className="p-5" key={index}>
              <div className="bg-[#e7e7e] w-[75px] h-[75px] relative rounded-full">
                <span className="absolute inset-0 overflow-hidden">
                  <img src={item.icon} alt="" />
                </span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#0f455d]">{item.title}</h3>
              <p className="h-20 text-sm text-icon2">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
      {/* Top Products */}
      <div className="w-full mx-auto mb-20">
        <div className="flex items-center justify-between px-72 gap-x-4">
          <h2 className="font-bold text-icon text-[26px] mb-10 uppercase">Sản phẩm nổi bật</h2>
        </div>
        <ProductSlider className="px-72" />
      </div>
      {/* feature */}
      <div className="w-[70%] mx-auto ">
        <div className="relative mb-7">
          <div className="absolute -left-[40px] -top-[40px] w-[148px] h-[78px] bg-primary bg-opacity-10 rounded-[0_20px_0_20px]" />
          <h2 className="font-bold text-icon text-[26px] mb-4 uppercase">TÍNH NĂNG ĐƠN GIẢN VÀ THÂN THIỆN</h2>
          <p className="text-lg font-semibold text-icon2">
            Phù hợp với mọi đối tượng sử dụng và dễ dàng thao tác trên điện thoại
          </p>
        </div>
        <div className="flex items-center justify-between -mx-5 gap-x-10">
          <div className="flex-[0_0_50%] max-w-[50%]">
            <div className="flex flex-col mb-10 gap-y-4">
              {/* item */}
              {featureArr.map((item, index) => (
                <div className="p-4 rounded-md bg-primary40 bg-opacity-10" key={index}>
                  <div className="flex items-center gap-x-4">
                    <div className="relative w-10 h-10 font-bold text-white rounded-full bg-primary">
                      <p className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{item.id}</p>
                    </div>
                    <span className="font-medium text-md font-body">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to={router.auth.signUp}
              className="inline-flex items-center px-5 py-[10px] font-bold transition-all text-white rounded-sm gap-x-2 bg-primary20 hover:-translate-y-[2px] hover:shadow-success_hover shadow-success"
            >
              <Icons.Plus />
              <span>Tạo tem miễn phí</span>
            </Link>
          </div>
          <div className="flex-[0_0_50%] max-w-[50%] relative">
            <div className="absolute flex items-center justify-center -top-64">
              <img src={images.nouhtn} alt="" className="object-contain h-[450px]" />
            </div>
          </div>
        </div>
      </div>
      {/* Contact  */}
      <div className="w-[70%] mx-auto">
        <div className="absolute right-[5%] w-[95%] h-[200px] rounded-se-[120px] bg-bg_gradient -z-10 mt-40" />
        <div className="flex items-center justify-between pt-48 -mx-5">
          <div className="flex-[0_0_40%] max-w-[40%]">
            <h3 className="mb-2 text-xl font-bold text-white">Liên hệ với chúng tôi</h3>
            <div>
              <TextField
                name="email"
                placeholder="example@example.com"
                value={emailContact}
                onChange={(e) => setEmailContact(e.target.value)}
              />
              <Button className="bg-white hover:-translate-y-[2px] shadow-[0_0.25rem_0.55rem_rgba(248,249,255,.35)] hover:shadow-success text-primary20 py-2 px-4 font-bold">
                Tư vấn miễn phí
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
