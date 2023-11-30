import instanceAxios from '@/api/instanceAxios';
import currency from '@/services/currency';
import {
  faCircleXmark,
  faLock,
  faLockOpen,
  faPenToSquare,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Col, Image, Row, Segmented, Tag, notification } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

interface Product {
  id: string;
  product_type: string;
  product_status: string;
  name: string;
  description: string;
  price: number;
  last_price: number | null;
  quantity: number;
  number_of_sales: number;
  is_sale: boolean;
  banner: string;
  created_by: string;
  tx_hash: string;
  view: number;
  created_at: string;
  detail_description: any[]; // Type depends on the actual content
  classify_goods: any[]; // Type depends on the actual content
  user: {
    id: string;
    avatar: string;
    username: string;
    full_name: string | null;
    email: string;
    phone: string | null;
    system_role: string;
    address_wallet: string;
  };
}

interface TransactionType {
  id: string;
  product_id: string;
  user_id: string;
  price: number;
  quantity: number;
  status: string;
  receiver: string;
  phone_number: string;
  address: string;
  created_at: string;
  updated_at: string | null;
  tx_hash: string;
  product: Product;
  user: {
    id: string;
    avatar: string | null;
    username: string;
    full_name: string | null;
    email: string;
    phone: string | null;
    system_role: string;
    address_wallet: string;
  };
}

export default function TransactionStatus() {
  const [currentTable, setCurrentTable] = useState('BUY');
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [transactionTotal, setTransactionTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const tNotification = useTranslations('notification');
  const [listTransaction, setListTransaction] = useState<TransactionType[]>([]);
  const { mutate } = useSWRConfig();

  const fetchDataTransaction = useCallback(async () => {
    setLoading(true);
    await instanceAxios
      .get(`product/order_product/get?skip=${skip - 1}&limit=${limit}`)
      .then((res) => {
        console.log(res.data.data.list_transaction_sf);
        setTransactionTotal(res.data.data.total_transaction);
        const newListTransaction = [...res.data.data.list_transaction].map(
          (item, index) => ({ key: (skip - 1) * limit + index + 1, ...item })
        );
        setListTransaction(newListTransaction);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, skip]);
  useEffect(() => {
    fetchDataTransaction();
  }, [fetchDataTransaction]);
  useSWR('product/order_product/get', fetchDataTransaction);
  const updateStatusTransaction = async (
    status: string,
    record: TransactionType
  ) => {
    await instanceAxios
      .put(
        `product/${record.product_id}/confirm_order?transaction_id=${record.id}&status=${status}`
      )
      .then((err) => {
        notification.success({
          message: 'Thành công',
          description: `Đã ${status} đơn hàng ${record.product.name}`,
        });
        mutate('product/order_product/get');
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: 'Thất bại',
          description: 'Thao tác thất bại',
        });
      });
  };
  const columns: ColumnsType<TransactionType> = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'user.full_name',
      render: (value, record, index) => record.user?.full_name,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product.name',
      render: (value, record, index) => record.product?.name,
    },
    {
      title: 'Số lượng bán',
      dataIndex: 'quantity',
    },
    {
      title: 'Giá đơn vị',
      dataIndex: 'price',
      render: (value, record, index) => `${value.toLocaleString()} ${currency}`,
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'total',
      render: (value, record, index) =>
        `${(
          (record.price || 0) * (record.quantity || 0)
        ).toLocaleString()} ${currency}`,
    },
    {
      title: 'Ngày giao dịch',
      dataIndex: 'created_at',
      render: (value, record, index) => moment(value).format('DD/MM/YYYY'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value, record, index) =>
        record.status === 'DONE' ? (
          <Tag color={'success'}>Thành công</Tag>
        ) : record.status === 'PENDING' ? (
          <Tag color={'warning'}>Đang chờ giao hàng</Tag>
        ) : (
          <Tag color={'error'}>Giao hàng không thành công</Tag>
        ),
    },
    {
      title: 'Cập nhật trạng thái',
      render: (value, record, index) =>
        record.status === 'PENDING' ? (
          <div className="flex gap-x-3">
            <button
              className="bg-red-200 text-[12px] text-red-700 p-[5px] border-[1px] border-red-500 rounded-lg"
              color={'success'}
              onClick={() => updateStatusTransaction('REJECT', record)}
            >
              Từ chối
            </button>
            <button
              className="bg-green-200 text-[12px] text-green-700 p-[5px] border-[1px] border-green-500 rounded-lg"
              color={'error'}
              onClick={() => updateStatusTransaction('ACCEPT', record)}
            >
              Xác nhận
            </button>
          </div>
        ) : record.status === 'REJECT' ? (
          <Tag color={'error'}>Đã từ chối</Tag>
        ) : (
          <Tag color={'green'}>Đã hoàn thành</Tag>
        ),
    },
  ];
  // const data: DataType[] = [];
  // for (let i = 0; i < 10; i++) {
  //   data.push({
  //     key: i,
  //     user: 'ReactNode',
  //     productName: 'string',
  //     quantity: 12,
  //     price: 2312,
  //     total: 131,
  //     date: 'string',
  //     status: 'string',
  //   });
  // }
  return (
    <div>
      <div className="flex  items-center justify-between p-[20px] border-[1px] rounded-[10px]">
        <p className="text-3xl font-medium	">Danh sách sản phẩm</p>
      </div>
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={listTransaction}
          pagination={{
            onChange: (e) => {
              setSkip(e - 1);
            },
            current: skip,
            pageSize: 10,
            total: transactionTotal,
            position: ['bottomCenter'],
          }}
          scroll={{ y: 340 }}
        />
      </div>
    </div>
  );
}
