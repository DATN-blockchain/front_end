import { Button, Form, Input, Select } from 'antd';
import React from 'react';

export default function CreateProductForm() {
  return (
    <div>
      <Form name="basic" labelCol={{ span: 6 }}>
        <Form.Item
          name={'transaction_id'}
          label="Hop dong"
          rules={[{ required: true, message: 'Province is required' }]}
        >
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="demo2">Demo2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={'name'}
          label="Ten san pham"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'short_description'}
          label="Mo ta ngan"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'description'}
          label="mo ta"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={'price'}
          label="Gia"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={'price'}>
          <Button htmlType="submit">OK</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
