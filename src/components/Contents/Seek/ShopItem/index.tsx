import staticVariables from '@/static';
import { Image } from 'antd';
import React, { ReactNode } from 'react';

export default function ShopItem({
  leftChildren,
  rightChildren,
  avatar,
}: {
  avatar?: string;
  leftChildren: ReactNode;
  rightChildren: ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="w-full relative ">
        <div className="w-[2/3] m-auto h-[400px] max-sm:h-[150px]">
          <Image
            width={'100%'}
            height={'100%'}
            preview={false}
            src={avatar || staticVariables.noImage.src}
            className="object-cover h-[200px] rounded-[30px]"
            alt=""
          />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[100px] h-[100px]">
          <Image
            width={'100%'}
            height={'100%'}
            preview={false}
            src={avatar || staticVariables.noImage.src}
            className="object-cover h-[200px] rounded-full p-[10px] bg-[#121212]"
            alt=""
          />
        </div>
      </div>
      <div className="w-full flex gap-x-5 mt-[15px] text-white">
        <div className="w-1/2">{leftChildren}</div>
        <div className="w-1/2">{rightChildren}</div>
      </div>
    </div>
  );
}
