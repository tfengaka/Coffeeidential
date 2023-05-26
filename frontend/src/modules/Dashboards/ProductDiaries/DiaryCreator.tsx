import { useForm } from 'react-hook-form';
import { Button, Card, FormRow, FormSelect, QuillEditor, TextField, Uploader } from '~/components';
import { useAppSelector } from '~/redux';

function DiaryCreator() {
  const { control } = useForm();
  const product = useAppSelector((state) => state.product.product);

  return (
    <Card className="w-full p-5 rounded-md h-fit">
      <form>
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
              <TextField title="Mã số" value={product?.id} disable required />
              <TextField title="Sản phẩm" value={product?.name} disable required />
              <FormSelect title="Loại hành động" control={control} name="action_type" options={[]} required />
            </div>
            <div className="w-full pb-4">
              <span className="text-sm font-semibold font-body text-icon">
                Ảnh quy trình sản xuất<strong className="text-error"> *</strong>
              </span>
              <div className="flex items-center mt-2 gap-x-4">
                <Uploader className="w-32 rounded-md h-28" />
                <Uploader className="w-32 rounded-md h-28" />
                <Uploader className="w-32 rounded-md h-28" />
              </div>
            </div>
          </FormRow>

          <div>
            <span className="block mb-2 text-sm font-semibold font-body text-icon">
              Mô tả quy trình <strong className="text-error"> *</strong>
            </span>
            <QuillEditor value="" onChange={(value) => console.log(value)} />
          </div>
        </div>
      </form>
    </Card>
  );
}

export default DiaryCreator;
