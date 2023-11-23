'use client';
import staticVariables from '@/static';
import {
  Collapse,
  CollapseProps,
  Image,
  List,
  Pagination,
  Radio,
  RadioChangeEvent,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import instanceAxios from '@/api/instanceAxios';
import CardProductItem from '../market/components/CardProductItem';

export default function ProductPage() {
  const [valueRadio, setValueRadio] = useState('FARMER');
  const [loading, setLoading] = useState(true);
  const [totalProduct, setTotalProduct] = useState(0);
  const [listProduct, setListProduct] = useState<ProductType[]>([]);

  const fethListProduct = useCallback(async () => {
    await instanceAxios
      .get(`marketplace/list?order_type=${valueRadio}&skip=0&limit=10`)
      .then((res) => {
        setListProduct(res.data.data.list_product);
        setTotalProduct(res.data.data.total_product);
      })
      .catch((err) => console.log(err));
  }, [valueRadio]);
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
    <div className="flex w-4/5  m-auto">
      <div className="w-1/5">
        <Image
          className="object-cover rounded-2xl"
          width={'100%'}
          height={150}
          src={staticVariables.qc5.src}
          alt=""
        />
        <div
          style={{ boxShadow: `0 2px 8px rgba(0,0,0,.15)` }}
          className="w-full shadow-lg rounded-xl overflow-hidden mt-5"
        >
          <Collapse
            bordered={false}
            items={items}
            defaultActiveKey={['1']}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="w-4/5 px-[50px]">
        <p className="text-[18px] pb-[20px]">
          <strong>123</strong> sản phẩm phù hợp với tìm kiếm của bạn
        </p>
        <div className="flex flex-col gap-y-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <CardProductItem key={index} />
          ))}
        </div>
        <Pagination
          className="mx-auto block w-fit mt-5"
          defaultCurrent={1}
          total={50}
        />
      </div>
    </div>
  );
}
