import staticVariables from '@/static';
import { Avatar } from 'antd';
import moment from 'moment';

interface Props {
  isOwner?: boolean;
  showReply?: boolean;
}

export default function MessageItem(props: CommentItemType & Props) {
  return (
    <div
      className={`w-full flex ${
        props.isOwner ? 'justify-end' : 'justify-start'
      } `}
    >
      <div className="">
        <div className="mb-[10px]">
          <div
            className={`flex ${props.isOwner && 'flex-row-reverse'} gap-x-2`}
          >
            <div className="flex flex-col items-center">
              <Avatar src={props.user?.avatar || staticVariables.noImage.src} />
            </div>
            <div
              className={`flex p-[8px] flex-col  ${
                props.isOwner
                  ? 'rounded-br-[10px] rounded-l-[10px] bg-[#0084ff] text-white'
                  : 'rounded-bl-[10px] rounded-r-[10px] bg-[#f0f2f5] text-black'
              }   `}
            >
              <div className="max-w-[200px] min-w-[50px] w-fit px-[10px] text-[13px]">
                {props.content}
              </div>
            </div>
          </div>
          <div
            className={`flex ${
              props.isOwner
                ? 'mr-[40px]  justify-end'
                : 'ml-[40px] justify-start'
            }  mt-[5px] `}
          >
            <div className={`flex mt-1 text-[12px] text-[#65676b]`}>
              <p>{moment(props.created_at).fromNow()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
