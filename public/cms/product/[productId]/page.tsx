'use client';
import staticVariables from '@/static';
import {
  DeleteTwoTone,
  EditTwoTone,
  EyeOutlined,
  FieldTimeOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
  SearchOutlined,
  SendOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Carousel,
  Col,
  ConfigProvider,
  DatePicker,
  Empty,
  Form,
  Image,
  Input,
  List,
  Modal,
  Popconfirm,
  Popover,
  QRCode,
  Result,
  Tooltip as TooltipAntd,
  Row,
  Segmented,
  Table,
  Tag,
  Timeline,
  Typography,
  Upload,
  UploadFile,
  message,
  notification,
} from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowTrendUp,
  faEnvelope,
  faMobileScreenButton,
} from '@fortawesome/free-solid-svg-icons';
import GrowUpItem from '@/components/Contents/ProductInfo/GrowUpItem';
import Paragraph from 'antd/es/typography/Paragraph';
import { ColumnsType } from 'antd/es/table';
import { CheckoutForm } from '@/components/Contents/common/CheckoutForm';
import instanceAxios from '@/api/instanceAxios';
import GrowUpForm from '@/components/Contents/ProductInfo/GrowUpForm';
import TextAreaCustom from '@/components/Contents/common/InputCustom/TextAreaCustom';
import InputCustom from '@/components/Contents/common/InputCustom/InputCustom';
import { useAppSelector } from '@/hooks';
import { useEffectOnce } from 'usehooks-ts';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import CreateDescriptionForm from '@/components/Contents/ProductInfo/CreateDescriptionForm';
import { UploadChangeParam } from 'antd/es/upload';
import InputNumberCustom from '@/components/Contents/common/InputCustom/InputNumberCustom';
import { Chart } from '@/components/CMS/Statistical/Chart';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import Owner from '../../market/[marketId]/components/Owner';
import ProductOrigin from '../../market/[marketId]/components/PoductOrigin';
import { useRouter } from 'next/navigation';
import Description from '@/components/Contents/ProductInfo/Description';
import useSWR, { useSWRConfig } from 'swr';
import { getCookie } from 'cookies-next';

