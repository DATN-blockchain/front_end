'use client';
import {
  Badge,
  Button,
  Carousel,
  Empty,
  Image,
  Input,
  Modal,
  Pagination,
  Segmented,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import ProductItem from '@/components/Contents/Home/ProductItem';
import staticVariables from '@/static';
import TopBanner from '@/components/Contents/Home/TopBanner';
import {
  AppstoreOutlined,
  BarsOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import Table, { ColumnsType } from 'antd/es/table';
// import ProductTodayItem from '@/components/Contents/Home/ProductTodayItem';
import dynamic from 'next/dynamic';
import instanceAxios from '@/api/instanceAxios';
import useSWR, { useSWRConfig } from 'swr';

const { Search } = Input;
const ProductTodayItem = dynamic(
  () => import('@/components/Contents/Home/ProductTodayItem'),
  {
    loading: () => <Skeleton />,
    ssr: false,
  }
);
interface MarketType {
  id?: string;
  order_type?: string;
  order_id?: string;
  order_by?: string;
  hash_data?: string;
  created_at?: string;
  product?: {
    id?: string;
    product_type?: string;
    product_status?: string;
    name?: string;
    description?: string;
    price?: string;
    quantity?: string;
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
  comments?: {
    content?: string;
    marketplace_id?: string;
    user_id?: string;
    id?: string;
    created_at?: string;
    user?: string;
    reply_comments?: string;
  };
}
interface TopSellingType {
  Product?: {
    name?: string;
    number_of_sales?: number;
    banner?: string;
    created_by?: string;
    description?: string;
    created_at?: string;
    price?: number;
    updated_at?: string;
    quantity?: number;
    hashed_data?: string;
    id?: string;
    product_status?: string;
    product_type?: string;
  };
  total_quantity?: number;
  total_sales?: number;
}
interface DataType {
  key: React.Key;
  index: number;
  fammer: ReactNode;
  product: number;
  transaction: number;
  sellquantity: number;
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderType, setOrderType] = useState('');
  const [productName, setProductName] = useState('');
  const [dataTopSelling, setDataTopSelling] = useState<TopSellingType>({});
  const [dataSegmented, setDataSegmented] = useState('FARMER');
  const [limit, setLimit] = useState(10);
  const [listMarket, setListMarket] = useState<MarketType[]>([]);
  const [totalMarket, setTotalMarket] = useState(0);
  const { mutate } = useSWRConfig();

  const fetchListMarket = useCallback(async () => {
    await instanceAxios
      .get(
        `marketplace/list?${orderType ? `order_type=${orderType}` : ''}${
          productName ? `&name_product=${productName}` : ''
        }&skip=${currentPage - 1}&limit=${limit}`
      )
      .then((res) => {
        setListMarket(res.data.data.list_marketplace);
        setTotalMarket(res.data.data.total_marketplace);
      })
      .catch((err) => {
        console.log(err);
        setListMarket([]);
      });
  }, [currentPage, limit, orderType, productName]);
  const fetchTopSelling = useCallback(async () => {
    await instanceAxios
      .get(`product/top_selling?product_type=${dataSegmented}`)
      .then((res) => {
        console.log(res.data.data);
        setDataTopSelling(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
        setDataTopSelling({});
      });
  }, [dataSegmented]);
  useEffect(() => {
    fetchTopSelling();
  }, [fetchTopSelling]);
  useEffect(() => {
    fetchListMarket();
  }, [fetchListMarket]);

  useSWR('marketplace/list', fetchListMarket);

  // useEffect(() => {
  //   fetchListMarket();
  // }, [fetchListMarket]);

  const contentStyle: React.CSSProperties = {
    height: 100,
    borderRadius: '10px',
    objectFit: 'cover',
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Rank',
      dataIndex: 'index',
      width: 65,
    },
    {
      title: 'Fammer',
      dataIndex: 'fammer',
      width: 250,
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Transaction',
      dataIndex: 'transaction',
    },
    {
      title: 'Sell Quantity',
      dataIndex: 'sellquantity',
    },
  ];
  const data: DataType[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      index: i + 1,
      fammer: `Edward King ${i}`,
      product: 32,
      transaction: i,
      sellquantity: i,
    });
  }
  return (
    <div className="w-full">
      <div className="relative w-full overflow-x-hidden">
        <Image
          width={1700}
          alt=""
          preview={false}
          src={staticVariables.qc5.src}
        />
        <div className="w-full absolute flex flex-col items-center top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] font-bold text-white">
          <p
            data-aos="fade-up"
            data-aos-duration="1500"
            className=" text-6xl p-[50px]"
          >
            Chuỗi cứng ứng sản phẩm sầu riêng
          </p>
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="flex flex-col items-center border-[6px] px-[50px] py-[10px] rounded"
          >
            <p className="text-3xl">Ghé thăm sản phẩm</p>
            <CaretDownOutlined className="text-5xl" />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-around">
        {/* <div data-aos="fade-right" className="w-1/2 drop-shadow-lg">
          <Carousel
            className=" shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.8784313725)] rounded-[10px] overflow-hidden h-[400px]"
            autoplay
          >
            <Image
              className="w-full h-full object-cover"
              width={'100%'}
              height={400}
              alt=""
              src={staticVariables.qc1.src}
            />

            <Image
              width={'100%'}
              height={400}
              alt=""
              src={staticVariables.qc3.src}
            />

            <Image
              width={'100%'}
              height={400}
              className="w-full h-full object-cover"
              alt=""
              src={staticVariables.qc2.src}
            />
          </Carousel>
        </div> */}
        {/* <div className="flex flex-col gap-y-5">
          <TopBanner />
          <TopBanner />
        </div> */}
      </div>
      <div className="w-full mt-[50px] justify-around flex">
        <div className="w-1/2 ">
          <Segmented
            size={'large'}
            className="m-auto my-[20px]"
            options={[
              {
                label: 'Top Fammer',
                value: '1',
                icon: <BarsOutlined />,
              },
              {
                label: 'Top Factory',
                value: '2',
                icon: <AppstoreOutlined />,
              },
              {
                label: 'Top SeedCompany',
                value: '3',
                icon: <AppstoreOutlined />,
              },
            ]}
          />
          <div className="w-full border-2">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{ y: 340 }}
            />
          </div>
        </div>
        <div className="border-[2px] w-1/3 border-green-500 px-[20px] py-[30px] rounded">
          <Typography.Title level={3}>
            Sản phẩm bán chạy trên hệ thống
          </Typography.Title>
          <Segmented
            defaultValue={dataSegmented}
            value={dataSegmented}
            onChange={(e) => setDataSegmented(e.toString())}
            options={[
              { label: 'Farmer', value: 'FARMER' },
              { label: 'Seedling Company', value: 'SEEDLING_COMPANY' },
              { label: 'Manufacturer', value: 'MANUFACTURER' },
            ]}
          />
          {dataTopSelling ? (
            <ProductTodayItem props={dataTopSelling} />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_DEFAULT}
              description={'Không có dữ liệu'}
            />
          )}
        </div>
      </div>
      {/* <div className="flex">
        <Search
          className="m-auto"
          placeholder="Search product"
          onSearch={() => {}}
          style={{ width: 500 }}
        />
      </div> */}
      <div className="w-1/2 flex items-center justify-around mt-[50px]">
        <Segmented
          size={'large'}
          onChange={(e) => setOrderType(e.toString())}
          options={[
            { label: 'All', value: '' },
            { label: 'Fammer', value: 'FARMER' },
            { label: 'Seed Company', value: 'SEEDLING_COMPANY' },
            { label: 'Distributer', value: 'DISTRIBUTER' },
            { label: 'Factory', value: 'FACTORY' },
          ]}
        />
        <Select
          labelInValue
          defaultValue={{ value: 'popular', label: 'Popular' }}
          style={{ width: 120 }}
          // onChange={handleChange}
          options={[
            {
              value: 'popular',
              label: 'Popular',
            },
            {
              value: 'lasted',
              label: 'Lasted',
            },
          ]}
        />
      </div>
      <div className="w-full flex flex-wrap gap-y-24 gap-x-12 m-auto mt-[80px] item-center justify-center">
        {listMarket.length ? (
          listMarket.map((item: MarketType, index) => (
            <Badge.Ribbon text="Hot" color="blue" key={index}>
              <ProductItem {...item} />
            </Badge.Ribbon>
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_DEFAULT}
            description={'Không có dữ liệu'}
          />
        )}
      </div>
      <Pagination
        className="w-fit m-auto mt-[50px]"
        current={currentPage}
        onChange={(e) => setCurrentPage(e)}
        total={totalMarket}
      />
    </div>
  );
}
