'use client';
import staticVariables from '@/static';
import { Avatar } from 'antd';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

export default function SearchItem({
  parent = {},
  data,
}: {
  parent?: HTMLAttributes<HTMLDivElement>;
  data: MarketType;
}) {
  return (
    <Link
      href={`/market/${data.id}`}
      className="flex justify-between w-[500px] rounded px-[10px] items-center gap-x-5 py-[10px] pr-[30px] border-t-[1px] bg-[#1212120A] hover:bg-[#ececec] hover:text-inherit"
    >
      <div
        {...parent}
        className={`flex gap-x-5 items-center ${parent.className} `}
      >
        <Avatar size={50} src={data.product?.banner} />
        <div>
          <p className="text-lg font-medium">{data.product?.name}</p>
          <div className="flex gap-x-2">
            <p className="font-light">Sản phẩm của</p>
            <p className="font-medium">{data.product?.user?.username}</p>
          </div>
        </div>
        <div className="self-end">Còn {data.product?.quantity}</div>
      </div>
      <div className="">{data.product?.price?.toLocaleString()} VND</div>
    </Link>
  );
}
