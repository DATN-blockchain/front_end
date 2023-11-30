import instanceAxios from '@/api/instanceAxios';
import { Button, Form, Input, notification } from 'antd';
import React, { useState } from 'react';

type FieldType = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  username?: string;
  email?: string;
  password?: string;
  remember?: string;
};
export default function RegisterForm({
  nextStep,
}: {
  nextStep: (e?: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (data: FieldType) => {
    setLoading(true);
    await instanceAxios
      .post('auth/register', data)
      .then((res) => {
        nextStep(data.email);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: 'Xác thực không thành công',
          // description: err.data,
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Form layout='vertical'
        className="m-auto"
        name="basic"
        labelCol={{ span: 6 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: false }]}
        >
          <Input className='h-10 text-[18px]'/>
        </Form.Item>
        <Form.Item<FieldType>
          label="username"
          name="username"
          rules={[{ required: false }]}
        >
          <Input className='h-10 text-[18px]' />
        </Form.Item>
        {/* <Form.Item<FieldType>
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item> */}

        <Form.Item>
          {/* <Button
            loading={loading}
            className="mt-[30px] bg-[#1677ff]"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button> */}
          <button
            disabled={loading}
            className="overflow-hidden w-full px-[20px] h-12 block m-auto mt-[20px] bg-green-500 text-white border-none rounded-xl text-lg font-bold cursor-pointer relative z-10 group"
            type="submit"
          >
            Đăng ký
            <span className="absolute w-full h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
            <span className="absolute w-full h-32 -top-8 -left-2 bg-green-300 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
            <span className="absolute w-full h-32 -top-8 -left-2 bg-green-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
            <p className="text-white group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              Đăng ký
            </p>
          </button>
        </Form.Item>
      </Form>
      {/* <Button onClick={nextStep}>OK</Button> */}
    </div>
  );
}
