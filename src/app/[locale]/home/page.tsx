'use client';
import {
  Avatar,
  Badge,
  Button,
  Carousel,
  Col,
  ConfigProvider,
  Empty,
  Image,
  Input,
  List,
  Modal,
  Pagination,
  Row,
  Segmented,
  Select,
  Skeleton,
  Statistic,
  Typography,
} from 'antd';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import ProductItem from '@/components/Contents/Home/ProductItem';
import staticVariables from '@/static';
import TopBanner from '@/components/Contents/Home/TopBanner';
import {
  AppstoreOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BarsOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import Table, { ColumnsType } from 'antd/es/table';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
// import ProductTodayItem from '@/components/Contents/Home/ProductTodayItem';
import dynamic from 'next/dynamic';
import instanceAxios from '@/api/instanceAxios';
import useSWR, { useSWRConfig } from 'swr';
import Meta from 'antd/es/card/Meta';
import LeaderBoard from './components/LeaderBoard';
import currency from '@/services/currency';
import Category, { LeftArrow, RightArrow } from './components/Category';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const { Search } = Input;
const ProductTodayItem = dynamic(
  () => import('@/components/Contents/Home/ProductTodayItem'),
  {
    loading: () => <Skeleton />,
    ssr: false,
  }
);
// interface MarketType {
//   id?: string;
//   order_type?: string;
//   order_id?: string;
//   order_by?: string;
//   hash_data?: string;
//   created_at?: string;
//   product?: {
//     id?: string;
//     product_type?: string;
//     product_status?: string;
//     name?: string;
//     description?: string;
//     price?: string;
//     quantity?: string;
//     banner?: string;
//     created_by?: string;
//     created_at?: string;
//     user?: {
//       id?: string;
//       avatar?: string;
//       username?: string;
//       email?: string;
//     };
//   };
//   comments?: {
//     content?: string;
//     marketplace_id?: string;
//     user_id?: string;
//     id?: string;
//     created_at?: string;
//     user?: string;
//     reply_comments?: string;
//   };
// }
// interface TopSellingType {
//   Product?: {
//     name?: string;
//     number_of_sales?: number;
//     banner?: string;
//     created_by?: string;
//     description?: string;
//     created_at?: string;
//     price?: number;
//     updated_at?: string;
//     quantity?: number;
//     hashed_data?: string;
//     id?: string;
//     product_status?: string;
//     product_type?: string;
//   };
//   total_quantity?: number;
//   total_sales?: number;
// }
interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

// function LeftArrow() {
//   const { isFirstItemVisible, scrollPrev } =
//     React.useContext(VisibilityContext);

//   return (
//     <ArrowLeftOutlined
//       disabled={isFirstItemVisible}
//       onClick={() => scrollPrev()}
//     />
//   );
// }

// function RightArrow() {
//   const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

//   return (
//     <ArrowRightOutlined
//       disabled={isLastItemVisible}
//       onClick={() => scrollNext()}
//     />
//   );
// }

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderType, setOrderType] = useState('');
  const [productName, setProductName] = useState('');
  const [dataTopSelling, setDataTopSelling] = useState<TopSellingType[]>([]);
  const [dataSegmented, setDataSegmented] = useState('SEEDLING_COMPANY');
  const [orderTypeTopSelling, setOrderTypeTopSelling] =
    useState('SEEDLING_COMPANY');
  const [limit, setLimit] = useState(10);
  const [listMarket, setListMarket] = useState<MarketType[]>([]);
  // const [data, setData] = useState<DataType[]>([]);
  const [totalMarket, setTotalMarket] = useState(0);
  const { mutate } = useSWRConfig();
  const [loadingPage, setLoadingPage] = useState(true);

  const fetchListMarket = useCallback(async () => {
    await instanceAxios
      .get(
        `marketplace/list?${orderType ? `order_type=${orderType}` : ''}${
          productName ? `&name_product=${productName}` : ''
        }&skip=${currentPage - 1}&limit=15`
      )
      .then((res) => {
        setListMarket(res.data.data.list_marketplace);
        setTotalMarket(res.data.data.total_marketplace);
      })
      .catch((err) => {
        console.log(err);
        setListMarket([]);
      });
  }, [currentPage, orderType, productName]);
  const fetchTopSelling = useCallback(async () => {
    await instanceAxios
      .get(`product/top_selling?product_type=${orderTypeTopSelling}`)
      .then((res) => {
        setDataTopSelling(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setDataTopSelling([]);
      })
      .finally(() => setLoadingPage(false));
  }, [orderTypeTopSelling]);
  useEffect(() => {
    fetchTopSelling();
  }, [fetchTopSelling]);
  useEffect(() => {
    fetchListMarket();
  }, [fetchListMarket]);

  // useSWR('marketplace/list', fetchListMarket);

  // useEffect(() => {
  //   fetchListMarket();
  // }, [fetchListMarket]);

  // const loadMoreData = () => {
  //   if (loading) {
  //     return;
  //   }
  //   setLoading(true);
  //   fetch(
  //     'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
  //   )
  //     .then((res) => res.json())
  //     .then((body) => {
  //       setData([...data, ...body.results]);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   loadMoreData();
  // }, []);
  return (
    <div className="w-full">
      {loadingPage ? (
        <></>
      ) : (
        <>
          <Header />
          <div className="w-full flex-col items-center bg-cover	 bg-[url('https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/05/22/16532399004541.jpg')]">
            <div className="w-full flex flex-col">
              <div className="w-1/3 h-[300px] text-white flex items-center ">
                <div className="text-[32px] px-[20px]">
                  <p className="font-[600]">Collections. Next Level.</p>
                  <p className="text-[16px] text-[#b3b3b3]">
                    Discover new collection pages with rich storytelling,
                    featured items, and more
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full m-auto text-white flex">
              <ScrollMenu
                wrapperClassName="w-full px-[20px] mb-[30px] "
                scrollContainerClassName="mx-[20px]"
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
              >
                {listMarket.map((item, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl overflow-hidden w-[230px] mx-[20px] "
                  >
                    <Image
                      width={230}
                      height={230}
                      preview={false}
                      className="rounded-2xl object-cover transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-500"
                      alt=""
                      src={item.product?.banner}
                    />
                    <p className="w-full absolute bottom-0 font-bold p-[20px] text-[14px] bg-gradient-to-t truncate from-[#000000]">
                      {item.product?.name}
                    </p>
                  </div>
                ))}
              </ScrollMenu>
            </div>
          </div>
          {/* LeaderBoard Item */}
          <div className="w-full p-[50px]">
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    fontSize: 24,
                  },
                },
              }}
            >
              <Segmented
                className="font-bold p-[5px] rounded-xl"
                size={'large'}
                onChange={(e) => setOrderTypeTopSelling(e.toString())}
                options={[
                  {
                    label: 'Seed Company',
                    value: 'SEEDLING_COMPANY',
                    className: 'p-[5px] rounded-xl',
                  },
                  {
                    label: 'Farmer',
                    value: 'FARMER',
                    className: 'p-[5px] rounded-xl',
                  },
                  {
                    label: 'Manufacturer',
                    value: 'MANUFACTURER',
                    className: 'p-[5px] rounded-xl',
                  },
                ]}
              />
            </ConfigProvider>
            <div className="w-full flex justify-between gap-x-16">
              {dataTopSelling.length ? (
                <>
                  <div className="w-1/2">
                    {dataTopSelling.length > 1 ? (
                      <LeaderBoard
                        listTopSelling={dataTopSelling.slice(
                          0,
                          Math.round(dataTopSelling.length / 2)
                        )}
                      />
                    ) : (
                      <LeaderBoard listTopSelling={dataTopSelling} />
                    )}
                  </div>
                  {dataTopSelling.length > 1 && (
                    <div className="w-1/2">
                      <LeaderBoard
                        skip={Math.round(dataTopSelling.length / 2)}
                        listTopSelling={dataTopSelling.slice(
                          Math.round(dataTopSelling.length / 2),
                          dataTopSelling.length
                        )}
                      />
                    </div>
                  )}
                </>
              ) : (
                <Empty
                  className="m-auto"
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  description={'Không tìm thấy dữ liệu'}
                />
              )}
            </div>
          </div>
          {/* Category */}
          <div className="pb-[100px]">
            <Category orderType={'SEEDLING_COMPANY'} title="Seed Company" />
            <Category orderType={'FARMER'} title="Farmer" />
            <Category orderType={'MANUFACTURER'} title="Manufacturer" />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
