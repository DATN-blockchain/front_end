'use client';
import instanceAxios from '@/api/instanceAxios';
import ProductItem from '@/components/Contents/Home/ProductItem';
import TextAreaCustom from '@/components/Contents/common/InputCustom/TextAreaCustom';
import CreateProductForm from '@/components/Contents/User/CreateProductForm';
import UserInfoCard from '@/components/Contents/common/UserInfoCard';
import { useAppSelector } from '@/hooks';
import staticVariables from '@/static';
import {
  ArrowUpOutlined,
  BookOutlined,
  InboxOutlined,
  MessageOutlined,
  PlusCircleOutlined,
  PlusCircleTwoTone,
  ScheduleOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import {
  faAddressBook,
  faEnvelope,
  faHandshake,
  faLocation,
  faMapLocation,
  faSquarePhone,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Card,
  Carousel,
  Col,
  Collapse,
  ConfigProvider,
  Empty,
  Image,
  Modal,
  Popover,
  QRCode,
  Row,
  Space,
  Statistic,
  Tooltip,
  Typography,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import MarketItem from '@/app/[locale]/home/components/MarketItem';
import { useEffectOnce } from 'usehooks-ts';

export default function UserInfo({ params }: { params: { id: string } }) {
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const currentUser = useAppSelector((state) => state.user.user);

  const [nameProduct, setNameProduct] = useState('');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [dataUser, setDataUser] = useState<UserType>({});
  const [listProduct, setListProduct] = useState<ProductType[]>([]);

  const fetchListProductByID = useCallback(async () => {
    await instanceAxios
      .get(
        `product/list?skip=${skip}&limit=${limit}${
          nameProduct ? `&name=${nameProduct}` : ''
        }&user_id=${params.id}`
      )
      .then((res) => {
        setListProduct(res.data.data.list_product);
      })
      .catch((err) => console.log(err));
  }, [limit, nameProduct, params.id, skip]);
  const fetchUserByID = useCallback(async () => {
    await instanceAxios
      .get(`user/${params.id}/get_user`)
      .then((res) => {
        setDataUser(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [params.id]);
  useEffectOnce(() => {
    fetchUserByID();
  });
  useEffect(() => {
    fetchListProductByID();
  }, [fetchListProductByID]);

  const contentStyle: React.CSSProperties = {
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: '10px',
  };
  const statisticItems = [
    {
      title: 'San pham',
      value: 20,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <InboxOutlined />,
      suffix: '',
    },
    {
      title: 'Giao dich',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <BookOutlined />,
      suffix: '',
    },
    {
      title: 'Khach hang',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <TeamOutlined />,
      suffix: '',
    },
    {
      title: 'Cuoc tro chuyen',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <MessageOutlined />,
      suffix: '',
    },
    {
      title: 'Xep hang giao dich',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <ArrowUpOutlined />,
      suffix: '',
    },
    {
      title: 'Danh gia',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <StarOutlined />,
      suffix: '',
    },
    {
      title: 'San pham ban ra',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <ArrowUpOutlined />,
      suffix: '',
    },
  ];
  return (
    <div className="w-full pb-[50px]">
      {/* <UserInfoCard showButton={false} /> */}
      <div className="w-full h-fit relative">
        <Image
          className="object-cover"
          width={'100%'}
          height={'600px'}
          preview={false}
          alt=""
          src={dataUser.avatar || staticVariables.noImage.src}
        />

        <div className="absolute w-full h-full gap-x-10 px-[100px] flex items-end py-[30px] justify-end bottom-0 bg-gradient-to-t from-black">
          <ConfigProvider
            theme={{
              token: {
                colorText: '#ffffff',
                colorTextDescription: '#cfcfcf',
              },
            }}
          >
            {[...Array(5)].map((_, index) => (
              <Statistic
                key={index}
                valueStyle={{ fontWeight: 700 }}
                title="Active Users"
                value={112893}
              />
            ))}
          </ConfigProvider>
        </div>
        <div className="absolute flex flex-col items-center translate-y-[-60%] translate-x-[50%] bot-0 ">
          <Image
            className="object-cover rounded-2xl bg-white drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)] border-2"
            width={200}
            height={200}
            preview={false}
            alt=""
            src={dataUser.avatar || staticVariables.noImage.src}
          />
          <Typography.Title level={3} className="mt-[20px]">
            {dataUser.full_name}
          </Typography.Title>
        </div>
      </div>
      <div className="px-[50px] w-full pt-[50px]">
        <div className="flex w-full">
          <div className="w-1/2 flex flex-col mt-[100px]">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Space
                size={20}
                className="justify-between border-[1px] rounded px-[20px] py-[10px]"
              >
                <FontAwesomeIcon size={'2x'} icon={faSquarePhone} />
                <Typography.Text copyable>
                  {currentUser?.phone || ''}
                </Typography.Text>
              </Space>
              <Space
                size={20}
                className=" justify-between border-[1px] rounded px-[20px] py-[10px]"
              >
                <FontAwesomeIcon
                  size={'2x'}
                  style={{ color: '#105ce0' }}
                  icon={faSquareFacebook}
                />
                <Typography.Text copyable>
                  https://www.facebook.com/
                </Typography.Text>
              </Space>
              <Space
                size={20}
                className=" justify-between border-[1px] rounded px-[20px] py-[10px]"
              >
                <FontAwesomeIcon size={'2x'} icon={faWallet} />
                <Typography.Text copyable>
                  {currentUser.address_wallet}
                </Typography.Text>
              </Space>
              <Space
                size={20}
                className=" justify-between border-[1px] rounded px-[20px] py-[10px]"
              >
                <FontAwesomeIcon size={'2x'} icon={faEnvelope} />
                <Typography.Text copyable>{currentUser.email}</Typography.Text>
              </Space>
              <Space
                size={20}
                className=" justify-between border-[1px] rounded px-[20px] py-[10px]"
              >
                <FontAwesomeIcon
                  size={'2x'}
                  style={{ color: '#14A2E0' }}
                  icon={faMapLocation}
                />
                <Typography.Text copyable>
                  {currentUser.address_real}
                </Typography.Text>
              </Space>
            </div>
            {/* <QRCode
              className="m-auto"
              type="canvas"
              value="https://www.facebook.com/"
            /> */}
            <div className="mt-[50px]">
              <Collapse
                items={[
                  {
                    key: '3',
                    label: 'Xem mô tả',
                    children: (
                      <div className="pr-[50px] text-justify">
                        {`This limited series of Midnight Society Access Passes grants the
              holder studio-specific perks including but not limited to: a
              one-of-a-kind "Variant" 🤣😂😊😊 PFP \n
              (profile pic) with unique VisorCortex,
              Call Sign, and other attributes of various rarity. Founders are
              entitled to voting rights on game features, exclusive access to
              studio events, first dibs on merchandise, early access to the
              latest dev build, and more.`}
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col w-3/5">
            <div className="w-[500px] m-auto">
              <Carousel waitForAnimate={true} effect="fade" autoplay>
                <div>
                  <h3 style={contentStyle}>1qwe</h3>
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
            <div className="flex px-[30px]">
              <Row gutter={[50, 12]} justify={'space-around'} align={'middle'}>
                {statisticItems.map((item, index) => (
                  <Col key={index}>
                    <Card hoverable className="w-fit" bordered={false}>
                      <Statistic
                        title={item.title}
                        value={item.value}
                        precision={item.precision || 0}
                        valueStyle={item.valueStyle || {}}
                        prefix={item.prefix}
                        suffix={item.suffix}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
        <div>
          <div className="border-[1px] my-[100px]">
            <Typography.Title
              className="absolute py-[10px] pl-[20px] pr-[40px] bg-slate-50 border-[1px] translate-y-[-50%]"
              level={3}
              style={{ margin: 0 }}
            >
              Danh sách sản phẩm
              {/* <Tooltip title="Them san pham">
                <PlusCircleTwoTone
                  onClick={() => setShowCreateProductModal(true)}
                  className="absolute right-0 top-1/2 translate-y-[-50%] translate-x-[50%]"
                />
              </Tooltip> */}
            </Typography.Title>
          </div>
          {/* <Modal
            onCancel={() => setShowCreateProductModal(false)}
            open={showCreateProductModal}
            footer={[]}
          >
            <p className="text-center py-[50px]">Them san pham</p>
            <CreateProductForm />
          </Modal> */}
          <div className="flex items-center justify-center flex-wrap gap-10	">
            {listProduct.length ? (
              listProduct.map((item: ProductType, index) => (
                <MarketItem key={index} {...item} />
              ))
            ) : (
              <Empty description={'Không có dữ liệu về sản phẩm'} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
