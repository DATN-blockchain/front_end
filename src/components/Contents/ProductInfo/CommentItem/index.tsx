import staticVariables from '@/static';
import { faClock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Popover, Space, Tag, Typography } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

interface Props {
  isOwner?: boolean;
}

export default function CommentItem(props: CommentItemType & Props) {
  return (
    <div className="mb-[10px]">
      <div className="flex">
        <Popover
          content={
            <div className="flex flex-col space-y-5">
              <div className="flex space-x-5">
                <Avatar
                  size={100}
                  src={props.user?.avatar || staticVariables.noImage.src}
                />
                <div className="flex flex-col space-y-1">
                  <p className="text-[20px] font-bold">
                    {props.user?.username}
                  </p>
                  <Space>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ color: '#4b7dd2' }}
                    />
                    <p>{props.user?.email}</p>
                  </Space>
                  {/* <Space>
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ color: '#4978ca' }}
                    />
                    <p>{moment(props.user.).format('DD/MM/YYYY')}</p>
                  </Space> */}
                  <Tag color={'green-inverse'}>{props.user?.username}</Tag>
                </div>
              </div>
              <Space className="px-[20px] space-x-1 ">
                <button className="bg-green-500 text-white px-[20px] py-[5px] rounded-xl transition duration-200 ease-in-out hover:bg-green-700 active:bg-green-900 focus:outline-none">
                  Nhắn tin
                </button>
                <Link href={`/user/${props.user?.id}`}>
                  <button className="bg-green-500 text-white px-[20px] py-[5px] rounded-xl transition duration-200 ease-in-out hover:bg-green-700 active:bg-green-900 focus:outline-none">
                    Xem thông tin
                  </button>
                  {/* <p className="px-[20px] py-[5px] border-[1px] rounded-xl">
                    Xem thông tin
                  </p> */}
                </Link>
                <button className="bg-green-500 text-white px-[20px] py-[5px] rounded-xl transition duration-200 ease-in-out hover:bg-green-700 active:bg-green-900 focus:outline-none">
                  Báo cáo
                </button>
              </Space>
            </div>
          }
        >
          <div className="flex flex-col items-center">
            <Avatar src={props.user?.avatar || staticVariables.noImage.src} />
          </div>
        </Popover>
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
