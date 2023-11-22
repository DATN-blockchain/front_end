import instanceAxios from '@/api/instanceAxios';
import currency from '@/services/currency';
import staticVariables from '@/static';
import { DeleteTwoTone } from '@ant-design/icons';
import { Avatar, Image, message } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

export default function CartItem({
  active = false,
  data,
  onDeleteSuccess,
}: {
  active?: boolean;
  data: CartItemType;
  onDeleteSuccess?: () => void;
}) {
  const [isHover, setIsHover] = useState(false);
  const fetchDeleteCart = async () => {
    await instanceAxios
      .delete(`cart/${data.id}/delete`)
      .then((res) => {
        message.success('Đã xóa cart');
        onDeleteSuccess?.();
      })
      .catch((err) => {
        message.error('Xoá cart thất bại');
      });
  };
  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`flex items-center transition space-x-5 rounded-xl p-[10px] bg-[#f6f6f6] hover:bg-[#ebebeb] ${
        active ? 'bg-[#dedede]' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <Image
          width={70}
          height={70}
          preview={false}
          className="rounded-xl  object-cover"
          alt=""
          src={data.product?.banner}
        />
      </div>
      <div className="w-5/6 relative flex items-center justify-between">
        <div className="w-1/2 flex flex-col">
          <p className=" w-full block font-semibold text-[16px] truncate">
            {data.product?.name}
          </p>
          <p className="w-full font-normal text-[13px] truncate">
            {`Chủ sở hữu ${data.product?.user?.username}`}
          </p>
          <p className="text-[10px] text-gray-600">
            {`Đã thêm vào ${moment(data.created_at).format('lll')}`}
          </p>
        </div>
        <div className="font-bold relative transition pr-[10px]">
          {isHover ? (
            <DeleteTwoTone onClick={fetchDeleteCart} />
          ) : (
            <p className=" ">{`${data.price} ${currency} / ${data.quantity}`}</p>
          )}
        </div>
      </div>
    </div>
  );
}
