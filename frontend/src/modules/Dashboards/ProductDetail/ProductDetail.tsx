import { yupResolver } from '@hookform/resolvers/yup';
import QRCode from 'qrcode';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { ProductApi } from '~/api';
import Icons from '~/assets/icons';
import { Button, Card, FormInput, FormRow, FormSelect, Loading, QuillEditor, TextField, Uploader } from '~/components';
import router from '~/constants/routers';
import { useFetchUnit } from '~/hooks';
import { useAppDispatch, useAppSelector } from '~/redux';
import { updateProductInfo } from '~/redux/reducers/productSlice';
import { downloadImage, onImagesChange, onImagesRemove } from '~/utils';

function ProductDetail() {
  const dispatch = useAppDispatch();
  const { loading, selling_unit, expiry_unit, product_types } = useFetchUnit();
  const [qrData, setQRData] = useState('');
  const product = useAppSelector((state) => state.product.product);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      product_type: product?.product_type,
      selling_unit: product?.selling_unit,
      expired_unit: product?.expired_unit,
      expired_time: product?.expired_time,
      price: product?.price,
      gtin_code: product?.gtin_code,
      intro_video: product?.intro_video,
      description: product?.description || '',
    },
    resolver: yupResolver(
      Yup.object({
        price: Yup.number().required('Thông tin bắt buộc').min(5000, 'Giá không hợp lệ'),
      })
    ),
    mode: 'onSubmit',
  });

  const [images, setImages] = useState<string[]>(product?.images || []);
  const [box_images, setBoxImages] = useState<string[]>(product?.box_images || []);
  const [certificated, setCertificated] = useState<string[]>(product?.certificated || []);

  useEffect(() => {
    // initial QR Code
    (function () {
      const QRValue = `${window.location.protocol}//${window.location.host}/lookup/${product?.order_id}`;
      QRCode.toDataURL(
        QRValue,
        {
          width: 256,
          margin: 1,
          color: {
            dark: '#000000FF',
            light: '#ffffff',
          },
        },
        (err, url) => {
          if (err) return console.error(err);
          setQRData(url);
        }
      );
    })();
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    const reqData = {
      ...data,
      images,
      box_images,
      certificated,
    };
    if (product?.order_id) {
      try {
        const res = await ProductApi.updateProductInfo(product?.order_id, reqData);
        dispatch(updateProductInfo({ product: res }));
        toast.success('Cập nhật thông tin thành công!');
      } catch (error) {
        toast.error('Cập nhật thông tin không thành công!');
      }
    }
  });

  return (
    <div className="w-full">
      <Card className="px-10 py-5">
        <form onSubmit={onSubmit}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-icon">Mô tả sản phẩm</h3>
              <p className="text-icon2 text-md">Thông tin cơ bản giới thiệu sản phẩm</p>
            </div>
            <Button
              className="px-5 py-2 text-white transition-all shadow-success bg-primary hover:shadow-success_hover hover:-translate-y-[2px]"
              type="submit"
            >
              Lưu lại
            </Button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center w-full h-full ">
              <Loading />
            </div>
          ) : (
            <Fragment>
              <FormRow>
                <div className="flex-[40%]">
                  <FormRow className="!gap-x-5">
                    <div style={{ height: 'auto', maxWidth: 240, width: '100%' }}>
                      <img src={qrData} alt="" />
                    </div>
                    <div className="flex flex-col gap-y-5">
                      <div>
                        <span className="font-medium text-icon">Mã sản phẩm: </span>
                        <span className="font-semibold text-primary">{product?.order_id}</span>
                      </div>
                      <Button
                        className="flex items-center justify-center gap-3 px-6 py-3 font-normal text-center duration-[350ms] bg-opacity-[0.15] bg-primary text-primary hover:scale-105 hover:bg-opacity-100 hover:text-white !text-[16px]"
                        onClick={() => downloadImage(qrData, `PM${product?.id}`)}
                      >
                        <Icons.Download />
                        Tải xuống QR
                      </Button>
                      <Link
                        className="flex items-center justify-center gap-3 px-6 py-3 font-normal text-center duration-[350ms] bg-opacity-[0.15] bg-primary text-primary hover:scale-105 hover:bg-opacity-100 hover:text-white"
                        to={`${router.home.lookup}/${product?.order_id}`}
                        target="_blank"
                      >
                        <Icons.Search />
                        Tra cứu
                      </Link>
                      <Link
                        className="flex items-center justify-center gap-3 px-6 py-3 font-normal text-center duration-[350ms] bg-opacity-[0.15] bg-primary text-primary hover:scale-105 hover:bg-opacity-100 hover:text-white"
                        to={router.dashboard.products.diary.root}
                      >
                        <Icons.Book />
                        Nhật ký SX
                      </Link>
                    </div>
                  </FormRow>
                </div>
                <div className="flex-[40%]">
                  <TextField title="Tên sản phẩm" required disable value={product?.name} />

                  <FormSelect
                    control={control}
                    name="product_type"
                    title="Giống cà phê"
                    disabled
                    required
                    options={product_types}
                  />
                  <FormSelect
                    control={control}
                    name="selling_unit"
                    title="Đơn vị bán"
                    required
                    options={selling_unit}
                  />
                </div>
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
                <FormInput control={control} name="gtin_code" title="Mã GTIN" placeholder="Mã GTIN" />
              </FormRow>
              <FormRow>
                <FormInput
                  control={control}
                  name="expired_time"
                  type="number"
                  title="Thời hạn sử dụng"
                  placeholder="Thời hạn sử dụng"
                />
                <FormSelect control={control} name="expired_unit" title="Đơn vị" options={expiry_unit} />
              </FormRow>
              <FormInput control={control} name="intro_video" title="Video giới thiệu" placeholder="Video giới thiệu" />
              <FormRow className="mb-5">
                <div className="flex-[33.3333333%]">
                  <p className="mb-2 text-sm font-semibold font-body text-icon">Hình ảnh sản phẩm (Tối đa 3 hình)</p>
                  <div className="flex items-center gap-x-4">
                    <Uploader
                      className="w-32 rounded-md h-28"
                      value={images[0]}
                      onChange={(url) => onImagesChange(images, 0, url, setImages)}
                      onRemove={() => onImagesRemove(images, 0, setImages)}
                    />
                    <Uploader
                      className="w-32 rounded-md h-28"
                      value={images[1]}
                      onChange={(url) => onImagesChange(images, 0, url, setImages)}
                      onRemove={() => onImagesRemove(images, 0, setImages)}
                    />
                    <Uploader
                      className="w-32 rounded-md h-28"
                      value={images[2]}
                      onChange={(url) => onImagesChange(images, 0, url, setImages)}
                      onRemove={() => onImagesRemove(images, 0, setImages)}
                    />
                  </div>
                </div>
                <div className="flex-[33.3333333%]">
                  <p className="mb-2 text-sm font-semibold font-body text-icon">Hình ảnh chứng nhận (Tối đa 3 hình)</p>
                  <div className="flex items-center gap-x-4">
                    <Uploader
                      className="w-32 rounded-md h-28"
                      value={certificated[0]}
                      onChange={(url) => onImagesChange(certificated, 0, url, setCertificated)}
                      onRemove={() => onImagesRemove(certificated, 0, setCertificated)}
                    />
                    <Uploader
                      className="w-32 rounded-md h-28"
                      value={certificated[1]}
                      onChange={(url) => onImagesChange(certificated, 0, url, setCertificated)}
                      onRemove={() => onImagesRemove(certificated, 0, setCertificated)}
                    />
                    <Uploader
                      className="w-32 rounded-md h-28"
                      value={certificated[2]}
                      onChange={(url) => onImagesChange(certificated, 0, url, setCertificated)}
                      onRemove={() => onImagesRemove(certificated, 0, setCertificated)}
                    />
                  </div>
                </div>
                <div className="flex-[33.3333333%]">
                  <p className="mb-2 text-sm font-semibold font-body text-icon">Hình ảnh thùng (Tối đa 3 hình)</p>
                  <div className="flex items-center gap-x-4">
                    <Uploader
                      className="w-32 rounded-md h-28"
                      value={box_images[0]}
                      onChange={(url) => onImagesChange(box_images, 0, url, setBoxImages)}
                      onRemove={() => onImagesRemove(box_images, 0, setBoxImages)}
                    />
                    <Uploader
                      className="w-32 rounded-md h-28"
                      value={box_images[1]}
                      onChange={(url) => onImagesChange(box_images, 0, url, setBoxImages)}
                      onRemove={() => onImagesRemove(box_images, 0, setBoxImages)}
                    />
                    <Uploader
                      className="w-32 rounded-md h-28"
                      value={box_images[2]}
                      onChange={(url) => onImagesChange(box_images, 0, url, setBoxImages)}
                      onRemove={() => onImagesRemove(box_images, 0, setBoxImages)}
                    />
                  </div>
                </div>
              </FormRow>
              <QuillEditor control={control} name="description" title="Mô tả sản phẩm" />
            </Fragment>
          )}
        </form>
      </Card>
    </div>
  );
}

export default ProductDetail;
