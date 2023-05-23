import moment from 'moment';

function DiaryProcess() {
  return (
    <li className="mb-10 ml-6">
      <span className="absolute flex justify-center w-4 h-4 rounded-full iems-center -left-[9px] bg-primary"></span>
      <h3 className="flex items-center mb-2 text-lg font-bold uppercase text-icon">GIAO HÀNG</h3>
      <time className="block mb-2 text-sm font-normal leading-none text-icon2">
        <span className="font-bold text-icon2">Thời gian: </span>
        {moment('11/07/2019 04:03').format('DD/MM/yyyy - hh:mm A')}
      </time>
      <p className="mb-2 text-sm font-medium text-gray-500">
        Đơn vị phân phối khi nhận HÀNG sẽ xác nhận bằng cách quét tem chứa mã QR trên mỗi thùng /LÔ HÀNG. Thông tin về
        đơn vị phân phối cũng như thời gian nhận sẽ được lưu trữ trực tiếp trên Blockchain.
      </p>
      <div className="mb-2 text-sm font-bold">
        <span className="text-icon2">Cập nhật bởi: </span>
        <span className="text-icon">Công ty Phong Thúy</span>
      </div>
      <div>
        <h5 className="text-sm font-bold text-icon2">Hình ảnh:</h5>
        <div className="flex items-center gap-x-4">
          <img
            src="http://dummyimage.com/214x100.png/ff4444/ffffff"
            alt=""
            className="object-contain w-auto h-[70px] max-w-full rounded-md"
          />
        </div>
      </div>
    </li>
  );
}

export default DiaryProcess;