export default function ProductInfoPage({
  params,
}: {
  params: { productId: string };
}) {
  const [openListImageModal, setOpenListImageModal] = useState(false);
  const [openCreateDescriptionModal, setOpenCreateDescriptionModal] =
    useState(false);
  const [openGrowUpModal, setOpenGrowUpModal] = useState(false);
  const [dataMarket, setDataMarket] = useState<any>({});
  const [dataOwner, setDataOwner] = useState<UserType>({});
  const [dataProduct, setDataProduct] = useState<ProductType>({});
  const [dataHistory, setDataHistory] = useState<HistoryType>({});
  const [dataChart, setDataChart] = useState({});
  const [dataGrowUp, setDataGrowUp] = useState<GrowUpType[]>([]);
  const [dataListTransaction, setDataListTransaction] = useState<GrowUpType[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [changePageRight, setChangePageRight] = useState('COMMENT');
  const [isOwner, setIsOwner] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState(0);
  const [commentList, setCommentList] = useState<CommentItemType[]>([]);
  const [showModalPay, setShowModalPay] = useState(false);
  const { mutate } = useSWRConfig();
  const [loadingImage, setLoadingImage] = useState(false);
  const currentUser = useAppSelector((state) => state.user.user);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Thống kê hoạt động của sản phẩm vừa qua',
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  };

  const labels = Object.keys(dataChart).map(
    (item: any, index) => `Tháng ${item}`
  );

  const dataChartProps = {
    labels,
    datasets: [
      {
        label: 'Số lượng giao dịch',
        data: Object.values(dataChart).map(
          (item: any, index) => item.count_number_of_sale
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Số lượng sản phẩm bán ra',
        data: Object.values(dataChart).map(
          (item: any, index) => item.total_quantity
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const listAvatarDescription = [
    {
      title: 'ABC',
      description: 'asdasdasd',
      img: 'asdasdas',
    },
    {
      title: 'ABC',
      description: 'asdasdasd',
      img: 'asdasdas',
    },
    {
      title: 'ABC',
      description: 'asdasdasd',
      img: 'asdasdas',
    },
    {
      title: 'ABC',
      description: 'asdasdasd',
      img: 'asdasdas',
    },
    {
      title: 'ABC',
      description: 'asdasdasd',
      img: 'asdasdas',
    },
    {
      title: 'ABC',
      description: 'asdasdasd',
      img: 'asdasdas',
    },
  ];

  // const handleChangeProductAvatar = async (
  //   info: UploadChangeParam<UploadFile>
  // ) => {
  //   setLoadingImage(true);
  //   info.file.status = 'done';
  //   let formData = new FormData();
  //   formData.append('banner', info.file.originFileObj as Blob, info.file.name);
  //   await instanceAxios
  //     .put(`product/update/${params.productId}`, formData)
  //     .then((res) => {
  //       mutate(`product/${params.productId}`);
  //       message.success('Cập nhật thành công');
  //     })
  //     .catch((err) => {
  //       message.error('Cập nhật thất bại');
  //     })
  //     .finally(() => setLoadingImage(false));
  // };

  const fethProduct = async () => {
    setLoading(true);
    await instanceAxios
      .get(`product/${params.productId}`)
      .then(async (res) => {
        setDataProduct(res.data.data as ProductType);
        if (res.data.data.product_type === 'FARMER') {
          fetchListGrowUp(params.productId);
        }
        setDataOwner(res.data.data.user as UserType);
        // await instanceAxios
        //   .get(`user/${res.data.data.order_by}/get_user`)
        //   .then((res) => setDataOwner(res.data.data))
        //   .catch((err) => console.log('asdadasd'));
      })
      .catch((err) => console.log('asdadasd'));

    await instanceAxios
      .get(`product/${params.productId}/history`)
      .then((res) => {
        setDataHistory(res.data.data);
      })
      .catch((err) => console.log('asdadasd'));
    await instanceAxios
      .get(`product/${params.productId}/chart`)
      .then((res) => {
        setDataChart(res.data.data);
      })
      .catch((err) => console.log('asdadasd'));
    setLoading(false);
  };
  useEffectOnce(() => {
    fethProduct();
  });
  useSWR(`product/${params.productId}`, fethProduct);

  const fetchListGrowUp = async (productId: string) => {
    await instanceAxios
      .get(`product/${productId}/grow_up?skip=0&limit=100`)
      .then((res) => {
        setDataGrowUp(res.data.data.list_grow_up);
      })
      .catch((err) => console.log('asdadasd'));
  };
  const handleDeleteDescriptionItem = async (descriptionId: string) => {
    await instanceAxios
      .delete(`detail_description/${descriptionId}/delete`)
      .then((res) => {
        mutate(`product/${params.productId}`);
        notification.success({
          message: 'Thành công',
          description: 'Đã xóa mô tả',
        });
      })
      .catch((err) => {
        notification.error({ message: 'Lỗi', description: 'Đã có lỗi xảy ra' });
        console.log('asdadasd');
      });
  };

  const listInformation = [
    {
      label: 'Tên sản phẩm',
      value: dataProduct.name,
    },
    {
      label: 'Giá đơn vị',
      value: dataProduct.price,
    },
    {
      label: 'Ngày đăng bán',
      value: moment(dataProduct.created_at).format('DD/MM/YYYY'),
    },
    {
      label: 'Loại sản phẩm',
      value: dataProduct.product_type,
    },
    {
      label: 'Trạng thái sản phẩm',
      value: dataProduct.product_status,
    },
    {
      label: 'Sở hửu bởi',
      value: dataProduct.user?.username,
    },
    {
      label: 'Email liên hệ',
      value: dataProduct.user?.email,
    },
  ];
  // setOwner();
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: '10px',
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      width: 200,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Time',
      dataIndex: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const data: DataType[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      buyer: `Edward King ${i}`,
      quantity: 32,
      price: 1231313 + i,
      time: `2${i}/12/1212`,
      status: i,
    });
  }

  const onUpload = (e: UploadChangeParam<UploadFile<any>>) => {
    console.log(e);
  };
  return (
    !loading && (
      <div className="w-full m-auto pt-[100px] pb-[50px]">
        {dataProduct.created_by === currentUser.id ? (
          <>
            <div className="px-[50px]">
              <div className="relative flex justify-between gap-x-10">
                <div className="relative w-1/2 pr-5">
                  <Image
                    className="object-cover rounded-2xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]"
                    alt=""
                    width={'100%'}
                    preview={false}
                    height={500}
                    src={dataProduct.banner}
                  />
                  <Upload
                    accept="image/png, image/jpeg, image/jpg"
                    showUploadList={false}
                    method="PUT"
                    name="banner"
                    maxCount={1}
                    action={`${process.env.NEXT_PUBLIC_API_ORIGIN}product/${params.productId}/banner`}
                    headers={{
                      authorization: `Bearer ${getCookie('access_token')}`,
                    }}
                    // onChange={handleChangeProductAvatar}
                    onChange={(info) => {
                      // if (info.file.status !== 'uploading') {
                      //   console.log(info.file, info.fileList);
                      // }
                      if (info.file.status === 'done') {
                        mutate(`product/${params.productId}`);
                        message.success(`Upload thành công`);
                      } else if (info.file.status === 'error') {
                        message.error(`Upload thất bại`);
                      }
                    }}
                  >
                    <EditTwoTone className="absolute top-1/2 right-0" />
                  </Upload>
                </div>
                <div className="w-1/2 top-4/12 left-[98%] rounded">
                  <InputCustom
                    showEdit={dataProduct.created_by === currentUser.id}
                    classNameLabel="text-[30px] text-[#222222] font-semibold font-[Work Sans]"
                    initialValue={dataProduct.name || ''}
                    name={'name'}
                    APIurl={`product/update/${dataProduct.id}`}
                    queryType={'product'}
                    passType={'params'}
                  />

                  <div className="flex gap-x-2 tetx-[16px] text-[#7B7B7B] font-light">
                    Sản phẩm của
                    <Link href={`/user/${dataProduct.user?.id}`}>
                      <p className="text-[#313064] font-bold">
                        {dataProduct.user?.username}
                      </p>
                    </Link>
                  </div>
                  <InputNumberCustom
                    showEdit={dataProduct.created_by === currentUser.id}
                    showCurrence={true}
                    classNameLabel="text-[27px] text-[#2DB457] font-[Work Sans] font-[600]"
                    input={{ min: 0 }}
                    name={'price'}
                    initialValue={dataProduct.price || 0}
                    APIurl={`product/update/${dataProduct.id}`}
                    queryType={'product'}
                    passType={'body'}
                  />
                  <div className="flex items-center space-x-2 font-medium text-gray-600">
                    <p>{`Sản phẩm hiện còn:`}</p>
                    <InputNumberCustom
                      showEdit={dataProduct.created_by === currentUser.id}
                      classNameLabel="font-medium font-bold text-[#2db457] text-[20px]"
                      input={{ min: 0 }}
                      name={'price'}
                      initialValue={dataProduct.quantity || 0}
                      APIurl={`product/update/${dataProduct.id}`}
                      queryType={'product'}
                      passType={'body'}
                    />
                  </div>

                  <div className="text-[16px] leading-10 font-[Nunito] text-[#707070] text-justify">
                    Ivy gourd protects the nervous system, provides more energy
                    and a healthy metabolism! Ivy gourd is rich in beta-carotene
                    that ensures the optimal functioning of the heart and
                    prevents heart ailments. Ivy gourd can be stored safely in a
                    cool, dry room.
                  </div>
                  <div className="flex gap-x-4 my-[20px]">
                    {[...Array(4)].map((_, index) => (
                      <div
                        key={index}
                        className="w-fit items-center py-[10px] px-[20px] bg-lime-50 rounded border-[1px] border-[#1f5145]"
                      >
                        <EyeOutlined className="mr-[5px]" />
                        12313
                      </div>
                    ))}
                  </div>
                  {/* <div className="rounded p-[20px]">
                    <div className="flex items-center mt-[10px]">
                      <Button
                        disabled={dataProduct.created_by === currentUser.id}
                        onClick={() => setShowModalPay(true)}
                        className="w-full  shadow-[0px_12px_10px_-8px_rgba(72,184,159,0.8784313725)]"
                      >
                        <p className="text-4xl text-[#1f5145]">Buy now</p>
                      </Button>
                      <Button
                        disabled={
                          dataProduct.created_by === currentUser.id ||
                          dataProduct.quantity === 0
                        }
                        onClick={() => {
                          // setBuyOrCart('CART');
                          setShowModalPay(true);
                        }}
                        className="flex items-center"
                      >
                        <ShoppingCartOutlined />
                      </Button>
                    </div>
                    <Modal
                      onCancel={() => setShowModalPay(false)}
                      open={showModalPay}
                      footer={[]}
                    >
                      <CheckoutForm
                        producId={dataProduct?.id || ''}
                        price={dataProduct.price || 0}
                        quantity={dataProduct.quantity || 0}
                        onSuccess={() => setShowModalPay(false)}
                      />
                    </Modal>
                  </div> */}
                </div>
              </div>
              <div className="w-full flex mt-[50px]">
                <div className="w-1/2 pt-[10px]">
                  <div className="w-full flex space-x-10">
                    {/* Giới thiệu chủ sử hữu */}
                    <div className=" w-1/2 rounded-xl overflow-hidden border-[1px] border-current-color">
                      <div className="py-[15px] text-center text-white font-bold border-b-[1px] border-current-color bg-current-color">
                        Chủ sở hữu
                      </div>
                      <div className="p-[20px] flex flex-col space-y-10 items-center">
                        <Owner {...dataOwner} />
                        {/* <Link href={`/user/${dataProduct.created_by}`}>
                  <div className="flex items-center p-[20px] rounded-xl flex-col bg-[#1212120A] hover:bg-[#ececec]">
                    <Avatar size={100} src={dataProduct.user?.avatar} />
                    <p className="text-2xl font-bold text-[#222222]">
                      {dataProduct.user?.username}
                    </p>
                  </div>
                </Link> */}
                        {/* <div className="flex w-2/3 h-fit flex-col border-[1px] border-current-color rounded-xl overflow-hidden ">
                          <p className="text-center text-white bg-current-color p-[5px]">
                            Liên hệ
                          </p>
                          <div className="w-full px-[10px]">
                            <Paragraph className=" border-t-0 p-[5px]" copyable>
                              {dataProduct.user?.email}
                            </Paragraph>
                            {dataProduct.user?.phone && (
                              <Paragraph
                                className="border-current-color border-[1px] border-t-0 p-[5px]"
                                copyable
                              >
                                {dataProduct.user?.phone}
                              </Paragraph>
                            )}
                          </div>
                        </div> */}
                      </div>
                    </div>
                    {/* Thông tin sản phẩm */}
                    <div className="flex-col w-1/2 rounded-xl border-[1px] border-current-color overflow-auto">
                      <div className="py-[15px] text-center text-white font-bold border-b-[1px]  border-current-color bg-current-color">
                        Thông tin sản phẩm
                      </div>
                      <div className="flex flex-col w-full px-[20px] py-[15px]">
                        {listInformation.map((item, index) => (
                          <div
                            key={index}
                            className="w-full flex justify-between items-center py-[5px]"
                          >
                            <p>{item.label}</p>
                            <Paragraph copyable>{item.value}</Paragraph>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 pl-[50px] rounded overflow-hidden">
                  {/* <QRCode
              className="m-auto"
              type="canvas"
              value="https://www.facebook.com/"
            /> */}
                  <Line
                    className="mt-[100px]"
                    options={options}
                    data={dataChartProps}
                  />
                  {/* <div className="mx-auto rounded-2xl overflow-hidden my-[50px] w-2/3">
              <Carousel
                className="drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)]"
                waitForAnimate={true}
                effect="fade"
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
            </div> */}
                </div>
              </div>
              <div className="w-full flex">
                {/* Giới thiệu sản  phẩm */}
                <div className="mt-[50px] w-1/2 rounded-xl overflow-hidden border-[1px] border-current-color">
                  <div className="py-[15px] text-center text-white font-bold border-b-[1px] border-current-color bg-current-color">
                    Giới thiệu về sản phẩm
                  </div>
                  <TextAreaCustom
                    className="py-[20px] px-[30px]"
                    name={'description'}
                    showEdit={dataProduct.created_by === currentUser.id}
                    // classNameLabel="text-[27px] text-[#2DB457] font-[Work Sans] font-[600]"
                    APIurl={`product/update/${params.productId}`}
                    queryType={'product'}
                    passType={'body'}
                    input={{ maxLength: 255 }}
                    initialValue={dataProduct.description || ''}
                  />
                </div>
                <div className="w-1/2 mt-[50px] pl-[50px]">
                  <div className="w-full mt-[20px]">
                    {changePageRight === 'HISTORY' && (
                      <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        scroll={{ y: 340 }}
                      />
                    )}
                  </div>
                </div>
              </div>
              {((dataProduct.product_type !== 'SEEDLING_COMPANY' &&
                dataHistory.transactions_sf) ||
                dataHistory.transactions_fm) && (
                <ProductOrigin
                  originType={'seed'}
                  transactions={
                    dataHistory.transactions_sf || dataHistory.transactions_fm
                  }
                  {...dataHistory}
                />
              )}
              {dataProduct.product_type === 'FARMER' && (
                <div
                  //  relative before:content-[''] before:left-[15px] before:absolute before:w-[1px] before:h-full before:bg-black
                  className={`border-l-2 border-[#42bb67] block w-2/3 m-auto mt-[150px]`}
                >
                  <div className="relative w-fit flex items-center p-[20px] border-[1px] border-[#42bb67] border-l-0">
                    <FontAwesomeIcon
                      icon={faArrowTrendUp}
                      size={'2xl'}
                      style={{ color: '#29c214' }}
                    />
                    <p className="pl-[20px]">Quá trình phát triển </p>
                    {dataProduct.created_by === currentUser.id && (
                      <PlusCircleTwoTone
                        onClick={() => setOpenGrowUpModal(true)}
                        className="text-2xl absolute right-0 top-1/2 translate-y-[-50%] translate-x-[50%]"
                      />
                    )}
                  </div>
                  <div className="ml-[-111px]  max-h-[700px] border-b-[1px] overflow-auto mb-[200px] pl-[100px]">
                    {dataGrowUp.length ? (
                      dataGrowUp.map((item, index) => (
                        <GrowUpItem {...item} key={index} />
                      ))
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_DEFAULT}
                        description={'Chưa có dữ liệu!!'}
                      />
                    )}
                  </div>
                  <Modal
                    open={openGrowUpModal}
                    onCancel={() => setOpenGrowUpModal(false)}
                    footer={[]}
                  >
                    <Typography.Title level={3}>
                      Thêm quá trình phát triển
                    </Typography.Title>
                    <p className="text-rose-600">
                      * Lưu ý: Bạn không thể chỉnh sửa được nội dung khi đã đăng
                      tải quá trình phát triển
                    </p>
                    <GrowUpForm
                      onSuccess={() => setOpenGrowUpModal(false)}
                      productId={dataProduct.id || ''}
                    />
                  </Modal>
                </div>
              )}
            </div>
            <div className="max-h-[800px] text-white pt-[50px] ">
              <div className=" flex items-center  py-[30px] text-2xl mb-[50px] pl-[100px] bg-[#42bb67]">
                <p> Giới thiệu chi tiết về sản phẩm</p>
                {dataProduct.created_by === currentUser.id && (
                  <TooltipAntd title="Tạo thêm mô tả về sản phẩm">
                    <PlusCircleTwoTone
                      onClick={() => setOpenCreateDescriptionModal(true)}
                      className="ml-[50px] text-2xl"
                    />
                  </TooltipAntd>
                )}
                <Modal
                  centered
                  open={openCreateDescriptionModal}
                  onCancel={() => setOpenCreateDescriptionModal(false)}
                  footer={[]}
                >
                  <Typography.Title className="text-center" level={4}>
                    Thêm mô tả về sản phẩm
                  </Typography.Title>
                  <CreateDescriptionForm
                    className="mt-[50px] px-[50px]"
                    productId={dataProduct.id || ''}
                    onSuccess={() => {
                      mutate(`product/${params.productId}`);
                      setOpenCreateDescriptionModal(false);
                    }}
                  />
                </Modal>
              </div>
              <div className="flex h-[600px] w-full snap-y bg-white rounded text-[#373737] px-[50px] gap-y-10 overflow-auto pt-[50px]">
                {dataProduct.detail_description?.length ? (
                  <>
                    <div className="w-1/4 max-h-full overflow-y-auto flex flex-col gap-y-5 items-end px-[30px]">
                      {dataProduct.detail_description?.map((item, index) => (
                        <Popover
                          content={
                            <DeleteTwoTone
                              onClick={() =>
                                handleDeleteDescriptionItem(item.id || '')
                              }
                            />
                          }
                          placement={'right'}
                          key={index}
                        >
                          <Image
                            className={`border-4 rounded-full p-[3px] object-cover ${
                              index === selectedDescription
                                ? 'border-green-500'
                                : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedDescription(index)}
                            width={150}
                            height={150}
                            preview={false}
                            alt=""
                            src={item.image}
                          />
                        </Popover>
                      ))}
                    </div>
                    <div className="w-3/4 h-full">
                      <Description
                        showEdit={true}
                        {...dataProduct.detail_description[selectedDescription]}
                      />
                    </div>
                  </>
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    description="Không có dữ liệu"
                  />
                )}
                {/* <div className="w-3/4 flex border-2 border-green-500 rounded-2xl">
                  <div className="w-1/2 p-[50px] flex flex-col">
                    <InputCustom
                      className="text-[20px] py-[20px] font-semibold"
                      showEdit={dataProduct.created_by === currentUser.id}
                      queryType="product"
                      APIurl={`product/update/${dataMarket.order_id}`}
                      classNameLabel=""
                      name={'description'}
                      initialValue={`MAPLE OAT MUFFIN`}
                    />
                    <TextAreaCustom
                      showEdit={dataProduct.created_by === currentUser.id}
                      queryType="product"
                      APIurl={`product/update/${dataMarket.order_id}`}
                      classNameLabel=""
                      name={'description'}
                      initialValue={`Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`}
                    />
                  </div>
                  <div className="w-1/2 p-[10px]">
                    <Image
                      className="object-cover rounded-2xl"
                      width="100%"
                      height="100%"
                      preview={false}
                      src={staticVariables.qc5.src}
                      alt=""
                    />
                  </div>
                </div> */}
                {/* {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`relative flex ${
                index % 2 && 'flex-row-reverse'
              } items-center scroll-ml-6 justify-between rounded w-full pr-[50px]`}
            >
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimaryHover: '#2db457',
                      primaryColor: '#e62929',
                    },
                  },
                  token: {
                    colorBgContainer: '#7f84d4',
                  },
                }}
              >
                {dataProduct.created_by === currentUser.id && (
                  <Popconfirm
                    title={'Xác nhận xóa mô tả này'}
                    onConfirm={() => alert('OK')}
                  >
                    <DeleteTwoTone className="absolute top-1/2 right-0 text-2xl" />
                  </Popconfirm>
                )}
              </ConfigProvider>
              <div className="relative">
                <Image
                  className="object-cover w-1/2 "
                  width={550}
                  height={650}
                  style={{ borderRadius: '10px' }}
                  alt=""
                  src={staticVariables.qc1.src}
                />
                {dataProduct.created_by === currentUser.id && (
                  <Upload
                    showUploadList={false}
                    multiple={false}
                    onChange={onUpload}
                  >
                    <EditTwoTone className="absolute top-0 right-0 translate-x-full translate-y-[-100%] text-2xl" />
                  </Upload>
                )}
              </div>
              <div className="w-1/2 px-[50px]">
                <InputCustom
                  className="text-4xl mb-[20px]"
                  name={''}
                  initialValue={'Nay chị Sốt nên lên bài hơi trễMưa'}
                  APIurl={''}
                  showEdit={dataProduct.created_by === currentUser.id}
                  queryType={'user'}
                  input={{ maxLength: 30 }}
                />
                <TextAreaCustom
                  name={''}
                  showEdit={dataProduct.created_by === currentUser.id}
                  initialValue={`Nay chị Sốt nên lên bài hơi trễMưa quá nên ăn utng hộ c hết
                  sớm nghĩ sớm nhaaa Có quá nhiều đơn trong 1 lúc mà chị chỉ có
                  2 tay + trời mưa to đường trơn mà nhà c cũng không gần KTX lắm
                  nên việc Sót đơn hoặc để các em chờ hơi lâu là một thiết sót
                  lớn với chịCác em bao dung sự bất tiện này nhé LÊN ĐƠN KÈM SỐ
                  PHÒNG DÙM CHỊ BÉ NHÓShip chừ tới #12h đêm giờ nào cũng có các
                  em yên tâm nhaaaChị bé ship cả ngoài kí túc xá nên cứ mạnh dạn
                  lên đơn Đồ ăn chị có : -SET KIMPAD ĐÙI GÀ #30k -ĐUI GÀ CHIÊN
                  XÙ #20k -KIMPAD TRUYỀN THỐNG #15_20k -GỎI CUỐN TÔM THỊT KÈM
                  MẮM #5k -CHÂN GÀ NHỎ-LỚN #20-35k -CÁ VIÊN CHIÊN CHẤM TƯƠNG ỚT
                  #15_20k -CÁ VIÊN CHIÊN MẮM #20k`}
                  APIurl={''}
                  queryType={'product'}
                  input={{ maxLength: 1000 }}
                />
              </div>
            </div>
          ))} */}
              </div>
            </div>
          </>
        ) : (
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
              <Button type={'link'} href="/home">
                Back Home
              </Button>
            }
          />
        )}
      </div>
    )
  );
}
