import { Markup } from 'interweave';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import Icons from '~/assets/icons';
import { Backdrop, Button, Card, FormRow, Loading } from '~/components';
import { useAppSelector } from '~/redux';
import { Product } from '~/types';

interface DiaryModalProps {
  product: Product | null;
  onClose: () => void;
}

function DiaryModal({ product, onClose }: DiaryModalProps) {
  const diary = useAppSelector((state) => state.diary.diary);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (diary) setLoading(false);
    }, 300);
    return () => {
      clearInterval(timeout);
    };
  }, [diary]);

  return (
    <Backdrop className="flex flex-col items-center p-16">
      <Card className="relative w-full h-full max-w-5xl p-2 overflow-auto font-landing">
        <Button
          className="absolute top-4 right-4 text-icon !rounded-full p-1 hover:bg-error hover:bg-opacity-10 hover:text-error"
          onClick={onClose}
        >
          <Icons.Close />
        </Button>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loading />
          </div>
        ) : (
          <Fragment>
            <div className="px-4 py-2 border-b border-slate-200">
              <h3 className="text-xl font-bold uppercase text-icon">Chi tiết quy trình sản xuất</h3>
              <p className="font-medium text-icon2">Mô tả chi tiết quá trình sản xuất</p>
            </div>
            <div className="px-4 py-2 mt-1">
              <h3 className="mb-2 text-xl font-bold uppercase text-icon">{diary?.action_name}</h3>
              <div className="mt-1">
                <span className="font-bold text-icon">Sản phẩm: </span>
                <span className="my-1 font-bold text-icon2">{product?.name}</span>
                <p className="font-bold text-icon">
                  Mã sản phẩm: <span className="text-icon2">{product?.id}</span>
                </p>
              </div>
              <FormRow>
                <div className="w-full mt-1">
                  <span className="font-bold text-icon">Ghi nhận bởi: </span>
                  <span className="font-bold text-icon2">{diary?.create_by}</span>
                </div>
                <div className="w-full mt-1">
                  <span className="font-bold text-icon">Thời gian: </span>
                  <span className="text-sm font-semibold text-icon2">
                    {moment(diary?.create_at).format('DD/MM/yyyy - HH:MM A')}
                  </span>
                </div>
              </FormRow>
              <div className="mt-1">
                <h5 className="font-bold text-icon">Mô tả chi tiết</h5>
                <div className="p-2 font-body rounded-sm bg-slate-200 text-icon w-full min-h-[150px]">
                  <Markup content={diary?.description} />
                </div>
              </div>
              <div className="mt-1">
                <h5 className="font-bold text-icon">Hình ảnh:</h5>
                <div className="grid grid-cols-3 gap-4">
                  {diary?.images?.map((image, index) => (
                    <img src={image} alt="diary" className="object-cover rounded-md cursor-pointer" key={index} />
                  ))}
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Card>
    </Backdrop>
  );
}

export default DiaryModal;
