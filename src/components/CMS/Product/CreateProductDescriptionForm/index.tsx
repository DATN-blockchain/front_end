import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  notification,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import React, { useEffect, useState } from 'react';

interface FormType {
  key: React.Key;
  name: string;
  price: string;
  quantity: string;
  description: string;
  created_at: string;
  transaction_id: string;
  banner: string;
  img: string;
  avatar: string;
  title: string;
}
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export default function CreateProductDescriptionForm({
  productId,
  onSuccess,
  data,
}: {
  productId?: string;
  data?: ProductType;
  onSuccess?: () => void;
}) {
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const currentUser = useAppSelector((state) => state.user.user);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileAvartar, setFileAvartar] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    // console.log(newFileList);
    info.file.status = 'done';
    setFileList(info.fileList);
  };

  const handleChangeAvatar: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    // console.log(newFileList);
    info.file.status = 'done';
    setFileAvartar(info.fileList);
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const onFinish = async (e: FormType) => {
    setLoading(true);
    let formData = new FormData();
    formData.append('img', fileList[0]?.originFileObj as Blob);
    await instanceAxios
      .post(
        `detail_description/create?title=${e.title}&description=${e.description}&product_id=${productId}`,
        formData
      )
      .then((res) => {
        // setOpenModalCreate(false);
        // setHasChange(hasChange + 1);
        form.resetFields();
        setFileList([]);
        notification.success({
          message: 'Thông báo',
          description: 'Tạo sản phẩm thành công',
        });
        onSuccess?.();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: 'Thông báo',
          description: 'Tạo sản phẩm thất bại',
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Form
        className={'px-[32px]'}
        layout={'vertical'}
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
      >
        <Form.Item<FormType>
          label="Tiêu đề mô tả"
          name="title"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề mô tả!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FormType>
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item<FormType>
          label="Ảnh banner"
          valuePropName="fileList"
          name={'img'}
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Vui lòng chọn hình ảnh!' }]}
        >
          <Upload
            accept="image/png, image/jpeg, image/jpg"
            // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            multiple
            // fileList={fileList}
            maxCount={1}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={previewOpen}
        onCancel={() => setPreviewOpen(false)}
        footer={[]}
      >
        <Image alt="" src={previewImage} />
      </Modal>
    </div>
  );
}
