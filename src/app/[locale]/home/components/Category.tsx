import instanceAxios from '@/api/instanceAxios';
import currency from '@/services/currency';
import useLogin from '@/services/requireLogin';
import staticVariables from '@/static';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Empty, Image, Statistic } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

interface Props {
  orderType: 'FARMER' | 'SEEDLING_COMPANY' | 'MANUFACTURER';
  title?: string;
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleElements, initComplete } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);
  return (
    <div
      data-aos="fade-up"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1500"
      data-aos-easing="ease-in-out"
      // className="px-[50px]"
    >
      <p className="text-[24px] pl-[50px] font-semibold text-[#121212]">
        {props.title}
      </p>
      {listMarket.length ? (
        <ScrollMenu
          Footer={[]}
          noPolyfill
          wrapperClassName="max-w-full w-fit px-[10px] mb-[30px] "
          scrollContainerClassName="mx-[20px]"
          itemClassName="my-[20px]"
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
        >
          {listMarket.map((item, index) => (
            <div
              // className="hover:text-inherit"
              key={index}
              // href={`/market/${item.id}`}
            >
              <div
                onClick={() => login(() => route.push(`/market/${item.id}`))}
                className="relative w-[278px] flex flex-col mx-[10px] rounded-2xl overflow-hidden hover:shadow-lg shadow transition ease-in-out hover:-translate-y-2 duration-100 "
              >
                <Image
                  width={278}
                  height={185}
                  preview={false}
                  className=" object-cover"
                  alt=""
                  src={item.product?.banner}
                />

                <div className="w-full flex flex-col space-x-2 p-[16px]">
                  <ConfigProvider
                    theme={{
                      components: {
                        Statistic: {
                          titleFontSize: 14,
                          contentFontSize: 16,
                        },
                      },
                    }}
                  >
                    <p className="w-full text-[#121212] text-center font-semibold truncate pb-[16px] text-[16px]">
                      {item.product?.name}
                    </p>
                    <div className="flex">
                      <div className="w-1/2 flex space-y-2 flex-col">
                        <p className="text-[14px] text-[#6f6f6f] font-normal	">
                          Số lượng
                        </p>
                        <p className="font-bold tetx-[16px]">
                          {item.product?.quantity || 0}
                        </p>
                      </div>
                      <div className="w-1/2 flex space-y-2 flex-col">
                        <p className="text-[14px] text-[#6f6f6f] font-normal	">
                          Giá
                        </p>
                        <p className="font-semibold text-[16px] truncate">
                          {`${
                            item.product?.price?.toLocaleString() || 0
                          } ${currency}`}
                        </p>
                      </div>
                    </div>

                    {/* <Statistic
                      className="font-semibold w-1/2"
                      title="Giá"
                      value={item.product?.price}
                      suffix={currency}
                    /> */}
                  </ConfigProvider>
                </div>
              </div>
            </div>
          ))}
        </ScrollMenu>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description={`Không tìm thấy dữ liệu về ${props.title}`}
        />
      )}
    </div>
  );
  return disabled ? (
    <></>
  ) : (
    <div
      // disabled={disabled}
      onClick={() => scrollPrev()}
      className="h-[90%] my-auto flex items-center px-[3px] rounded-md bg-[#e9e9e900] hover:bg-[#9e9e9e]"
    >
      <CaretLeftOutlined />
    </div>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } =
    React.useContext(VisibilityContext);

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return disabled ? (
    <></>
  ) : (
    <div
      // disabled={disabled}
      onClick={() => scrollNext()}
      className="h-[90%] my-auto flex items-center px-[3px] rounded-md bg-[#e9e9e900] hover:bg-[#9e9e9e]"
    >
      <CaretRightOutlined />
    </div>
  );
}

export default function Category(props: Props) {
  const [limit, setLimit] = useState(10);
  const [listMarket, setListMarket] = useState<MarketType[]>([]);
  const [totalMarket, setTotalMarket] = useState(0);
  const { login } = useLogin();
  const route = useRouter();

  const fetchListMarket = useCallback(async () => {
    await instanceAxios
      .get(`marketplace/list?order_type=${props.orderType}&skip=0&limit=10`)
      .then((res) => {
        setListMarket(res.data.data.list_marketplace);
        setTotalMarket(res.data.data.total_marketplace);
      })
      .catch((err) => {
        console.log(err);
        setListMarket([]);
      });
  }, [props.orderType]);
  useEffect(() => {
    fetchListMarket();
  }, [fetchListMarket]);
  return (
    <div
      data-aos="fade-up"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1500"
      data-aos-easing="ease-in-out"
      // className="px-[50px]"
    >
      <p className="text-[24px] pl-[50px] font-semibold text-[#121212]">
        {props.title}
      </p>
      {listMarket.length ? (
        <ScrollMenu
          Footer={[]}
          noPolyfill
          wrapperClassName="max-w-full w-fit px-[10px] mb-[30px] "
          scrollContainerClassName="mx-[20px]"
          itemClassName="my-[20px]"
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
        >
          {listMarket.map((item, index) => (
            <div
              // className="hover:text-inherit"
              key={index}
              // href={`/market/${item.id}`}
            >
              <div
                onClick={() => login(() => route.push(`/market/${item.id}`))}
                className="relative w-[278px] flex flex-col mx-[10px] rounded-2xl overflow-hidden hover:shadow-lg shadow transition ease-in-out hover:-translate-y-2 duration-100 "
              >
                <Image
                  width={278}
                  height={185}
                  preview={false}
                  className=" object-cover"
                  alt=""
                  src={item.product?.banner}
                />

                <div className="w-full flex flex-col space-x-2 p-[16px]">
                  <ConfigProvider
                    theme={{
                      components: {
                        Statistic: {
                          titleFontSize: 14,
                          contentFontSize: 16,
                        },
                      },
                    }}
                  >
                    <p className="w-full text-[#121212] text-center font-semibold truncate pb-[16px] text-[16px]">
                      {item.product?.name}
                    </p>
                    <div className="flex">
                      <div className="w-1/2 flex space-y-2 flex-col">
                        <p className="text-[14px] text-[#6f6f6f] font-normal	">
                          Số lượng
                        </p>
                        <p className="font-bold tetx-[16px]">
                          {item.product?.quantity || 0}
                        </p>
                      </div>
                      <div className="w-1/2 flex space-y-2 flex-col">
                        <p className="text-[14px] text-[#6f6f6f] font-normal	">
                          Giá
                        </p>
                        <p className="font-semibold text-[16px] truncate">
                          {`${
                            item.product?.price?.toLocaleString() || 0
                          } ${currency}`}
                        </p>
                      </div>
                    </div>

                    {/* <Statistic
                      className="font-semibold w-1/2"
                      title="Giá"
                      value={item.product?.price}
                      suffix={currency}
                    /> */}
                  </ConfigProvider>
                </div>
              </div>
            </div>
          ))}
        </ScrollMenu>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description={`Không tìm thấy dữ liệu về ${props.title}`}
        />
      )}
    </div>
  );
}
