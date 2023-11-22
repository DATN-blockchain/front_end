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
      <Form
        className="m-auto"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
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
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="username"
          name="username"
          rules={[{ required: false }]}
        >
          <Input />
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

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button
            loading={loading}
            className="mt-[30px] bg-[#1677ff]"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <Button onClick={nextStep}>OK</Button> */}
    </div>
  );
}
