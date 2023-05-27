import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ProductApi } from '~/api';
import { Button, Card, FormInput, FormRow, FormSelect, Loading, QuillEditor, Uploader } from '~/components';
import { useFetchUnit } from '~/hooks';
import { Product, Unit } from '~/types';

function ProductCreate() {
  const { loading, selling_unit, expiry_unit } = useFetchUnit();
  const [productType, setProductType] = useState<Unit[]>([]);
  const { control, handleSubmit } = useForm<Product>({
    defaultValues: {
      price: 0,
      expire_time: 0,
      images: [],
      certificated: [],
      box_images: [],
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await ProductApi.getProductTypes();
        setProductType(res.data);
      } catch (error) {
        console.error(error);
        toast.error('Lỗi lấy dữ liệu ');
      }
    })();
  }, []);

  const onSubmit = (data: Product) => {
    console.log(data);
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
                <FormInput control={control} name="name" title="Tên sản phẩm" required placeholder="Tên sản phẩm" />
                <FormSelect control={control} name="product_type" title="Giống cà phê" required options={productType} />
              </FormRow>
              <FormRow>
                <FormInput control={control} name="price" type="number" title="Giá bán khuyến nghị (VNĐ)" required />
                <FormSelect control={control} name="unit_price" title="Đơn vị bán" required options={selling_unit} />
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
                  <FormSelect control={control} name="unit_expire" title="Đơn vị" options={expiry_unit} />
                </FormRow>
              </FormRow>
              <FormInput control={control} name="intro_video" title="Video Giới thiệu" placeholder="Video giới thiệu" />
              <FormRow>
                <div className="flex-[33.3333333%]">
                  <p className="mb-2 text-sm font-semibold font-body text-icon">Hình ảnh sản phẩm (Tối đa 3 hình)</p>
                  <div className="flex items-center gap-x-4">
                    <Uploader className="h-24 w-28" />
                    <Uploader className="h-24 w-28" />
                    <Uploader className="h-24 w-28" />
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
