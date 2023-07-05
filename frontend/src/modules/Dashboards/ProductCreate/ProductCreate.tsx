import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { ProductApi } from '~/api';
import { Backdrop, Button, Card, FormInput, FormRow, FormSelect, Loading, QuillEditor, Uploader } from '~/components';
import router from '~/constants/routers';
import { useFetchUnit } from '~/hooks';
import { useAppDispatch } from '~/redux';
import { addProduct } from '~/redux/reducers/productSlice';
import { Product } from '~/types';
import { onImagesChange, onImagesRemove } from '~/utils';

function ProductCreate() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selling_unit, expiry_unit, product_types } = useFetchUnit();

  const [images, setImages] = useState<string[]>([]);
  const [box_images, setBoxImages] = useState<string[]>([]);
  const [certificated, setCertificated] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Product>({
    resolver: yupResolver(
      Yup.object({
        name: Yup.string().required('Thông tin bắt buộc'),
        price: Yup.number().required('Thông tin bắt buộc').min(5000, 'Giá không hợp lệ'),
        product_type: Yup.string().required('Thông tin bắt buộc'),
        selling_unit: Yup.string().required('Thông tin bắt buộc'),
      })
    ),
    mode: 'onSubmit',
    defaultValues: {
      price: 0,
      expired_time: 0,
      description: '',
    },
  });

  const onSubmit = async (data: Product) => {
    setLoading(true);
    try {
      const reqData = {
        ...data,
        images,
        box_images,
        certificated,
      };
      const res = await ProductApi.createNewProduct(reqData);
      if (res) {
        console.log(res);
        dispatch(addProduct(res));
        navigate(router.dashboard.products.root);
        toast.success('Ghi nhận sản phẩm thành công');
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <Card className="p-4">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-icon">Mô tả sản phẩm</h3>
          <p className="text-icon2 text-md">Thông tin cơ bản giới thiệu sản phẩm</p>
        </div>
        <div className="relative mt-5">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
              <FormInput
                control={control}
                name="name"
                title="Tên sản phẩm"
                required
                placeholder="Tên sản phẩm"
                error={errors.name?.message}
              />
              <FormSelect
                control={control}
                name="product_type"
                title="Giống cà phê"
                required
                options={product_types}
                error={errors.product_type?.message}
              />
            </FormRow>
            <FormRow>
              <FormInput
                control={control}
                name="price"
                type="number"
                title="Giá bán khuyến nghị (VNĐ)"
                required
                error={errors.price?.message}
              />
              <FormSelect
                control={control}
                name="selling_unit"
                title="Đơn vị bán"
                required
                options={selling_unit}
                error={errors.selling_unit?.message}
              />
            </FormRow>
            <FormRow>
              <FormInput control={control} name="gtin_code" title="Mã GTIN" placeholder="Mã GTIN" />
              <FormRow>
                <FormInput
                  control={control}
                  name="expire_time"
                  type="number"
                  title="Thời hạn sử dụng"
                  placeholder="Thời hạn sử dụng"
                />
                <FormSelect
                  control={control}
                  name="expired_unit"
                  title="Đơn vị"
                  options={expiry_unit}
                  error={errors.expired_unit?.message}
                />
              </FormRow>
            </FormRow>
            <FormInput control={control} name="intro_video" title="Video Giới thiệu" placeholder="Video giới thiệu" />
            <FormRow>
              <div className="flex-[33.3333333%]">
                <p className="mb-2 text-sm font-semibold font-body text-icon">Hình ảnh sản phẩm (Tối đa 3 hình)</p>
                <div className="flex items-center gap-x-4">
                  <Uploader
                    className="h-24 w-28"
                    onChange={(url) => onImagesChange(images, 0, url, setImages)}
                    onRemove={() => onImagesRemove(images, 0, setImages)}
                  />
                  <Uploader
                    className="h-24 w-28"
                    onChange={(url) => onImagesChange(images, 1, url, setImages)}
                    onRemove={() => onImagesRemove(images, 1, setImages)}
                  />
                  <Uploader
                    className="h-24 w-28"
                    onChange={(url) => onImagesChange(images, 2, url, setImages)}
                    onRemove={() => onImagesRemove(images, 2, setImages)}
                  />
                </div>
              </div>
              <div className="flex-[33.3333333%]">
                <p className="mb-2 text-sm font-semibold font-body text-icon">Hình ảnh chứng nhận (Tối đa 3 hình)</p>
                <div className="flex items-center gap-x-4">
                  <Uploader
                    className="h-24 w-28"
                    onChange={(url) => onImagesChange(certificated, 0, url, setCertificated)}
                    onRemove={() => onImagesRemove(certificated, 0, setCertificated)}
                  />
                  <Uploader
                    className="h-24 w-28"
                    onChange={(url) => onImagesChange(certificated, 1, url, setCertificated)}
                    onRemove={() => onImagesRemove(certificated, 1, setCertificated)}
                  />
                  <Uploader
                    className="h-24 w-28"
                    onChange={(url) => onImagesChange(certificated, 2, url, setCertificated)}
                    onRemove={() => onImagesRemove(certificated, 2, setCertificated)}
                  />
                </div>
              </div>
              <div className="flex-[33.3333333%]">
                <p className="mb-2 text-sm font-semibold font-body text-icon">Hình ảnh thùng (Tối đa 3 hình)</p>
                <div className="flex items-center gap-x-4">
                  <Uploader
                    className="h-24 w-28"
                    onChange={(url) => onImagesChange(box_images, 0, url, setBoxImages)}
                    onRemove={() => onImagesRemove(box_images, 0, setBoxImages)}
                  />
                  <Uploader
                    className="h-24 w-28"
                    onChange={(url) => onImagesChange(box_images, 1, url, setBoxImages)}
                    onRemove={() => onImagesRemove(box_images, 1, setBoxImages)}
                  />
                  <Uploader
                    className="h-24 w-28"
                    onChange={(url) => onImagesChange(box_images, 2, url, setBoxImages)}
                    onRemove={() => onImagesRemove(box_images, 2, setBoxImages)}
                  />
                </div>
              </div>
            </FormRow>
            <div className="py-5">
              <QuillEditor name="description" control={control} title="Mô tả sản phẩm" />
            </div>
            <FormRow className="justify-between">
              <p className="text-icon2">
                <span className="mr-2 text-error">(*)</span>
                <span>Thông tin bắt buộc</span>
              </p>
              <Button
                type="submit"
                className="px-6 py-2 bg-[rgba(84,184,98,.2)] text-primary cursor-pointer hover:bg-primary hover:text-white hover:shadow-success hover:-translate-y-[2px] font-semibold text-md"
              >
                Xác nhận
              </Button>
            </FormRow>
          </form>
        </div>
      </Card>
      {loading && (
        <Backdrop>
          <div className="flex items-center justify-center w-full h-full ">
            <Loading />
          </div>
        </Backdrop>
      )}
    </div>
  );
}

export default ProductCreate;
