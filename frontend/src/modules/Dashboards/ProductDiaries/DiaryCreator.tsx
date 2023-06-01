import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Button, Card, FormRow, FormSelect, QuillEditor, TextField, Uploader } from '~/components';
import { useFetchUnit } from '~/hooks';
import { useAppSelector } from '~/redux';
import { onImagesChange, onImagesRemove } from '~/utils';

interface DiaryForm {
  action: string;
  descriptions: string;
}

function DiaryCreator() {
  const { actions } = useFetchUnit();
  const product = useAppSelector((state) => state.product.product);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DiaryForm>({
    resolver: yupResolver(
      Yup.object({
        action: Yup.string().required('Thông tin bắt buộc'),
        descriptions: Yup.string().required('Thông tin bắt buộc'),
      })
    ),
    mode: 'onSubmit',
  });

  const [images, setImages] = useState<string[]>([]);

  const onSubmit = handleSubmit(async (data) => {
    const reqData = {
      ...data,
      images,
    };
    console.log(reqData);
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
              <TextField title="Mã số" value={product?.order_id} disable required />
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

          <div>
            <span className="block mb-2 text-sm font-semibold font-body text-icon">
              Mô tả quy trình <strong className="text-error"> *</strong>
            </span>
            <QuillEditor control={control} name="descriptions" />
          </div>
        </div>
      </form>
    </Card>
  );
}

export default DiaryCreator;
