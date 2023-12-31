import currency from '@/services/currency';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConfigProvider, Image, Statistic } from 'antd';
import Link from 'next/link';
import React from 'react';

export default function MarketItem(props: ProductType) {
  return (
    <div className="transition group relative ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
      <Link
        className="hover:text-inherit"
        onClick={(e) => {
          if (!props.marketplace_id) {
            e.preventDefault();
          }
        }}
        href={`/market/${props.marketplace_id}`}
      >
        <div className="relative w-[278px] flex flex-col mx-[10px] rounded-2xl overflow-hidden hover:shadow-lg shadow transition ease-in-out hover:-translate-y-2 duration-100 ">
          <Image
            width={278}
            height={185}
            preview={false}
            className=" object-cover"
            alt=""
            src={props.banner}
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
                {props.name}
              </p>
              <div className="flex">
                <div className="w-1/2 flex space-y-2 flex-col">
                  <p className="text-[14px] text-[#6f6f6f] font-normal	">
                    Số lượng
                  </p>
                  <p className="font-bold tetx-[16px]">{props.quantity || 0}</p>
                </div>
                <div className="w-1/2 flex space-y-2 flex-col">
                  <p className="text-[14px] text-[#6f6f6f] font-normal	">Giá</p>
                  <p className="font-semibold text-[16px] truncate">
                    {`${props.price?.toLocaleString() || 0} ${currency}`}
                  </p>
                </div>
              </div>
            </ConfigProvider>
          </div>
          {!props.marketplace_id && (
            <div className="absolute flex items-center justify-center text-white text-[20px] font-semibold w-full h-full top-0 left-0 bg-[#0000008C]">
              Đóng
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
