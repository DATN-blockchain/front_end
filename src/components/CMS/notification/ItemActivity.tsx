import { formatDate } from '@/ultis/fomatDate';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import moment from 'moment';

interface IProps {
  message: string;
  createAt: string;
}

export default function ItemActivity({ message, createAt }: IProps) {
  const date = new Date(createAt);
  const outputString = formatDate(date as any);
  return (
    <div className="flex px-3 py-2 rounded-2xl gap-3 items-center hover:bg-[#e8f7fa] border">
      <div>
        <FontAwesomeIcon
          className="p-[10px] border bg-green-100 border-green-600 shadow-lg rounded-full "
          icon={faClipboardList}
          style={{ color: '#e48e66' }}
        />
      </div>
      <div>
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
