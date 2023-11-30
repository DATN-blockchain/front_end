import staticVariables from '@/static';
import { Avatar, Button, Image } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  originType: 'seed' | 'provider';
  id?: string;
  product_id?: string;
  transaction_sf_id?: string;
  product?: {
    id?: string;
    product_type?: string;
    product_status?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    banner?: string;
    created_by?: string;
    created_at?: string;
    user?: {
      id?: string;
      avatar?: string;
      username?: string;
      email?: string;
    };
  };
  transactions?: DetailHistoryType;
}

export default function ProductOrigin(props: Props) {
  const route = useRouter();
  return (
    <div className="w-full mt-[30px] rounded-xl overflow-hidden border-[1px] border-current-color">
      <p className="text-center p-[20px] bg-current-color text-3xl text-white">
        {props.originType === 'seed'
          ? ' Nguồn gốc hạt giống'
          : 'Nguồn cung cấp'}
      </p>
      <div className="w-full flex">
        <div className="relative w-1/2">
          <Image
            className="object-cover"
            width={'100%'}
            height={'100%'}
            preview={false}
            alt=""
            src={props.product?.banner}
          />
          <p className="absolute -top-[30px] border-[1px] shadow-[0px_4px_50px_30px_rgba(45,180,87,0.50)] translate-x-[-50%] left-1/2 w-fit bg-current-color text-xl text-white py-[10px] px-[30px] rounded-xl">
            {props.originType === 'seed' ? ' Con giống' : 'Sản phẩm'}
          </p>
        </div>
        <div className="w-1/2 relative flex flex-col items-center">
          <p className="absolute -top-[30px] border-[1px] shadow-[0px_4px_50px_10px_rgba(45,180,87,0.50)] translate-x-[-50%] left-1/2 bg-current-color text-xl text-white py-[10px] px-[30px] rounded-xl">
            Nguồn cung cấp
          </p>
          <Avatar
            className="mt-[50px]"
            size={150}
            src={
              props.transactions?.product?.user?.avatar ||
              staticVariables.noImage.src
            }
          />
          <p className="text-xl text-[#262626] p-[10px]">
            {props.transactions?.product?.user?.username}
          </p>
          <p>
            Giao dịch được thực hiện vào ngày{' '}
            {moment(props.transactions?.created_at).format('DD/MM/YYYY')}
          </p>
          <div>
            <Button>Xem giao dịch</Button>
            <Button
              onClick={() => route.push(`/user/${props.transactions?.user_id}`)}
            >
              Ghé thăm gian hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
