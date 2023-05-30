import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Button, Card, FormInput, FormRow, FormSelect, Loading, QuillEditor, Uploader } from '~/components';
import { useFetchUnit } from '~/hooks';
import { Product } from '~/types';

function ProductCreate() {
  const { loading, selling_unit, expiry_unit, product_types } = useFetchUnit();

  const [images, setImages] = useState<string[]>([]);
  // const [box_images, setBoxImages] = useState<string[]>([]);
  // const [certificated, setCertificated] = useState<string[]>([]);

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
      description: '',
    },
  });

  const onImageChange = (targetValue: string[], index: number, url: string, callback: (value: string[]) => void) => {
    const cloneImages = [...targetValue];
    cloneImages[index] = url;
    callback(cloneImages);
  };

  const onSubmit = async (data: Product) => {
    console.log('Data', { ...data, images: images });
  };

  return (
    <div className="w-full h-full">
      <Card className="p-4">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-icon">Mô tả sản phẩm</h3>
          <p className="text-icon2 text-md">Thông tin cơ bản giới thiệu sản phẩm</p>
        </div>
        <div className="relative mt-5">
          {loading ? (
            <div className="flex items-center justify-center w-full h-full ">
              <Loading />
            </div>
          ) : (
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
                    name="expiry_unit"
                    title="Đơn vị"
                    options={expiry_unit}
                    error={errors.expiry_unit?.message}
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
                      onChange={(url) => onImageChange(images, 0, url, setImages)}
                      onRemove={() => {
                        const cloneImages = [...images];
                        cloneImages[0] = '';
                        setImages(cloneImages);
                      }}
                    />
                    <Uploader className="h-24 w-28" onChange={(url) => onImageChange(images, 1, url, setImages)} />
                    <Uploader className="h-24 w-28" onChange={(url) => onImageChange(images, 2, url, setImages)} />
                  </div>
                </div>
                <div className="flex-[33.3333333%]">
                  <p className="mb-2 text-sm font-semibold font-body text-icon">Hình ảnh chứng nhận (Tối đa 3 hình)</p>
                  <div className="flex items-center gap-x-4">
                    <Uploader className="h-24 w-28" />
                    <Uploader className="h-24 w-28" />
                    <Uploader className="h-24 w-28" />
                  </div>
                </div>
                <div className="flex-[33.3333333%]">
                  <p className="mb-2 text-sm font-semibold font-body text-icon">Hình ảnh thùng (Tối đa 3 hình)</p>
                  <div className="flex items-center gap-x-4">
                    <Uploader className="h-24 w-28" />
                    <Uploader className="h-24 w-28" />
                    <Uploader className="h-24 w-28" />
                  </div>
                </div>
              </FormRow>
              <div className="py-5">
                <p className="mb-2 text-sm font-semibold font-body text-icon">Mô tả sản phẩm</p>
                <QuillEditor name="description" control={control} />
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
          )}
        </div>
      </Card>
    </div>
  );
}

export default ProductCreate;
