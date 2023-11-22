import instanceAxios from '@/api/instanceAxios';
import { Button, Form, Input, Typography, notification } from 'antd';
import React, { useState } from 'react';

type FieldType = {
  old_password?: string;
  new_password?: string;
  new_password_confirm?: string;
};
export default function ChangPassword({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (data: FieldType) => {
    setLoading(true);
    await instanceAxios
      .put(`auth/reset_password`, data)
      .then((res) => {
        notification.success({
          message: 'Thông báo',
          description: 'Đổi mật khẩu thành công',
        });
        form.resetFields();
      })
      .catch((err) =>
        notification.error({
          message: 'Thông báo',
          description: 'Đổi mật khẩu thất bại',
        })
      )
      .finally(() => setLoading(false));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={className}>
      <Typography.Title className="w-fit m-auto" level={3}>
        Thay đổi mật khẩu
      </Typography.Title>
      <Form
        form={form}
        name="basic"
        className="mt-[50px]"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Old Password"
          name="old_password"
          rules={[
            { required: true, message: 'Please input your Old Password!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="New Password"
          name="new_password"
          rules={[
            { required: true, message: 'Please input your New Password!' },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label="Pre New Password"
          name="new_password_confirm"
          rules={[
            { required: true, message: 'Please input your Pre New Password!' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={loading} className="block m-auto" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
