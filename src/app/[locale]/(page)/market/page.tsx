'use client';
import staticVariables from '@/static';
import {
  Collapse,
  CollapseProps,
  Empty,
  Image,
  List,
  Pagination,
  Radio,
  RadioChangeEvent,
  Skeleton,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import instanceAxios from '@/api/instanceAxios';
import CardProductItem from './components/CardProductItem';
import Link from 'next/link';

export default function MarketPage() {
  const [valueRadio, setValueRadio] = useState('FARMER');
  const [loadingPage, setLoadingPage] = useState(true);
  const [totalMarket, setTotalMarket] = useState(0);
  const [listMarket, setListMarket] = useState<MarketType[]>([]);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fethListProduct = useCallback(async () => {
    await instanceAxios
      .get(
        `marketplace/list?order_type=${valueRadio}&skip=${
          currentPage - 1
        }&limit=${limit}`
      )
      .then((res) => {
        setListMarket(res.data.data.list_marketplace);
        setTotalMarket(res.data.data.total_marketplace);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingPage(false));
  }, [currentPage, limit, valueRadio]);
  useEffect(() => {
    fethListProduct();
  }, [fethListProduct]);
  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValueRadio(e.target.value);
  };
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Loại sản phẩm',
      children: (
        <Radio.Group
          className="flex flex-col space-y-2"
          onChange={onChangeRadio}
          value={valueRadio}
        >
          <Radio value={'FARMER'}>Fammer</Radio>
          <Radio value={'SEEDLING_COMPANY'}>Cây giống</Radio>
          <Radio value={'MANUFACTURER'}>Sản phẩm nhà máy</Radio>
        </Radio.Group>
      ),
      // extra: <p>{`>`}</p>,
    },
  ];
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <div className="flex w-4/5 py-[100px] m-auto">
      {loadingPage ? (
        <Skeleton />
      ) : (
        <>
          <div className="w-1/5">
            <div className="w-full relative">
              <Image
                className="object-cover rounded-2xl"
                width={'100%'}
                height={150}
                style={{ boxShadow: `0 8px 10px rgba(0,0,0,.25)` }}
                preview={false}
                src={staticVariables.qc5.src}
                alt=""
              />
              <p className="absolute tracking-widest p-[10px] rounded-xl border-2 text-white font-bold text-[20px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                SimpRaidenEi
              </p>
            </div>
            <div
              style={{ boxShadow: `0 2px 8px rgba(0,0,0,.15)` }}
              className="w-full shadow-lg rounded-xl overflow-hidden mt-5"
            >
              <p className="w-full p-[20px] border-b-[1px] text-center font-bold text-[20px]">
                Lọc kết quả
              </p>
              <Collapse
                bordered={false}
                items={items}
                className="text-[15px] font-['Open_Sans']"
                defaultActiveKey={['1']}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="w-4/5 px-[50px]">
            <p className="text-[18px] pb-[20px]">
              <strong>{totalMarket}</strong> sản phẩm phù hợp với tìm kiếm của
              bạn
            </p>
            <div className="flex flex-col gap-y-5">
              {listMarket.length ? (
                listMarket.map((item, index) => (
                  <CardProductItem key={index} {...item} />
                ))
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  description="Không tìm thấy kết quả"
                />
              )}
            </div>
            <Pagination
              className="mx-auto block w-fit mt-5"
              current={currentPage}
              total={totalMarket}
              onChange={(e) => setCurrentPage(e)}
            />
          </div>
        </>
      )}
    </div>
  );
}
