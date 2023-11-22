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
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
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

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button
            loading={loading}
            className="bg-[#1677ff] mt-[30px]"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
