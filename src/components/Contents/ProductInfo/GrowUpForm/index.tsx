import instanceAxios from '@/api/instanceAxios';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Upload,
  UploadFile,
  notification,
} from 'antd';
import { DatePickerType } from 'antd/es/date-picker';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import { type } from 'os';
import React, { useState } from 'react';

type FormType = {
  file?: UploadFile;
  description?: string;
  date?: DatePickerType;
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export default function GrowUpForm({
  productId,
  className,
  onSuccess,
}: {
  productId: string;
  className?: string;
  onSuccess?: () => void;
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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
    info.file.status = 'done';
    setFileList(info.fileList);
  };

  const onFinish = async (e: FormType) => {
    setLoading(true);
    console.log(fileList[0].originFileObj);
    let formData = new FormData();
    formData.append('image', fileList[0].originFileObj as Blob);
    await instanceAxios
      .post(
        `product/grow_up?product_id=${productId}&description=${e.description}`,
        formData
      )
      .then((res) => {
        notification.success({
          message: 'Thành công',
          description: 'Upload quá trình phát triển thành công',
        });
        onSuccess?.();
      })
      .catch((err) =>
        notification.error({
          message: 'Lỗi',
          description: 'Upload quá trình phát triển không  thành công',
        })
      )
      .finally(() => setLoading(false));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div className="w-full">
      <Form
        name="basic"
        layout={'vertical'}
        className={`px-[20px] ${className}`}
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item<FormType>
          label={'Chon ngay'}
          name="date"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn ngày phát triển của giống',
            },
          ]}
        >
          <DatePicker
            disabledDate={(d) => !d || d.isAfter(Date.now())}
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Form.Item<FormType>
          label="Upload"
          valuePropName="fileList"
          name={'file'}
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: 'Vui lòng upload bằng chứng phát triển của cây',
            },
          ]}
        >
          <Upload
            // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            multiple
            // fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            accept="image/png, image/jpeg, image/jpg"
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item<FormType>
          label={'Mota'}
          name={'description'}
          rules={[
            {
              required: true,
              message: 'Vui lòng thêm mô tả về sự phát triển của giống',
            },
          ]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item>
          <Button className="block m-auto" loading={loading} htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
      <Modal
        centered
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Image alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
}
