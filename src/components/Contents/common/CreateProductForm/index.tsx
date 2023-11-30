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
  avatar: string;
}
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export default function CreateProductForm({
  transactionId,
  onSuccess,
}: {
  transactionId?: string;
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

  useEffect(() => {
    const fetchListTransaction = async () => {
      await instanceAxios(`transaction_sf/list?skip=0&limit=100`)
        .then((res) => {
          //   const transactionSelect= [...res.data.data.list_transaction_sf].map((item,index)=>({}))
        })
        .catch((err) => console.log(err));
    };
    fetchListTransaction();
  }, []);

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
    formData.append('banner', fileAvartar[0]?.originFileObj as Blob);
    await instanceAxios
      .post(
        `product/create?name=${e.name}&price=${e.price}&quantity=${
          e.quantity
        }&description=${e.description}${
          transactionId ? `&transaction_id=${transactionId}` : ''
        }`,
        formData
      )
      .then((res) => {
        // setOpenModalCreate(false);
        // setHasChange(hasChange + 1);
        form.resetFields();
        notification.success({
          message: 'Thông báo',
          description: 'Tạo sản phẩm thành công',
        });
        onSuccess?.();
        setFileAvartar([]);
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
    <div className="w-full">
      <Form
        layout="vertical"
        className="w-full"
        form={form}
        // labelCol={{ span: 10 }}
        // wrapperCol={{ span: 14 }}
        onFinish={onFinish}
      >
        <Form.Item<FormType>
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            className="h-10 text-[18px] w-full"
            placeholder="Nhập tên sản phẩm"
          />
        </Form.Item>
        <Form.Item<FormType>
          label="Mô tả sản phẩm"
          name="description"
          // rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <TextArea
            className="h-10 text-[18px] w-full"
            placeholder="Nhập mô tả sản phẩm"
          />
        </Form.Item>
        {currentUser.system_role !== 'FARMER' && (
          <>
            <Form.Item<FormType>
              label="Số lượng bán"
              name="quantity"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <InputNumber
                min={0}
                className="h-10 text-[18px] w-full"
                placeholder="Nhập số lượng sản phẩm"
              />
            </Form.Item>
            <Form.Item<FormType>
              label="Giá bán"
              name="price"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <InputNumber
                min={0}
                className="h-10 text-[18px] w-full"
                placeholder="Nhập giá bán của từng sản phẩm"
              />
            </Form.Item>
          </>
        )}
        <Form.Item<FormType>
          label="Ảnh chính của sản phẩm"
          valuePropName="fileList"
          name={'banner'}
          getValueFromEvent={normFile}
          rules={[
            { required: true, message: 'Please choose your product image' },
          ]}
        >
          <Upload
            accept="image/png, image/jpeg, image/jpg"
            // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            // multiple
            // fileList={fileList}
            maxCount={1}
            onPreview={handlePreview}
            onChange={handleChangeAvatar}
          >
            {fileAvartar.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item className="flex text-center justify-center">
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
