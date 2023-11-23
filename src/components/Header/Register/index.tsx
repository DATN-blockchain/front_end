import { Button, Form, Result, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  FormOutlined,
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import RegisterForm from './RegisterForm';
import RegisterEnterprise from './RegisterEnterprise';
import Rules from './Rules';
import { useAppDispatch } from '@/hooks';
import { initialUser, setLogin } from '@/reducers/userSlice';
import ConfirmOTP from './ConfirmOTP';

export default function Register({
  onFinish,
  onFinishOTP,
}: {
  onFinish: () => void;
  onFinishOTP: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const nextStep = (e?: string) => {
    if (current === steps.length - 1) {
      onFinishOTP();
    } else {
      setCurrent(current + 1);
      if (e) setEmail(e);
    }
  };
  const steps = [
    <RegisterForm key={0} nextStep={nextStep} />,
    <ConfirmOTP email={email} nextStep={nextStep} key={1} />,
  ];

  // const steps = [
  //   {
  //     title: 'First',
  //     content: <RegisterForm nextStep={nextStep} />,
  //   },
  //   {
  //     title: 'Second',
  //     content: <RegisterEnterprise />,
  //   },
  //   {
  //     title: 'Last',
  //     content: <Rules />,
  //   },
  //   {
  //     title: 'Last',
  //     content: (
  //       <Result
  //         status="success"
  //         title="DK tai khoan thanh cong"
  //         subTitle="bay h ban co the su dung trang web cua chung toi"
  //         extra={[
  //           <Button
  //             onClick={() => {
  //               onFinish();
  //               dispatch(setLogin({ logged: true, user: initialUser }));
  //             }}
  //             key="buy"
  //           >
  //             OK
  //           </Button>,
  //         ]}
  //       />
  //     ),
  //   },
  // ];
  const items = [
    {
      title: 'Đăng ký tài khoản',
      status: 'wait',
      icon: <UserOutlined />,
    },
    {
      title: 'Đăng kí doanh nghiệp',
      status: 'wait',
      icon: <SolutionOutlined />,
    },
    {
      title: 'Cam kết vai trò',
      status: 'wait',
      icon: <FormOutlined />,
    },
    {
      title: 'Hoàn thành',
      status: 'wait',
      icon: <SmileOutlined />,
    },
  ];
  return (
    <div>
      <p className="text-center text-3xl my-[50px]">Đăng ký</p>
      {steps[current]}
      {/* <p className="text-center text-3xl my-[50px]">Đăng kí và xác thực</p> */}
      {/* <Steps
        current={current}
        items={items.map((item, index) => ({
          key: index,
          title: item.title,
          icon: current === index ? <LoadingOutlined /> : item.icon,
        }))}
        onChange={() => (items[current].status = 'process')}
      />
      <div>
        {steps[current].content}
        <div onClick={() => setCurrent(current - 1)}>previous</div>
        <div onClick={nextStep}>next</div>
      </div> */}
    </div>
  );
}
