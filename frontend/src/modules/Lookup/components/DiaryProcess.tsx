import { Markup } from 'interweave';
import moment from 'moment';
import Icons from '~/assets/icons';
import { LookUpDiary } from '~/types';

interface IDiaryProcess {
  data: LookUpDiary;
}

function DiaryProcess({ data }: IDiaryProcess) {
  return (
    <li className="mb-10 ml-6">
      <span className="absolute flex justify-center w-4 h-4 rounded-full iems-center -left-[9px] bg-primary"></span>
      <h3 className="flex items-center mb-2 text-lg font-bold uppercase text-icon">{data.action_name}</h3>
      <time className="block mb-2 text-sm font-normal leading-none text-icon2">
        <span className="font-bold text-icon2">Thời gian: </span>
        {moment(data.createdAt).format('DD/MM/yyyy - hh:mm A')}
      </time>
      <Markup className="text-sm font-medium text-gray-500" content={data.descriptions} />
      <div className="my-2 text-sm font-bold">
        <span className="text-icon2">Cập nhật bởi: </span>
        <span className="text-icon">{data.createdBy.full_name}</span>
      </div>
      <div className="mb-1">
        <h5 className="text-sm font-bold text-icon2">Hình ảnh:</h5>
        <div className="flex items-center gap-x-4">
          {data.images.map((image, index) => (
            <img key={index} src={image} alt="" className="object-contain w-auto h-[70px] max-w-full rounded-md" />
          ))}
        </div>
      </div>
      <a
        href={`${import.meta.env.VITE_EXPLORER_URL}/tx/${data?.tx_hash}`}
        className="inline-flex text-icon text-sm font-bold underline transition-colors hover:text-primary20 gap-x-[2px]"
        target="_blank"
        rel="noreferrer"
      >
        Thông tin đã được xác thực trên Blockchain
        <Icons.Link />
      </a>
    </li>
  );
}

export default DiaryProcess;
