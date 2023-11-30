import staticVariables from '@/static';
import { Button, ConfigProvider, Image, Statistic } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

interface PropsType {
  transactionId: string;
  image: string;
  productName: string;
  owner: string;
  buyQuantity: number;
  buyDay: string;
  priceTotal: number;
  onFinish?: (e: string) => void;
}

export default function TransactionSelectItem(props: PropsType) {
  const [showButton, setShowButton] = useState(false);
  return (
    <div
      // onMouseOver={() => setShowButton(true)}
      // onMouseOut={() => setShowButton(false)}
      className="flex relative w-full group border-b-[1px] flex-col p-[20px] rounded-xl transition-all duration-500 transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <div className="flex gap-x-5">
        <Image
          className="object-cover rounded-full"
          alt=""
          preview={false}
          width={40}
          height={40}
          src={props.image}
        />
        <div className="flex w-10/12 gap-x-3 rounded">
          <div className="w-[100px] flex flex-col">
            <p className="text-[14px] text-[#505050]">Tên sản phẩm</p>
            <p className="truncate font-semibold text-[12px] text-[#9B9B9B] pr-[10px]">
              {props.productName}
            </p>
          </div>
          <div className="w-[100px] flex flex-col">
            <p className="text-[14px] text-[#505050]">Chủ sản phẩm</p>
            <p className="truncate font-semibold text-[12px] text-[#9B9B9B] pr-[10px]">
              {props.owner}
            </p>
          </div>
          <div className="w-[70px] flex flex-col">
            <p className="text-[14px] text-[#505050]">Số lượng</p>
            <p className="truncate font-semibold text-[12px] text-[#9B9B9B] pr-[10px]">
              {props.buyQuantity}
            </p>
          </div>
          <div className="w-[50px] flex flex-col">
            <p className="text-[14px] text-[#505050]">Giá</p>
            <p className="truncate font-semibold text-[12px] text-[#9B9B9B] pr-[10px]">
              {props.priceTotal}
            </p>
          </div>
          <div className="w-[100px] flex flex-col">
            <p className="text-[14px] text-[#505050]">Ngày mua</p>
            <p className="truncate font-semibold text-[12px] text-[#9B9B9B] pr-[10px]">
              {moment(props.buyDay).format('DD/MM/YYYY')}
            </p>
          </div>
          {/* <div className="flex justify-around"> */}
          {/* <ConfigProvider
              theme={{
                components: {
                  Statistic: {
                    contentFontSize: 20,
                    titleFontSize: 13,
                  },
                },
              }}
            >
              <Statistic title="Owner" value={props.owner} />
              <Statistic title="Đã mua" value={props.buyQuantity} />
              <Statistic title="Tổng giá trị" value={props.priceTotal} />
              <Statistic
                title="Ngày mua"
                value={moment(props.buyDay).format('L')}
              />
            </ConfigProvider> */}
          {/* </div> */}
        </div>
      </div>
      <button
        onClick={() => props.onFinish?.(props.transactionId)}
        className=" w-fit px-[20px] py-[5px] rounded text-white font-semibold absolute bg-[#337AEE] top-1/2 right-0 -translate-y-1/2"
      >
        Chọn
      </button>
    </div>
  );
}
