import instanceAxios from '@/api/instanceAxios';
import CreateProductForm from '@/components/Contents/common/CreateProductForm';
import { useAppSelector } from '@/hooks';
import fetchUpdate from '@/services/fetchUpdate';
import useLogin from '@/services/requireLogin';
import { ExclamationCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import {
  faCircleXmark,
  faLock,
  faLockOpen,
  faPenToSquare,
  faSquarePlus,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  ConfigProvider,
  Dropdown,
  Form,
  Input,
  InputNumber,
  MenuProps,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  UploadFile,
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
  const [totalProduct, setTotalProduct] = useState(0);
  const [listProduct, setListProduct] = useState<ProductType[]>([]);
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

  const changeCurrentModalPageToCreate = (e: string) => {
    setCurrentModalPage('CREATE_PRODUCT');
    setTransactionId(e);
  };
  const fetchListTransaction = async () => {
    await instanceAxios(`transaction_sf/list?skip=0&limit=100`)
      .then((res) => {
        setListTransaction(res.data.data.list_transaction_sf);
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
      key: 6,
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
                    <Link href={`/product/${record.id}`}>
                      <Space>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ color: '#2657ab' }}
                        />
                        <p>Chỉnh sửa</p>
                      </Space>
                    </Link>
                  ),
                },
                {
                  key: 2,
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
                      key: 3,
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
                  key: 4,
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
          {/* <Row className="flex gap-x-2">
            <Col span={3}>
              <Link href={`/product/${record.id}`}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ color: '#2657ab' }}
                />
              </Link>
            </Col>
            <Col span={3}>
              {record.product_status === 'PUBLISH' ? (
                <FontAwesomeIcon
                  onClick={() => fetchUpdateProductStatus(record.id, 'PRIVATE')}
                  icon={faLockOpen}
                  style={{ color: '#27913c' }}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => fetchUpdateProductStatus(record.id, 'PUBLISH')}
                  icon={faLock}
                  style={{ color: '#a87171' }}
                />
              )}
            </Col>
            <Col span={3}>
              <Popconfirm
                title="Sure to open market ?"
                onConfirm={() => fetchCreateMarket(record.id)}
              >
                <FontAwesomeIcon icon={faStore} style={{ color: '#65dd55' }} />
              </Popconfirm>
            </Col>
            <Col span={3}>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => fetchDeleteProduct(record.id)}
              >
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  style={{ color: '#c01616' }}
                />
              </Popconfirm>
            </Col>
          </Row> */}
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
          <Typography.Title className="w-fit m-auto" level={3}>
            {currentModalPage === 'CREATE_PRODUCT'
              ? `Thêm sản phẩm`
              : `Chọn hóa đơn`}
          </Typography.Title>
          {currentModalPage === 'SELECT_TRANSACTION' && (
            <div>
              <p className="py-[10px]">
                * Nhắc nhở: Bạn có thể bỏ qua bước này nếu bạn là công ty hạt
                giống
              </p>
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
                    onClick={() => setCurrentModalPage('CREATE_PRODUCT')}
                  >
                    Bỏ qua
                  </Button>
                )}
              </div>
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
      </div>
    </div>
  );
});
