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
  message,
  notification,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import { getCookie } from 'cookies-next';
import React, { useCallback, useEffect, useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';

interface FormType {
  key: React.Key;
  name: string;
  price: string;
  quantity: string;
  description: string;
  created_at: string;
  transaction_id: string;
  banner: string;
  avatar: string;
}
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export default function UpdateProductForm({
  productId,
  onSuccess,
  data,
}: {
  productId?: string;
  data?: ProductType;
  onSuccess?: () => void;
}) {
  const [previewImage, setPreviewImage] = useState(data?.banner);
  const [previewTitle, setPreviewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const currentUser = useAppSelector((state) => state.user.user);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: data?.banner,
    },
  ]);
  const [dataProduct, setDataProduct] = useState<ProductType>();
  const [fileAvartar, setFileAvartar] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  //   const fetchProduct = useCallback(async () => {
  //     await instanceAxios
  //       .get(`product/${productId}`)
  //       .then((res) => {
  //         console.log(res.data.data);
  //         setDataProduct(res.data.data);
  //         setPreviewImage(res.data.data.banner);
  //       })
  //       .catch((err) => {});
  //   }, [productId]);
  //   useEffect(() => {
  //     fetchProduct();
  //   }, [fetchProduct]);

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

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

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
    await instanceAxios
      .put(`product/update/${productId}`, e)
      .then((res) => {
        onSuccess?.();
        notification.success({
          message: 'Thông báo',
          description: 'Cập nhật sản phẩm thành công',
        });
      })
      .catch((err) => {
        notification.error({
          message: 'Thông báo',
          description: 'Cập nhật sản phẩm thất bại',
        });
      });
  };
  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
      >
        <Form.Item<FormType>
          label="Tên sản phẩm"
          name="name"
          initialValue={data?.name}
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FormType>
          label="Số lượng bán"
          name="quantity"
          initialValue={data?.quantity}
          rules={[{ required: true, message: 'Please input your quantity!' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item<FormType>
          label="Giá bán cho từng đơn vị"
          name="price"
          initialValue={data?.price}
          rules={[{ required: true, message: 'Please input your price!' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item<FormType>
          label="Mô tả sản phẩm"
          name="description"
          initialValue={data?.description || ''}
          rules={[
            { required: true, message: 'Please input your description!' },
          ]}
        >
          <TextArea minLength={10} />
        </Form.Item>
        <Form.Item<FormType>
          label="Ảnh banner"
          //   valuePropName="banner"
          //   name={'banner'}
          getValueFromEvent={normFile}
          //   rules={[
          //     { required: true, message: 'Please choose your product image' },
          //   ]}
        >
          <Upload
            accept="image/png, image/jpeg, image/jpg"
            method="PUT"
            name="banner"
            maxCount={1}
            action={`${process.env.NEXT_PUBLIC_API_ORIGIN}product/${productId}/banner`}
            headers={{
              authorization: `Bearer ${getCookie('access_token')}`,
            }}
            listType="picture-card"
            fileList={fileList}
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
