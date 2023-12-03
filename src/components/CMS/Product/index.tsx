import instanceAxios from '@/api/instanceAxios';
import CreateProductForm from '@/components/Contents/common/CreateProductForm';
import { useAppSelector } from '@/hooks';
import fetchUpdate from '@/services/fetchUpdate';
import useLogin from '@/services/requireLogin';
import {
  DeleteTwoTone,
  ExclamationCircleTwoTone,
  PlusOutlined,
} from '@ant-design/icons';
import {
  faCircleXmark,
  faLock,
  faLockOpen,
  faPenToSquare,
  faSquarePlus,
  faStore,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Dropdown,
  Empty,
  Form,
  Input,
  InputNumber,
  MenuProps,
  Modal,
  Popconfirm,
  Popover,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  UploadFile,
  message,
  notification,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import Upload, { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import Link from 'next/link';
import React, {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useEffectOnce } from 'usehooks-ts';
import TransactionSelectItem from './TransactionSelectItem';
import moment from 'moment';
import UpdateProductForm from './UpdateProductForm';
import CreateProductDescriptionForm from './CreateProductDescriptionForm';
import staticVariables from '@/static';
import GrowUpForm from '@/components/Contents/ProductInfo/GrowUpForm';

// interface DataType {
//   key: React.Key;
//   index: number;
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;
//   created_at: string;
//   product_status: string;
// }
interface TransactionType {
  id?: string;
  product_id?: string;
  user_id?: string;
  price?: number;
  quantity?: number;
  created_at?: string;
  updated_at?: string;
  product?: {
    id?: string;
    product_type?: string;
    product_status?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    banner?: string;
    created_by?: string;
    created_at?: string;
    user?: {
      id?: string;
      avatar?: string;
      username?: string;
      email?: string;
    };
  };
}

export default memo(function ProductCMS() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalCreateDescription, setOpenModalCreateDescription] =
    useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalGrowUp, setOpenModalGrowUp] = useState(false);
  const [openModalUpdateDescription, setOpenModalUpdateDescription] =
    useState(false);
  const [productId, setProductId] = useState('');
  const [totalProduct, setTotalProduct] = useState(0);
  const [listProduct, setListProduct] = useState<ProductType[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductType>({});
  const [dataCurrentProduct, setDataCurrentProduct] = useState<ProductType>({});
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [name, setName] = useState('');
  const [hasChange, setHasChange] = useState(0);
  const [transactionId, setTransactionId] = useState('');
  const [currentModalPage, setCurrentModalPage] = useState<
    'SELECT_TRANSACTION' | 'CREATE_PRODUCT'
  >('SELECT_TRANSACTION');
  const [listTransaction, setListTransaction] = useState<TransactionType[]>([]);
  const currentUser = useAppSelector((state) => state.user.user);
  const { mutate } = useSWRConfig();

  useEffectOnce(() => {
    fetchListTransaction();
  });
  const fetchProductId = useCallback(() => {
    instanceAxios
      .get(`product/${currentProduct.id}`)
      .then((res) => setDataCurrentProduct(res.data.data))
      .catch((err) => {
        console.log('Err', `product/${currentProduct.id}`);
      });
  }, [currentProduct]);
  useEffect(() => {
    fetchProductId();
  }, [fetchProductId]);
  useSWR(`product/${currentProduct.id}`, fetchProductId);

  const fetchDeleteDescription = (descriptionId: string) => {
    instanceAxios
      .delete(`detail_description/${descriptionId}/delete`)
      .then((res) => {
        message.success('Đã xóa');
        mutate(`product/${currentProduct.id}`);
      })
      .catch((err) => {
        console.log('Err', `detail_description/${descriptionId}`);
      });
  };

  const changeCurrentModalPageToCreate = (e: string) => {
    setCurrentModalPage('CREATE_PRODUCT');
    setTransactionId(e);
  };
  const fetchListTransaction = async () => {
    await instanceAxios(
      `${
        currentUser.system_role === 'FARMER'
          ? 'transaction_sf'
          : 'transaction_fm'
      }/list?skip=0&limit=100&status=DONE`
    )
      .then((res) => {
        setListTransaction(
          currentUser.system_role === 'FARMER'
            ? res.data.data.list_transaction_sf
            : res.data.data.list_transaction_fm
        );
      })
      .catch((err) => console.log(err));
  };

  const fetchProductMe = useCallback(async () => {
    await instanceAxios
      .get(
        `product/me?skip=${skip}&limit=${limit}${name ? `&name=${name}` : ''}`
      )
      .then((res) => {
        console.log(res.data);
        // let newProducts: DataType[] = [];
        // [...res.data.data[1]].map((item, index) => {
        //   return newProducts.push({ ...item, key: skip * limit + index + 1 });
        // });
        console.log(res.data.data[1]);
        const newProducts = [...res.data.data[1]].map((item, index) => ({
          ...item,
          key: skip * limit + index + 1,
        }));
        setTotalProduct(res.data.data[0]);
        setListProduct(newProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [limit, name, skip]);

  useEffect(() => {
    fetchProductMe();
  }, [fetchProductMe]);
  useSWR('product/me', fetchProductMe);

  // const handleCancel = () => setPreviewOpen(false);

  const fetchCreateMarket = async (productId: string) => {
    await instanceAxios
      .post(`marketplace/create?product_id=${productId}`)
      .then((res) => {
        notification.success({
          message: 'Thông báo',
          description: 'Tạo market thành công',
        });
      })
      .catch((err) => {
        notification.error({
          message: 'Thông báo',
          description: 'Tạo market thất bại',
        });
      });
  };
  const fetchUpdateProductStatus = async (
    productId: string,
    status: string
  ) => {
    await instanceAxios
      .put(`product/${productId}/status?product_status=${status}`)
      .then((res) => {
        setHasChange(hasChange + 1);
        notification.success({
          message: 'Thông báo',
          description: `Đổi trạng thái thành công --> ${status}`,
        });
        mutate('product/me');
      })
      .catch((err) => {});
  };

  const fetchDeleteProduct = async (productId: string) => {
    await instanceAxios
      .delete(`product/${productId}/delete`)
      .then((res) => {
        setHasChange(hasChange + 1);
        notification.success({
          message: 'Thông báo',
          description: `Đã xóa sản phẩm`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns: ColumnsType<ProductType> = [
    {
      key: 0,
      title: 'Stt',
      dataIndex: 'key',
      width: 65,
    },
    {
      key: 1,
      title: 'Product Name',
      dataIndex: 'name',
      width: 250,
    },
    {
      key: 2,
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      key: 3,
      title: 'Giá đơn vị',
      dataIndex: 'price',
    },
    {
      key: 4,
      title: 'Ngày bán',
      dataIndex: 'created_at',
      render: (value, record, index) => <p>{moment(value).format('L')}</p>,
    },
    {
      key: 5,
      title: 'Mã giao dịch',
      dataIndex: 'tx_hash',
      render: (value, record, index) => (
        <a href={`https://goerli.arbiscan.io/tx/${value}`} target="_blank">
          <FontAwesomeIcon
            icon={faUpRightFromSquare}
            style={{ color: '#000' }}
          />
        </a>
      ),
    },
    {
      key: 6,
      title: 'Trạng thái',
      dataIndex: 'product_status',
      render: (value, record, index) =>
        record.product_status === 'PUBLISH' ? (
          <Tag color={'success'}>Đang mở bán</Tag>
        ) : (
          <Tag color={'error'}>Đóng</Tag>
        ),
    },
    {
      key: 7,
      title: 'Action',
      dataIndex: '',
      width: 100,
      render: (value, record, index) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                primaryColor: '#e62929',
                colorPrimaryHover: '#2db457',
                // colorBgTextHover: '#e62929',
              },
            },
            token: {
              colorBgContainer: '#7f84d4',
            },
          }}
        >
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                {
                  key: 1,
                  label: (
                    // <Link href={`/product/${record.id}`}>
                    <>
                      <Space
                        onClick={() => {
                          setProductId(record.id || '');
                          setOpenModalUpdate(true);
                          setCurrentProduct(record);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ color: '#2657ab' }}
                        />
                        <p>Chỉnh sửa</p>
                      </Space>
                    </>
                    // </Link>
                  ),
                },
                {
                  key: 2,
                  label: (
                    // <Link href={`/product/${record.id}`}>
                    <>
                      <Space
                        onClick={() => {
                          setProductId(record.id || '');
                          setOpenModalUpdateDescription(true);
                          setCurrentProduct(record);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ color: '#2657ab' }}
                        />
                        <p>Thay đổi mô tả sản phẩm</p>
                      </Space>
                    </>
                    // </Link>
                  ),
                },
                currentUser.system_role=="FARMER" ? {
                  key: 6,
                  label: (
                    // <Link href={`/product/${record.id}`}>
                    <>
                      <Space
                        onClick={() => {
                          setProductId(record.id || '');
                          setOpenModalGrowUp(true);
                          setCurrentProduct(record);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ color: '#2657ab' }}
                        />
                        <p>Cập nhật quá trình phát triễn của cây</p>
                      </Space>
                    </>
                    // </Link>
                  ),
                }:null,
                {
                  key: 3,
                  label: (
                    <Space
                      onClick={() =>
                        record.product_status === 'PUBLISH'
                          ? fetchUpdateProductStatus(record.id || '', 'PRIVATE')
                          : fetchUpdateProductStatus(record.id || '', 'PUBLISH')
                      }
                    >
                      {record.product_status === 'PUBLISH' ? (
                        <FontAwesomeIcon
                          icon={faLockOpen}
                          style={{ color: '#27913c' }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faLock}
                          style={{ color: '#a87171' }}
                        />
                      )}
                      <p>
                        {record.product_status === 'PUBLISH'
                          ? `Publish`
                          : 'Private'}
                      </p>
                    </Space>
                  ),
                },
                !record.is_sale
                  ? {
                      key: 4,
                      label: (
                        <Popconfirm
                          placement={'left'}
                          title="Sure to open market ?"
                          onConfirm={() => fetchCreateMarket(record.id || '')}
                        >
                          <Space>
                            <FontAwesomeIcon
                              icon={faStore}
                              style={{ color: '#65dd55' }}
                            />
                            <p>Đăng lên market</p>
                          </Space>
                        </Popconfirm>
                      ),
                    }
                  : null,
                {
                  key: 5,
                  label: (
                    <Popconfirm
                      title="Sure to delete?"
                      onConfirm={() => fetchDeleteProduct(record.id || '')}
                    >
                      <Space>
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          style={{ color: '#c01616' }}
                        />
                        <p>Xóa</p>
                      </Space>
                    </Popconfirm>
                  ),
                },
              ],
            }}
          >
            <ExclamationCircleTwoTone />
          </Dropdown>
        </ConfigProvider>
      ),
    },
  ];

  return (
    <div className="transition duration-150 ease-out">
      <div className="flex items-center justify-between p-[20px] border-[1px] rounded-[10px]">
        <p className="text-3xl font-medium">Danh sách sản phẩm</p>
        <div
          onClick={() => setOpenModalCreate(true)}
          className="flex items-center p-[10px] border-[1px] border-[#83B970] rounded-[10px]"
        >
          <FontAwesomeIcon
            className="mr-[10px]"
            size={'2x'}
            icon={faSquarePlus}
            style={{ color: '#21a147' }}
          />
          Thêm sản phẩm
        </div>
        <Modal
          centered
          open={openModalCreate}
          width={700}
          rootClassName="bg-[#ECECEC]"
          title={
            currentModalPage === 'CREATE_PRODUCT' && (
              <p onClick={() => setCurrentModalPage('SELECT_TRANSACTION')}>
                Quay lại
              </p>
            )
          }
          onCancel={() => setOpenModalCreate(false)}
          footer={[]}
        >
          {currentUser.system_role === 'SEEDLING_COMPANY' ? (
            <>
              <Typography.Title className="w-fit m-auto" level={3}>
                Thêm sản phẩm
              </Typography.Title>
              <CreateProductForm
                onSuccess={() => {
                  setOpenModalCreate(false);
                  mutate('product/me');
                }}
                transactionId={transactionId}
              />
            </>
          ) : (
            <>
              <Typography.Title className="w-fit m-auto" level={3}>
                {currentModalPage === 'CREATE_PRODUCT'
                  ? `Thêm sản phẩm`
                  : `Chọn hóa đơn`}
              </Typography.Title>
              {currentModalPage === 'SELECT_TRANSACTION' && (
                <div>
                  {listTransaction.length ? (
                    <>
                      {/* <p className="py-[10px]">
                        * Nhắc nhở: Bạn có thể bỏ qua bước này nếu bạn là công
                        ty hạt giống
                      </p> */}
                      <div className="max-h-[600px] overflow-auto">
                        {listTransaction.map((item, index) => (
                          <TransactionSelectItem
                            transactionId={item.id || ''}
                            onFinish={changeCurrentModalPageToCreate}
                            key={index}
                            image={item.product?.banner || ''}
                            productName={item.product?.name || ''}
                            owner={item.product?.user?.username || ''}
                            priceTotal={item.price || 0}
                            buyQuantity={item.quantity || 0}
                            buyDay={item.created_at || ''}
                          />
                        ))}
                        {currentUser.system_role === 'SEEDLING_COMPANY' && (
                          <Button
                            className="m-auto block"
                            onClick={() =>
                              setCurrentModalPage('CREATE_PRODUCT')
                            }
                          >
                            Bỏ qua
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_DEFAULT}
                      description={
                        'Bạn không có giao dịch nào! Vui lòng mua sản phẩm phù hợp cho bạn rồi quay lại !!!'
                      }
                    />
                  )}
                </div>
              )}

              {currentModalPage === 'CREATE_PRODUCT' && (
                <CreateProductForm
                  onSuccess={() => {
                    setOpenModalCreate(false);
                    mutate('product/me');
                  }}
                  transactionId={transactionId}
                />
              )}
            </>
          )}
        </Modal>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={listProduct}
          pagination={{
            onChange: (e) => {
              setSkip(e - 1);
            },
            pageSize: 10,
            total: totalProduct,
            position: ['bottomCenter'],
          }}
          scroll={{ y: 340 }}
        />
        <Modal
          open={openModalUpdate}
          centered
          onCancel={() => setOpenModalUpdate(false)}
          footer={[]}
          width={"50%"}
        >
          <p className="py-[30px] text-center text-[32px] font-semibold">
            Câp nhật sản phẩm
          </p>
          <UpdateProductForm
            onSuccess={() => mutate('product/me')}
            productId={productId}
            data={currentProduct}
          />
        </Modal>
        <Modal
          open={openModalUpdateDescription}
          centered
          onCancel={() => setOpenModalUpdateDescription(false)}
          footer={[]}
        >
          <div className="py-[30px] flex justify-between ">
            <p className="text-[20px] font-semibold">Cập nhật mô tả sản phẩm</p>
            <button
              className="text-[16px]"
              onClick={() => setOpenModalCreateDescription(true)}
            >
              Thêm mô tả
            </button>
          </div>
          <div>
            {dataCurrentProduct.detail_description?.length ? (
              dataCurrentProduct.detail_description.map((item, index) => (
                //   <Popover
                //     title={item.title}
                //     placement={'right'}
                //     content={item.description}
                //     key={index}
                //   >
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-[#fafafa] hover:bg-[#c7c7c7] p-[15px] w-full"
                >
                  <div className=" flex items-center space-x-3">
                    <Avatar src={item.image} />
                    <p>{item.title}</p>
                  </div>
                  <DeleteTwoTone
                    onClick={() => fetchDeleteDescription(item.id || '')}
                  />
                </div>
                // </Popover>
              ))
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                description={'Sản phẩm này không có mô tả nào'}
              />
            )}
          </div>
          <Modal
            open={openModalCreateDescription}
            centered
            onCancel={() => setOpenModalCreateDescription(false)}
            footer={[]}
          >
            <p className="py-[30px] text-center text-[20px] font-semibold">
              Thêm mô tả sản phẩm
            </p>
            <CreateProductDescriptionForm
              onSuccess={() => mutate(`product/${currentProduct.id}`)}
              productId={productId}
              data={currentProduct}
            />
          </Modal>
          
          

        </Modal>
        <Modal
            open={openModalGrowUp}
            centered
            onCancel={() => setOpenModalGrowUp(false)}
            footer={[]}
          >
            <p className="py-[30px] text-center text-[20px] font-semibold">
              Thêm quá trình phát triễn của cây
            </p>
            <GrowUpForm
              onSuccess={() => mutate(`product/${currentProduct.id}`)}
              productId={productId}
            />
          </Modal>
      </div>
    </div>
  );
});
