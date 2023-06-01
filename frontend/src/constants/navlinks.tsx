import images from '~/assets/images';
import router from './routers';
import Icons from '~/assets/icons';

export const overviewLinks = [
  {
    title: 'Đăng ký sản phẩm mới',
    icon: images.product_writter,
    link: router.dashboard.products.create,
  },
  {
    title: 'Danh sách sản phẩm',
    icon: images.product_writter,
    link: router.dashboard.products.root,
  },
  {
    title: 'Thông tin doanh nghiệp',
    icon: images.profile,
    link: router.dashboard.profile,
  },
];

export const sideBarLinks = [
  {
    name: 'Trang chủ',
    path: router.dashboard.root,
    icon: <Icons.Home />,
  },
  {
    name: 'Sản phẩm',
    path: router.dashboard.products.root,
    icon: <Icons.Tree />,
  },
  {
    name: 'Doanh nghiệp',
    path: router.dashboard.profile.root,
    icon: <Icons.Company />,
  },
];

export const profilePanelLinks = [
  {
    title: 'Thông tin doanh nghiệp',
    icon: <Icons.Infomation />,
    link: router.dashboard.profile.account,
  },
  {
    title: 'Thông tin liên lạc',
    icon: <Icons.Identification />,
    link: router.dashboard.profile.contact,
  },
  {
    title: 'Thương hiệu',
    icon: <Icons.Brand />,
    link: router.dashboard.profile.branding,
  },
  {
    title: 'Đổi mật khẩu',
    icon: <Icons.ReLock />,
    link: router.dashboard.profile.changepassword,
  },
];

export const lookupPanelButtons = [
  {
    title: 'Thông tin sản phẩm',
    icon: <Icons.PackInfo />,
  },
  {
    title: 'Thông tin doanh nghiệp',
    icon: <Icons.HomeOutline />,
  },
  {
    title: 'Truy xuất nguồn gốc',
    icon: <Icons.Diary />,
  },
  {
    title: 'Đơn vị phân phối',
    icon: <Icons.Distribution />,
  },
];
