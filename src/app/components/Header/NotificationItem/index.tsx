import instanceAxios from '@/api/instanceAxios';
import staticVariables from '@/static';
import { DeleteTwoTone } from '@ant-design/icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, ConfigProvider, Popconfirm, message } from 'antd';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useState } from 'react';
import { useSWRConfig } from 'swr';

export default function NotificationItem(props: NotificationItemType) {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const { mutate } = useSWRConfig();
  const tNotifications = useTranslations('notification');
  const tAction = useTranslations('action');
  const route = useRouter();
  const fetchGetDetail = async () => {
    await instanceAxios
      .get(`notifications/${props.data?.data?.notification_id}/detail`)
      .then((res) => {
        mutate('notifications/list');
      })
      .catch((err) =>
        console.log(
          'Error',
          `notifications/${props.data?.data?.notification_id}/detail`
        )
      );
  };
  const fetchDeleteNotification = async () => {
    await instanceAxios
      .delete(`notifications/${props.data?.data?.notification_id}`)
      .then((res) => {
        message.success('Bạn đã xóa thông báo');
        mutate('notifications/list');
      })
      .catch((err) => message.error('Xóa thông báo thất bại'));
  };
  return (
    <div
      className={`relative flex items-center p-[10px] ${
        props.data?.data?.unread ? 'hover:bg-sky-200' : 'hover:bg-gray-100'
      } ${
        props.data?.data?.unread ? `bg-sky-50` : ''
      } rounded max-w-[400px] gap-x-3`}
      onMouseOver={() => setShowDeleteIcon(true)}
      onMouseOut={() => setShowDeleteIcon(false)}
    >
      {props.data?.data?.unread && !showDeleteIcon && (
        <FontAwesomeIcon
          className="absolute top-1/2 right-[10px]"
          icon={faCircle}
          size={'1x'}
          style={{ color: '#0866ff' }}
        />
      )}
      {showDeleteIcon && (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                primaryColor: '#e62929',
                colorPrimaryBgHover: '#e62929',
              },
            },
            token: {
              colorBgContainer: '#7f84d4',
            },
          }}
        >
          {/* <Popconfirm
            title={'Xóa thông báo'}
            onConfirm={fetchDeleteNotification}
          > */}
          <DeleteTwoTone
            onClick={fetchDeleteNotification}
            className="absolute top-1/2 right-[10px]"
          />
          {/* </Popconfirm> */}
        </ConfigProvider>
      )}
      <Avatar size={'large'} src={props.user?.avatar} />
      <div className="w-9/12">
        <div
          onClick={async () => {
            await fetchGetDetail();
            route.push(
              `/${
                props.data?.params?.notification_type === 'PRODUCT_NOTIFICATION'
                  ? 'product'
                  : 'market'
              }/${
                props.data?.params?.notification_type === 'PRODUCT_NOTIFICATION'
                  ? props.data?.params.product_id
                  : props.data?.params?.marketplace_id
              }`
            );
          }}
          className="hover:text-black"
        >
          {/* {props.params?.action ? (
            <div>
              {`The ${props.params.product_name} ${tAction(
                props.params.action
              )}  ${tNotifications(props.params.notification_type)}`}
            </div>
          ) : ( */}
          <div
            className=" w-full line-clamp-2 text-justify"
            dangerouslySetInnerHTML={{
              __html: props.data?.message?.toString() || '',
            }}
          ></div>
          <p
            className={
              props.data?.data?.unread ? 'text-[#0866ff]' : 'text-gray-500'
            }
          >
            {moment(props.data?.data?.created_at).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}
