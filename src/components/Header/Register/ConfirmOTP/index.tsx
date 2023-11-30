import instanceAxios from '@/api/instanceAxios';
import { Button, Form, Input, notification } from 'antd';
import React, { useState } from 'react';

export default function ConfirmOTP({
  nextStep,
  email,
}: {
  nextStep: () => void;
  email: string;
}) {
  const [loading, setLoading] = useState(false);
  const fethRegister = async (data: any) => {
    setLoading(true);
    await instanceAxios
      .put(
        `auth/verify_code?email=${email}&verify_code=${data.verify_code}&new_password=${data.new_password}&password_confirm=${data.password_confirm}`
      )
      .then((res) => {
        nextStep();
        notification.success({
          message: 'Đăng kí thành công',
          description:
            'Bây giờ bạn hãy đăng nhập để có thể sử dụng ứng dụng của chúng tôi',
        });
      })
      .catch((err) => {
        notification.error({
          message: 'Xác thực không thành công',
          description: err.data,
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Form
        className="m-auto"
        name="basic"
        labelCol={{ span: 6 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }}
        initialValues={{ remember: true }}
        onFinish={fethRegister}
        onFinishFailed={() => console.log('OK')}
        autoComplete="off"
      >
        {/* <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item> */}
        <Form.Item
          label="Verify code"
          name="verify_code"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="new_password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="RePassword"
          name="password_confirm"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <button
            disabled={loading}
            className="overflow-hidden w-fit px-[20px] h-12 block m-auto mt-[20px] bg-green-500 text-white border-none rounded-xl text-lg font-bold cursor-pointer relative z-10 group"
            type="submit"
          >
            Đăng ký
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-300 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
            <p className="text-white group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              Đăng ký
            </p>
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
