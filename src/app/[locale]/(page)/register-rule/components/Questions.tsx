import staticVariables from '@/static';
import { Image } from 'antd';
import React from 'react';

export default function Questions() {
  return (
    <div className="w-full flex">
      <div className="w-1/2 h-full">
        <Image preview={false} src={staticVariables.qc4.src} alt="" />
      </div>
      <div className="w-1/2 h-full bg-[#f9f9f9]"></div>
    </div>
  );
}
