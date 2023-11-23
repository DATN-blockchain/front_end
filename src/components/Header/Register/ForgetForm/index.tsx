import instanceAxios from '@/api/instanceAxios';
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Typography,
  notification,
} from 'antd';
import React, { useState } from 'react';

type FieldType = {
  email?: string;
  new_password?: string;
  verify_code?: string;
  password_confirm?: string;
};

export default function ForgetForm({
  onFinishOTP,
}: {
  onFinishOTP: () => void;
}) {
  const [sentMail, setSentMail] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const fetchSendMail = async () => {
    setLoading(true);
    await instanceAxios
      .put(`auth/forget_password?email=${email}`)
      .then((res) => setSentMail(true))
      .catch((err) => {})
      .finally(() => setLoading(false));
  };
  const fetchConfirmOTP = async (data: FieldType) => {
    setLoading(true);
    await instanceAxios
      .put(
        `auth/verify_code?email=${email}&verify_code=${data.verify_code}&new_password=${data.new_password}&password_confirm=${data.password_confirm}`
      )
      .then((res) => {
        console.log(res.data);
        setSentMail(false);
        onFinishOTP();
        notification.success({
          message: 'Thông báo',
          description:
            'Đổi mật khẩu thành công, vui lòng đăng nhập lại để sử dụng ứng dụng!!!',
        });
      })
      .catch((err) => {
        notification.error({
          message: 'Thông báo',
          description: 'Đổi mật khẩu thất bại!!!',
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <div className="mb-[50px]">
        <Typography.Title className="text-center" level={3}>
          Quên mật khẩu
        </Typography.Title>
      </div>
      <Form
        className="px-[20px]"
        onFinish={sentMail ? fetchConfirmOTP : fetchSendMail}
      >
        {!sentMail ? (
          <Form.Item<FieldType>
            name={'email'}
            label={'Email'}
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Vui lòng nhập đúng email!' },
            ]}
          >
            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Input your email"
              type="email"
            />
          </Form.Item>
        ) : (
          <>
            <Form.Item
              name={'verify_code'}
              label={'Mã xác nhận'}
              rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}
            >
              <Input placeholder="Input your verify code" />
            </Form.Item>
            <Form.Item
              name={'new_password'}
              label={'Mật khẩu mới'}
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              ]}
            >
              <Input.Password placeholder="Input your new password" />
            </Form.Item>
            <Form.Item
              name={'password_confirm'}
              //   dependencies={['new_password']}
              label={'Xác nhận mật khẩu mới'}
              rules={[
                { required: true, message: 'Vui lòng nhập lại mật khẩu mới!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Mật khẩu mới nhập lại chưa khớp!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Pre Input your new password" />
            </Form.Item>
          </>
        )}
        <Form.Item>
          <div className="flex items-center gap-x-6	 justify-center">
            {sentMail && (
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultColor: '#c73456',
                    },
                  },
                }}
              >
                <Button onClick={() => setSentMail(false)}>Quay lại</Button>
              </ConfigProvider>
            )}
            <Button loading={loading} htmlType="submit">
              Xác nhận
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
