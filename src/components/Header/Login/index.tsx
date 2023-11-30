'use client';
import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { nextEvent } from '@/reducers/nextEventSlice';
import { setshowFormLogin } from '@/reducers/showFormSlice';
import { initialUser, setLogin } from '@/reducers/userSlice';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { faArrowRight, faDiagramNext } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, notification } from 'antd';
import { setCookie } from 'cookies-next';
import { title } from 'process';
import React from 'react';
import { useSWRConfig } from 'swr';

type FieldType = {
  email?: string;
  username?: string;
  password?: string;
  remember?: string;
};

export default function Login({ onFinish }: { onFinish: () => void }) {
  const dispatch = useAppDispatch();
  const requireLogin = useAppSelector((state) => state.nextEvent.requireLogin);
  const { mutate } = useSWRConfig();
  const [form] = Form.useForm();

  const fethLogin = async (data: object) => {
    await instanceAxios
      .post('auth/login', data)
      .then((res) => {
        onFinish();
        dispatch(setshowFormLogin({ showFormLogin: false }));
        dispatch(
          setLogin({ logged: true, user: res.data.data.user as UserType })
        );
        setCookie('access_token', res.data.data.access_token);
        instanceAxios.defaults.headers.common.Authorization = `Bearer ${res.data.data.access_token}`;
        notification.success({
          message: 'Thông báo',
          description: `Xin chào ${res.data.data.user.username}`,
        });
        form.resetFields();
        requireLogin();
        dispatch(nextEvent({ requireLogin: () => {} }));
      })
      .catch((err) => {
        notification.error({
          message: 'Thông báo',
          description: `Đăng nhập thất bại`,
        });
      })
      .finally(() => {
        mutate('marketplace/list');
      });
  };
  // const fethGetUser = async () => {
  //   await instanceAxios
  //     .get('user/me', {
  //       headers: {
  //         Authorization: `Bearer ${access}`,
  //       },
  //     })
  //     .then((res) => {
  //       dispatch(setLogin({ logged: true, user: res.data }));
  //       onFinish();
  //       notification.success({
  //         message: 'Thông báo',
  //         description: 'Xin chào simpraidenei',
  //       });
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    <div>
      <p className="my-[30px] text-[32px] font-normal block text-center">
        Đăng nhập
      </p>
      <Form layout="vertical"
        form={form}
        name="normal_login"
        className="login-form px-[20px]"
        labelCol={{ span: 6 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={fethLogin}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            // style={{
            //   boxShadow: `rgba(133, 189, 215, 0.8784313725) 0px 12px 10px -8px`,
            // }}
            className="shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.8784313725)] h-10 text-[18px]"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            className="shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.8784313725)] h-10 text-[18px]"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item>
          <button
            // onClick={() => {}}
            // className=""
            // type="primary"
            className="overflow-hidden w-full px-[20px] h-12 block m-auto mt-[20px] bg-[#6dd297] text-white border-none rounded-xl text-lg font-bold cursor-pointer relative z-10 group"
            // htmlType="submit"
            type="submit"
          >
            {/* <button  > */}
            Đăng nhập
            <span className="absolute w-full h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
            <span className="absolute w-full h-32 -top-8 -left-2 bg-green-300 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
            <span className="absolute w-full h-32 -top-8 -left-2 bg-green-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
            <p className="text-white group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            Login <FontAwesomeIcon icon={faArrowRight} width={"40px"} style={{color: "white",}} />
            </p>
            {/* </button> */}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
// export const  getServerSideProps =async () => {
// }
