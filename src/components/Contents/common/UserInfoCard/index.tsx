import staticVariables from '@/static';
import {
  MailOutlined,
  PhoneOutlined,
  RiseOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Input } from 'antd';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import CustomInput from '../InputCustom/InputCustom';

export default function UserInfoCard({
  showButton = true,
}: {
  showButton?: boolean;
}) {
  const [isOwner, setIsOwner] = useState(true);
  const [userName, setUserName] = useState('nguyen Van A');
  const [userPhone, setUserPhone] = useState('01232131');
  const [userEmail, setUserEmail] = useState('simpraidenei@gmail.com');
  const [userAddress, setuserAddress] = useState('14 - Doan Uan - Khue My');

  return (
    <div>
      <div className="flex items-center border-b-[1px] pb-[50px]">
        <div className="flex items-center gap-y-5 flex-col w-1/5">
          <Avatar size={150} src={staticVariables.logoRaiden.src} />
          {showButton && (
            <Link href={`/user/${1}`}>
              <Button>Xem them</Button>
            </Link>
          )}
        </div>
        <div className="flex gap-y-5 flex-col border-[1px] px-[30px] py-[20px] rounded">
          <div className="flex items-center gap-x-3">
            <UserOutlined style={{ fontSize: 25 }} />
            {isOwner ? (
              <CustomInput
                name="name"
                initialValue={userName}
                input={{
                  onChange: (e) => {
                    setUserName(e.target.value);
                  },
                }}
                APIurl={''}
                queryType={'user'}
              />
            ) : (
              <p>{userName}</p>
            )}
          </div>
          <div className="flex items-center gap-x-3">
            <PhoneOutlined style={{ fontSize: 25 }} />
            {isOwner ? (
              <CustomInput
                name="name"
                initialValue={userPhone}
                APIurl={''}
                queryType={'user'}
              />
            ) : (
              <p>{userPhone}</p>
            )}
          </div>
          <div className="flex items-center gap-x-3">
            <MailOutlined style={{ fontSize: 25 }} />
            {isOwner ? (
              <CustomInput
                name="name"
                initialValue={userEmail}
                APIurl={''}
                queryType={'user'}
              />
            ) : (
              <p>{userEmail}</p>
            )}
          </div>
          <div className="flex items-center gap-x-3">
            <RiseOutlined style={{ fontSize: 25 }} />
            {isOwner ? (
              <CustomInput
                name="name"
                initialValue={userAddress}
                APIurl={''}
                queryType={'user'}
              />
            ) : (
              <p>{userAddress}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
