import staticVariables from '@/static';
import { Avatar, Space } from 'antd';
import moment from 'moment';

interface Props {
  isOwner?: boolean;
}

export default function CommentItem(props: CommentItemType & Props) {
  return (
    <div className="mb-[10px]">
      <div className="flex">
        <div className="flex flex-col items-center">
          <Avatar src={props.user?.avatar || staticVariables.noImage.src} />
        </div>
        <div className="flex ml-[10px] p-[8px] flex-col rounded-bl-[10px] rounded-r-[10px] bg-[#f0f2f5] ">
          <Space className="text-[14px]">
            <p className="font-medium">{props.user?.username}</p>
            {props.isOwner && (
              <p className="text-[12px] text-blue-600">Owner</p>
            )}
            <p className="w-fit p-[5px]  bg-blue-100 rounded-lg text-blue-500 text-[11px] font-light">
              {props.user?.username}
            </p>
          </Space>
          <div className="max-w-[500px] min-w-[50px] w-fit text-[13px]  ">
            {props.content}
          </div>
        </div>
      </div>
      <div className="ml-[40px] mt-[5px]">
        <div className="flex mt-1 space-x-5 ml-3 text-[12px]  tetx-[#65676b]">
          <p className="font-semibold">Phản hồi</p>
          <p>{moment(props.created_at).fromNow()}</p>
        </div>
      </div>
    </div>
  );
}
