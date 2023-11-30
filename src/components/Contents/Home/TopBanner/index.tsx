import staticVariables from '@/static';
import { Avatar, Typography } from 'antd';
import React from 'react';

export default function TopBanner() {
  return (
    <div
      // style={{ transform: `rotate3d(0.5, 1, 0, 29deg)` }}
      data-aos="fade-left"
      className="w-[650px] flex items-center rounded bg-[#D0EBD1] p-[20px] pr-[40px] hover:-translate-y-1 hover:scale-110 duration-300 hover:border-1px shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.8784313725)] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
      <div className="w-1/2 border-r-2 border-stone-100">
        <Typography.Title level={2}>1st Fammer</Typography.Title>
        <div className="flex items-center">
          <Avatar size={50} src={staticVariables.logoRaiden.src} />
          <p>Nguyen Van A</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar
          className="mx-[20px] w-1/2"
          shape="square"
          size={100}
          src={staticVariables.logoRaiden.src}
        />
        <div className="w-2/3">
          <Typography.Title className="text-center" translate={'yes'} level={4}>
            Sau rieng tha ia ds a d ada asd asda asdada adsad
          </Typography.Title>
          <div className="text-xs text-[#4D4D4D]">Quantity/Transaction</div>
          <Typography.Title
            className="text-right mr-[20px]"
            translate={'yes'}
            level={2}
          >
            30 / 50
          </Typography.Title>
        </div>
      </div>
    </div>
  );
}
