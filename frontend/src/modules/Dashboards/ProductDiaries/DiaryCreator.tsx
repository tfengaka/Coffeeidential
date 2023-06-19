import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { DiaryApi } from '~/api';
import { Backdrop, Button, Card, FormRow, FormSelect, Loading, QuillEditor, TextField, Uploader } from '~/components';
import router from '~/constants/routers';
import { useFetchUnit } from '~/hooks';
import { useAppDispatch, useAppSelector } from '~/redux';
import { createdDiary } from '~/redux/reducers/diarySlice';
import { onImagesChange, onImagesRemove } from '~/utils';

interface DiaryForm {
  action: string;
  descriptions: string;
}

function DiaryCreator() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { actions } = useFetchUnit();
  const product = useAppSelector((state) => state.product.product);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DiaryForm>({
    resolver: yupResolver(
      Yup.object({
        action: Yup.string().required('Thông tin bắt buộc!'),
        descriptions: Yup.string().required('Thông tin bắt buộc!'),
      })
    ),
    mode: 'onSubmit',
  });

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const onSubmit = handleSubmit(async (data) => {
    if (images.length > 0) {
      if (product?._id) {
        setLoading(true);
        const reqData = {
          ...data,
          images,
        };
        try {
          const res = await DiaryApi.createDiary(product._id, reqData);
          if (res) {
            dispatch(createdDiary(res));
            navigate(router.dashboard.products.diary.root);
            toast.success('Đã ghi nhận thông tin!');
          }
        } catch (error) {
          toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        } finally {
          setLoading(false);
        }
      }
    } else {
      toast.warning('Cảnh báo: Nên có ảnh để chứng minh dữ liệu!');
    }
  });

  return (
    <Card className="w-full p-5 rounded-md h-fit">
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-semibold text-icon">Mô tả sản phẩm</h3>
            <p className="text-icon2 text-md">Thông tin chi tiết về quá trình sản xuất</p>
          </div>
          <Button
            className="px-5 py-2 text-white transition-all shadow-success bg-primary hover:shadow-success_hover hover:-translate-y-[2px]"
            type="submit"
          >
            Lưu lại
          </Button>
        </div>
        <div className="flex flex-col mt-4 gap-y-2">
          <FormRow className="items-end !gap-x-10">
            <div className="basis-2/3">
              <TextField title="Mã số" value={product?._id} disable required />
              <TextField title="Sản phẩm" value={product?.name} disable required />
              <FormSelect
                title="Hành động"
                control={control}
                name="action"
                options={actions}
                required
                error={errors.action?.message}
              />
            </div>
            <div className="w-full pb-4">
              <span className="text-sm font-semibold font-body text-icon">
                Ảnh quy trình sản xuất<strong className="text-error"> *</strong>
              </span>
              <div className="flex items-center mt-2 gap-x-4">
                <Uploader
                  className="w-56 rounded-md h-28"
                  onChange={(url) => onImagesChange(images, 0, url, setImages)}
                  onRemove={() => onImagesRemove(images, 0, setImages)}
                />
                <Uploader
                  className="w-56 rounded-md h-28"
                  onChange={(url) => onImagesChange(images, 1, url, setImages)}
                  onRemove={() => onImagesRemove(images, 1, setImages)}
                />
                <Uploader
                  className="w-56 rounded-md h-28"
                  onChange={(url) => onImagesChange(images, 2, url, setImages)}
                  onRemove={() => onImagesRemove(images, 2, setImages)}
                />
              </div>
            </div>
          </FormRow>
          <QuillEditor
            control={control}
            name="descriptions"
            required
            title="Mô tả quy trình"
            error={errors.descriptions?.message}
          />
        </div>
      </form>
      {loading && (
        <Backdrop>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Loading />
          </div>
        </Backdrop>
      )}
    </Card>
  );
}

export default DiaryCreator;
