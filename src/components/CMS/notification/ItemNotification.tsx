import staticVariables from '@/static';
import { formatDate } from '@/ultis/fomatDate';
import { faBell, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Tooltip } from 'antd';
import moment from 'moment';

interface IProps {
  message: string;
  createAt: string;
  data: NotificationItemType;
}

export default function ItemNotification({ message, createAt, data }: IProps) {
  return (
    <div className="flex w-full px-3 py-2 rounded-2xl gap-3 items-center hover:bg-[#e8f7fa] border">
      <div>
        <Image
          className="p-[5px] object-cover border bg-green-100 border-green-600 shadow-lg rounded-full "
          alt=""
          width={36}
          height={36}
          preview={false}
          src={data.user?.avatar || staticVariables.noImage.src}
        />
      </div>
      {/* <FontAwesomeIcon
        className="p-[10px] border bg-green-100 border-green-600 shadow-lg rounded-full "
        icon={faBell}
        style={{ color: '#ffae00' }}
      /> */}
      {/* <FontAwesomeIcon width={36} height={36} className="w-8 h-8" icon={faBell} /> */}
      <div className="w-full">
        <Tooltip title={message}>
          <p className="w-full text-base truncate text-[#2f2f2f] pr-[50px]">
            {message}
          </p>
        </Tooltip>
        <p className="text-[#959595] text-[12px] font-semibold">
          {moment(createAt).format('DD/MM/YYYY - HH:MM:ss')}
        </p>
      </div>
    </div>
  );
}
