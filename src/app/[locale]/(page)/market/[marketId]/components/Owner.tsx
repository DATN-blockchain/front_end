import React from 'react';
// import './index.module.css';
import { Button, Image } from 'antd';
import staticVariables from '@/static';
import Link from 'next/link';

export default function Owner(props: UserType) {
  return (
    <div className="group before:hover:scale-95 before:hover:w-full before:hover:h-full before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-5/6 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-80 h-72 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
      <Image
        alt=""
        width={113}
        preview={false}
        height={113}
        src={props.avatar}
        className="object-cover mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500"
      />
      <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
        <p className="text-2xl mt-[20px] font-semibold">{props.full_name}</p>
        <p>{props.email}</p>
      </div>

      <div className=" z-10 flex space-x-5 ">
        {/* <Button>Liên hệ</Button> */}
        <Link
          className="bg-blue-700 hover:bg-blue-500 px-4 py-1 text-slate-50 rounded-md hover:scale-125 transition-all duration-500 "
          href={`/user/${props.id}`}
        >
          Xem
        </Link>
      </div>
    </div>
  );
}
