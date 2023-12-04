'use client';

import instanceAxios from '@/api/instanceAxios';
import staticVariables from '@/static';
import {
  CloseOutlined,
  MessageOutlined,
  SendOutlined,
} from '@ant-design/icons';
import {
  faEnvelope,
  faLocationDot,
  faMagnifyingGlass,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Drawer, FloatButton, Input, Modal, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import moment from 'moment';
import { memo, useCallback, useEffect, useState } from 'react';
import CommentInput from '../Contents/common/CommentInput';
import MessageItem from './MessageItem';
import { useAppDispatch, useAppSelector } from '@/hooks';
import useSWR, { mutate } from 'swr';
import pusher from '@/services/pusher';
import { closeMessage, openMessage } from '@/reducers/openMessageSilce';

interface User {
  username: string;
  avatar: string;
  user_id: string;
}

interface LastMessage {
  sender_id: string;
  receiver_id: string;
  is_read: boolean;
  create_at: string;
  id: string;
  content: string;
  data: any;
  updated_at: string;
}

interface MessageData {
  user: User;
  last_message: LastMessage;
}

// --------------------

interface UserMessage {
  id: string;
  avatar: string | null;
  username: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  system_role: string;
  address_wallet: string;
}

interface Messenger {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  data: any; // Adjust the type accordingly
  is_read: boolean;
  create_at: string;
  updated_at: string;
  sender: UserMessage;
  receiver: UserMessage;
}

export default memo(function Footer() {
  const currentUser = useAppSelector((state) => state.user.user);
  const currentReceive = useAppSelector(
    (state) => state.showMessage.currentReceiver
  );
  const openMessageForm = useAppSelector((state) => state.showMessage.open);
  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.user.logged);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [changeMessage, setChangeMessage] = useState(false);

  const [dataUser, setDataUser] = useState<MessageData[]>([]);
  const [inforUser, setInforUser] = useState<string>('');
  const [valueInput, setValueInput] = useState('');
  const [dataMessage, setDataMessage] = useState<Messenger[]>([]);
  // const [currentReceive, setCurrentReceive] = useState<MessageData>();

  const fetchDataUser = () => {
    instanceAxios
      .get(`messenger/list_messenger_contacts`)
      .then((res: any) => {
        setDataUser(res?.data?.data || []);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchDataUser();
  }, [changeMessage, logged]);

  const fetchDataListMessage = useCallback(() => {
    instanceAxios
      .get(`/messenger/${currentReceive.id}/list_messenger_detail`)
      .then((res: any) => {
        setDataMessage(res?.data?.data?.list_messenger || []);
      })
      .catch((err) => console.log(err));
  }, [currentReceive.id]);
  useEffect(() => {
    if (!logged) setOpenMessageModal(false);
  }, [logged]);

  useEffect(() => {
    // if (!inforUser) return;
    fetchDataListMessage();
  }, [fetchDataListMessage, changeMessage]);

  useEffect(() => {
    const channel = pusher.subscribe('general-channel');
    channel.bind(currentUser.id || '', (data: any) => {
      if (data?.type === 'MESSENGER') {
        mutate(`/messenger/list_messenger_detail`);
      }
    });

    return () => {
      pusher.unsubscribe('general-channel');
    };
  }, [currentUser]);

  useSWR(`/messenger/list_messenger_detail`, fetchDataListMessage);

  const fetchSubmitMessage = async () => {
    if (!valueInput.trim()) {
      message.warning('Vui lòng nhập nội dung');
    } else {
      await instanceAxios
        .post(`messenger/create`, {
          receiver_id: currentReceive?.id,
          content: valueInput,
        })
        .then((res) => {
          message.success('Đã nhắn tin');
          mutate(`/messenger/list_messenger_detail`);
          setValueInput('');
          setChangeMessage(!changeMessage);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="w-full overflow-x-hidden p-[100px] bg-stone-900">
      <div className="w-full flex text-[16px] text-[#6C737D] ">
        <div className="w-1/4">
          <p className="py-[10px] text-[#E1E8ED] font-extrabold">
            About Smarty App
          </p>
          <p>
            Turpis egestas sed tempus urna et. Egestas diam in arcu cursus
            euismod quis viverra nibh.
            <br /> Nec nam aliquam sem et tortor consequat. Sed risus ultricies
            tristique nulla aliquet.
          </p>
        </div>
        <div className="w-1/4">
          <Avatar
            className="m-auto block"
            size={200}
            src={staticVariables.qc6.src}
          />
        </div>
        <div className="w-1/4">
          <p className="py-[10px] text-[#E1E8ED] font-extrabold">
            About Smarty App
          </p>
          <div className="textwidget entry-content">
            <ul>
              <li>
                <a href="#">Introduction</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">News and Stories</a>
              </li>
              <li>
                <a href="#">Roadmap</a>
              </li>
              <li>
                <a href="#">Pricing Plans</a>
              </li>
              <li>
                <a href="https://demo.creativethemes.com/blocksy/app/privacy-policy/">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/4 ">
          <p className="py-[10px] text-[#E1E8ED] font-extrabold">Contact</p>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-5 ">
              <FontAwesomeIcon
                className="p-[10px] rounded-full border-2 border-[#6C737D]"
                icon={faLocationDot}
              />
              <a
                target="_blank"
                href="https://www.google.com/maps/place/566+N%C3%BAi+Th%C3%A0nh,+Ho%C3%A0+C%C6%B0%E1%BB%9Dng+Nam,+H%E1%BA%A3i+Ch%C3%A2u,+%C4%90%C3%A0+N%E1%BA%B5ng"
              >
                566 Núi Thành, Hoà Cường Nam, Hải Châu, Đà Nẵng
              </a>
            </div>
            <div className="flex items-center space-x-5">
              <FontAwesomeIcon
                className="p-[10px] rounded-full border-2 border-[#6C737D]"
                icon={faPhone}
              />
              <a href="#">0333322615</a>
            </div>
            <div className="flex items-center space-x-5">
              <FontAwesomeIcon
                className="p-[10px] rounded-full border-2 border-[#6C737D]"
                icon={faEnvelope}
              />
              <a href="#">nvdluan@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
      {logged && (
        <FloatButton
          badge={{ count: 2 }}
          shape="square"
          type="primary"
          onClick={() => setOpenDrawer(true)}
          style={{ right: 24 }}
          icon={<MessageOutlined />}
        />
      )}

      <Drawer
        title="Messenger"
        placement="right"
        width={500}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <Input
          prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tìm kiếm"
        />
        {dataUser?.map((item, index) => (
          <div
            onClick={() => {
              // setCurrentReceive(item);

              setInforUser(item?.user?.user_id);
              // setOpenMessageModal(true);
              dispatch(
                openMessage({
                  id: item?.user.user_id,
                  avatar: item?.user.avatar,
                  username: item?.user.username,
                })
              );
              setOpenDrawer(false);
            }}
            key={index}
            className="flex items-center mt-3 p-2 rounded-xl cursor-pointer hover:bg-[#ccc]"
          >
            <Avatar
              src={item?.user?.avatar}
              style={{ width: '50px', height: '50px' }}
              className="rounded-full"
            />
            <div className="pl-4">
              <Meta
                title={
                  <span className="text-[16px] font-normal">
                    {item?.user?.username}
                  </span>
                }
              />

              <p className="text-gray-400 text-[16px]">
                {item?.last_message?.content}
              </p>
            </div>
            <div className="ml-auto text-gray-600 text-sm pl-[10px]">
              {moment(item?.last_message?.create_at).fromNow()}
            </div>
          </div>
        ))}
      </Drawer>
      {openMessageForm && (
        <div className="fixed bg-white border rounded-xl  w-[340px] bottom-2 right-20">
          <div className="flex justify-between border-b py-[10px] px-[20px]">
            <div className="flex items-center space-x-2">
              <div>
                <Avatar size={'large'} src={currentReceive?.avatar} />
              </div>
              <p className="text-[18px]">
                {currentReceive?.username ?? 'Loading...'}
              </p>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setOpenMessageModal(false);
                dispatch(closeMessage());
                // setCurrentReceive({ avatar: '', name: '', id: '' });
                // setInforUser('');
              }}
            >
              <CloseOutlined />
            </div>
          </div>
          <div className="h-[300px] flex flex-col-reverse overflow-y-auto p-[20px]">
            <div className="w-full pr-2">
              {dataMessage?.map((item, index) => (
                <MessageItem
                  key={index}
                  content={item?.content}
                  isOwner={currentUser.id === item.sender.id}
                />
              ))}
            </div>
          </div>
          {/* <CommentInput marketId="12" /> */}
          <div>
            <div className={`flex items-center p-[20px] py-[10px] border-t`}>
              <div>
                <Avatar
                  className="mr-[10px]"
                  size="large"
                  src={currentUser.avatar || staticVariables.noImage.src}
                />
              </div>
              <Input.TextArea
                autoSize
                placeholder="Nhắn tin ..."
                className="max-h-[300px]"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
              />
              <SendOutlined
                onClick={fetchSubmitMessage}
                style={{ color: '#366ece' }}
                size={30}
                className="text-xl px-[10px]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
