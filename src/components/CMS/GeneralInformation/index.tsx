import instanceAxios from '@/api/instanceAxios';
import InputCustom from '@/components/Contents/common/InputCustom/InputCustom';
import TextAreaCustom from '@/components/Contents/common/InputCustom/TextAreaCustom';
import { useAppSelector } from '@/hooks';
import { setUser } from '@/reducers/userSlice';
import fetchUpdateUser from '@/services/fetchUpdate';
import staticVariables from '@/static';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import {
  faCakeCandles,
  faEnvelope,
  faLocationDot,
  faPenToSquare,
  faSquarePhone,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Carousel,
  Col,
  Image,
  Modal,
  Row,
  Spin,
  Tag,
  Typography,
  Upload,
  UploadFile,
  notification,
} from 'antd';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
// import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSWRConfig } from 'swr';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function GeneralInformation() {
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const currentUser = useAppSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();

  const contentStyle: React.CSSProperties = {
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
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
    // console.log(newFileList);
    info.file.status = 'done';
    setFileList(info.fileList);
  };
  // const fetchUpdateAvatar = () => {};
  const handleChangeAvatar = useCallback(
    async (info: UploadChangeParam<UploadFile>) => {
      setLoadingImage(true);
      info.file.status = 'done';
      let formData = new FormData();
      let data = info.file;
      // URL.createObjectURL(info.file.originFileObj as RcFile);
      formData.append(
        'avatar',
        info.file.originFileObj as Blob,
        info.file.name
      );
      await instanceAxios
        .put('user/avatar', formData)
        .then((res) => {
          console.log(res.data);
          // dispatch(
          //   setUser({
          //     avatar: res.data,
          //   })
          // );
          mutate('user/me');
          // notification.success({
          //   message: 'Thông báo',
          //   description: 'Cập nhật thành công',
          // });
        })
        .catch((err) => console.log(err))
        .finally(() => setLoadingImage(false));
    },
    [mutate]
  );
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      <div className="flex">
        <div className="relative mr-[50px]">
          <Spin spinning={loadingImage}>
            <Avatar
              // className="rounded-[50%] object-cover"
              icon={<UserOutlined />}
              alt=""
              size={300}
              src={currentUser.avatar || staticVariables.noImage.src}
            />
            <Upload
              accept="image/png, image/jpeg, image/jpg"
              showUploadList={false}
              onChange={handleChangeAvatar}
            >
              <FontAwesomeIcon
                className="absolute top-[10%] right-[10%]"
                icon={faPenToSquare}
                style={{ color: '#295094' }}
              />
            </Upload>
          </Spin>
        </div>
        <div className=" flex w-1/2 justify-between">
          <div className="flex w-1/2 flex-col gap-y-4">
            <div>
              <InputCustom
                APIurl={'user/update_me'}
                queryType={'user'}
                name="full_name"
                classNameLabel="text-2xl font-bold"
                initialValue={
                  currentUser.full_name || currentUser.username || ''
                }
              />
              <Tag className="w-fit" color="success">
                {currentUser.system_role}
              </Tag>
            </div>
            <Row className="w-full flex items-center">
              <Col span={3}>
                <FontAwesomeIcon
                  className="mr-[10px]"
                  size={'2xl'}
                  icon={faLocationDot}
                  style={{ color: '#2754b0' }}
                />
              </Col>
              <Col>
                <InputCustom
                  APIurl={'user/update_me'}
                  queryType={'user'}
                  name="as"
                  initialValue={
                    currentUser.address_real || 'Chưa được cập nhật'
                  }
                />
              </Col>
            </Row>
            <Row className="w-full flex items-center">
              <Col span={3}>
                <FontAwesomeIcon
                  className="mr-[10px]"
                  size={'2xl'}
                  icon={faCakeCandles}
                  style={{ color: '#2754b0' }}
                />
              </Col>
              <Col>
                <InputCustom
                  input={{
                    type: 'date',
                  }}
                  name="birthday"
                  initialValue={currentUser.birthday || ''}
                  APIurl={'user/update_me'}
                  queryType={'user'}
                />
              </Col>
            </Row>
            <Row className="w-full flex items-center">
              <Col span={3}>
                <FontAwesomeIcon
                  className="mr-[10px]"
                  size={'2xl'}
                  icon={faWallet}
                  style={{ color: '#2754b0' }}
                />
              </Col>
              <Col>
                <p>{currentUser.account_balance} VNT</p>
              </Col>
            </Row>
          </div>
          <div className="flex w-1/2 flex-col gap-y-4">
            <Row className="w-full flex items-center">
              <Col span={3}>
                <FontAwesomeIcon
                  className="mr-[10px]"
                  size={'2xl'}
                  icon={faSquareFacebook}
                  style={{ color: '#2754b0' }}
                />
              </Col>
              <Col>
                <InputCustom
                  APIurl={'user/update_me'}
                  queryType={'user'}
                  name="as"
                  initialValue="https://fb.com/"
                />
              </Col>
            </Row>
            <Row className="w-full flex items-center">
              <Col span={3}>
                <FontAwesomeIcon
                  className="mr-[10px]"
                  size={'2xl'}
                  icon={faEnvelope}
                  style={{ color: '#2754b0' }}
                />
              </Col>
              <Col>
                <InputCustom
                  APIurl={'user/update_me'}
                  queryType={'user'}
                  name="as"
                  initialValue={currentUser.email || 'Email chưa được cập nhật'}
                />
              </Col>
            </Row>
            <Row className="w-full flex items-center">
              <Col span={3}>
                <FontAwesomeIcon
                  className="mr-[10px]"
                  size={'2xl'}
                  icon={faSquarePhone}
                  style={{ color: '#2754b0' }}
                />
              </Col>
              <Col>
                <InputCustom
                  name="as"
                  initialValue={currentUser.phone || 'SĐT chưa được cập nhật'}
                  APIurl={'user/update_me'}
                  queryType={'user'}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="flex mt-[50px] justify-between px-[50px]">
        <div className="w-1/2 relative">
          <Typography.Title level={4}>
            Hình ảnh của bạn{' '}
            <FontAwesomeIcon
              onClick={() => setShowModalUpload(!showModalUpload)}
              className="ml-[10px]"
              icon={faPenToSquare}
              style={{ color: '#295094' }}
            />
          </Typography.Title>
          <Modal
            onCancel={() => setShowModalUpload(false)}
            open={showModalUpload}
            footer={[]}
          >
            <Typography.Title className="text-center" level={4}>
              Thay đổi hình ảnh
            </Typography.Title>
            <Upload
              // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              accept="image/png, image/jpeg, image/jpg"
              listType="picture-card"
              multiple
              maxCount={8}
              // fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Button className="block m-auto">Done</Button>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={() => setPreviewOpen(false)}
            >
              <Image
                alt="example"
                style={{ width: '100%' }}
                src={previewImage}
              />
            </Modal>
          </Modal>
          <Carousel
            style={{ borderRadius: '10px', overflow: 'hidden' }}
            autoplay
          >
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div>
        <div className="w-2/5">
          <Typography.Title level={4}>Giới thiệu bản thân</Typography.Title>
          <TextAreaCustom
            name="description"
            initialValue=""
            APIurl={'user/update_me'}
            queryType={'user'}
          />
        </div>
      </div>
    </div>
  );
}
