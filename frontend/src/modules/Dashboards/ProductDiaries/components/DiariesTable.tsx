import moment from 'moment';
import { Fragment } from 'react';
import Icons from '~/assets/icons';
import { Button } from '~/components';
import { useAppDispatch } from '~/redux';
import { setDiary } from '~/redux/reducers/diarySlice';
import { Diary } from '~/types';

interface DiariesTableProps {
  diaries: Diary[];
  openModal: () => void;
}

function DiariesTable({ diaries, openModal }: DiariesTableProps) {
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <table className="w-full h-full overflow-y-auto">
        <thead className="w-full text-sm font-semibold border-b font-body text-icon border-slate-200">
          <tr className="flex items-center w-full text-left select-none">
            <th className="w-24"></th>
            <th className="flex-auto px-5 py-3">Hành động</th>
            <th className="w-2/6 px-5 py-3 text-left">Mã Băm</th>
            <th className="w-1/6 px-5 py-3">Ghi nhận bởi</th>
            <th className="w-2/12 px-5 py-3">Thời gian</th>
            <th className="w-[11%] px-5 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody className="block overflow-y-auto h-[450px] max-h-full scroll-bar">
          {diaries.length > 0 &&
            diaries.map((item, index) => (
              <tr
                key={index}
                className={`flex items-center transition-colors bg-opacity-70 hover:bg-slate-50 text-icon2 select-none text-sm font-semibold font-body w-full ${
                  index % 2 === 0 ? 'bg-slate-100' : 'bg-white'
                }`}
              >
                <td className="w-24 py-3 pl-4">
                  <img src={item.images[0]} alt="" className="object-cover w-24 h-12" />
                </td>
                <td className="flex-auto px-5 py-3">
                  <p className="text-[15px] font-bold font-body text-icon">{item.action_name}</p>
                </td>
                <td className="flex-shrink-0 w-2/6 px-5 py-3 text-left truncate">{item.tx_hash}</td>
                <td className="w-1/6 px-5 py-3 text-left">{item.createdBy}</td>
                <td className="w-2/12 px-5 py-3">{moment(item.createdAt).format('DD/MM/yyyy - HH:MM A')}</td>
                <td className="w-[11%] px-5 py-3">
                  <Button
                    className="bg-[rgba(84,184,98)] bg-opacity-10 text-primary px-2 py-1 flex items-center gap-x-1 !rounded-lg hover:opacity-80 transition-opacity ease-in-out target"
                    onClick={() => {
                      dispatch(setDiary(item));
                      openModal();
                    }}
                  >
                    <Icons.Eye />
                    <span className="text-sm">Xem chi tiết</span>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default DiariesTable;
