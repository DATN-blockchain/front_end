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
import { Col, Row, Segmented, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

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
    number_of_sales?: number;
    banner?: string;
    created_by?: string;
    created_at?: string;
    user?: {
      id?: string;
      avatar?: string;
      username?: string;
      email?: string;
      phone?: string;
    };
  };
}

interface DataType {
  key: React.Key;
  index: number;
  user: ReactNode;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  status: string;
}
export default function TransactionCMS() {
  const [currentTable, setCurrentTable] = useState('BUY');
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [transactionTotal, setTransactionTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listTransaction, setListTransaction] = useState<TransactionType[]>([]);

  const fetchDataTransaction = useCallback(async () => {
    setLoading(true);
    await instanceAxios
      .get(`transaction_sf/list?skip=${skip - 1}&limit=${limit}`)
      .then((res) => {
        console.log(res.data.data.list_transaction_sf);
        setTransactionTotal(res.data.data.total_transaction_sf);
        const newListTransaction = [...res.data.data.list_transaction_sf].map(
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

  const columns: ColumnsType<TransactionType> = [
    {
      title: 'Stt',
      dataIndex: 'key',
      width: 65,
    },
    {
      title: currentTable === 'BUY' ? 'Người bán' : 'Người mua',
      dataIndex: 'product.user.username',
      render: (value, record, index) => record.product?.user?.username,
      width: 250,
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
      dataIndex: '',
      render: (value, record, index) =>
        record.price || 0 % 2 ? (
          <Tag color={'success'}>Thành công</Tag>
        ) : (
          <Tag color={'error'}>Thất bại</Tag>
        ),
    },
  ];
  const data: DataType[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      index: i + 1,
      user: 'ReactNode',
      productName: 'string',
      quantity: 12,
      price: 2312,
      total: 131,
      date: 'string',
      status: 'string',
    });
  }
  return (
    <div>
      <div className="flex  items-center justify-between p-[20px] border-[1px] rounded-[10px]">
        <p className="text-3xl font-medium	">Danh sách sản phẩm</p>
      </div>
      <Segmented
        size={'large'}
        defaultValue={currentTable}
        onChange={(e) => setCurrentTable(e.toString())}
        options={[
          { label: 'Lịch sử mua', value: 'BUY' },
          { label: 'Lịch sử bán', value: 'SELL' },
        ]}
      />
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
