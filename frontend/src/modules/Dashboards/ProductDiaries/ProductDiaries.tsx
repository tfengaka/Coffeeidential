import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DiaryApi } from '~/api';
import Icons from '~/assets/icons';
import { Card, FormRow, TextField } from '~/components';
import router from '~/constants/routers';
import { useAppDispatch, useAppSelector } from '~/redux';
import { setDiaries } from '~/redux/reducers/diarySlice';
import DiariesTable from './components/DiariesTable';
import DiaryModal from './components/DiaryModal';

function ProductDiaries() {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);
  const diaries = useAppSelector((state) => state.diary.diaries);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!product?.id) return;
        const res = await DiaryApi.getDiariesByProductId(product?.id);
        dispatch(setDiaries(res.diaries));
      } catch (error) {
        toast.error('Lỗi lấy dữ liệu nhật ký sản xuất');
        console.error(error);
      }
    })();
  }, [dispatch, product?.id]);

  return (
    <Card className="w-full px-6 py-5 mt-5 rounded-md font-body">
      <div className="flex items-center justify-between pb-4">
        <div>
          <h3 className="text-xl font-semibold text-icon">Lịch sử trồng trọt & sản xuất</h3>
          <p className="font-medium text-icon2 text-md">Thông tin chi tiết về quá trình sản xuất</p>
        </div>
        <Link
          className="flex items-center px-3 py-2 font-semibold text-white transition-all ease-in-out rounded-sm bg-primary gap-x-1 shadow-success text-md font-body hover:shadow-success_hover hover:-translate-y-[1px]"
          to={router.dashboard.products.diary.create}
        >
          <Icons.Plus />
          <span>Thêm mới</span>
        </Link>
      </div>
      <FormRow>
        <div className="basis-1/3">
          <TextField title="Mã số" value={product?.id} disable required />
        </div>
        <TextField title="Sản phẩm" value="Cà phê Arabica nguyên chất có bơ" disable required />
      </FormRow>
      <DiariesTable diaries={diaries} openModal={() => setOpenModal(true)} />
      {openModal && <DiaryModal product={product} onClose={() => setOpenModal(false)} />}
    </Card>
  );
}

export default ProductDiaries;
