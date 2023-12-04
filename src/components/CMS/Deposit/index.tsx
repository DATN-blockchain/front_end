import instanceAxios from '@/api/instanceAxios';
import {
  faEnvelope,
  faMap,
  faPhone,
  faRightLong,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Select, message } from 'antd';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Deposit() {
  const [cost, setCost] = useState(0);
  const [bank, setBank] = useState('VISA');
  const route = useRouter();

  const fetchDeposit = async () => {
    if (!cost) {
      message.success('Vui lòng chọn số tiền');
    }
    await instanceAxios
      .post(`payment?amount=${cost}&bank_code=${bank}&language=vn`)
      .then((res) => {
        // console.log(res.data);
        route.push(`${res.data}`);
        // message.success('Nạp tiền thành công');
      })
      .catch((err) => message.error('Nạp tiền thật bại'));
  };
  const options = [
    {
      label: 'NCB - Ngân hàng nội địa',
      value: 'NCB',
    },
    {
      label: 'VISA',
      value: 'VISA',
    },
    {
      label: 'SCB',
      value: 'SCB',
    },
  ];
  return (
    <div className="w-full">
      <p className="text-[25px] text-center font-bold">Nạp tiền bằng VNpay</p>
      <div className="w-full text-[16px] mt-[30px] flex items-center justify-center gap-x-10">
        <div className="w-1/4 p-[30px] flex flex-col">
          <p className="font-semibold text-[20px]">Hệ thống</p>
          <p>Bước 1: Chọn số tiền</p>
          <p>Bước 1: Chọn ngân hàng thụ hưởng</p>
          <p>Bước 1: Thực hiện hoàn tất nạp tiền</p>
        </div>
        <FontAwesomeIcon
          size={'5x'}
          icon={faRightLong}
          style={{ color: '#5b94f0' }}
        />
        <div className="w-1/4 p-[30px] flex flex-col">
          <p className="font-semibold text-[20px]">Hệ thống VNpay</p>
          <p>Bước 1: Nhập số thẻ, họ tên chủ thẻ, ngày hết hạn thẻ</p>
          <p>Bước 2: Nhập mã OTP ở điện thoại</p>
          <p>Bước 3: Hoàn tất nạp tiền</p>
        </div>
      </div>
      <div className="w-2/3  m-auto">
        <div className="w-full p-[20px] border-[1px] rounded-xl bg-[#f9f9f9]">
          <div className="w-full flex">
            <div className="w-2/3 cursor-pointer">
              <p className="text-[20px] font-bold py-[20px]">
                Vui lòng chọn số tiền
              </p>
              <div className="w-full flex flex-wrap gap-5">
                <p
                  onClick={() => setCost(100000)}
                  className={`w-2/5 ${
                    cost === 100000 && 'shadow-yellow-300'
                  } bg-white p-[10px] shadow-lg text-center font-bold rounded-xl`}
                >
                  100.000 đ
                </p>
                <p
                  onClick={() => setCost(200000)}
                  className={`w-2/5 ${
                    cost === 200000 && 'shadow-yellow-300'
                  } bg-white p-[10px] shadow-lg text-center font-bold rounded-xl`}
                >
                  200.000 đ
                </p>
                <p
                  onClick={() => setCost(500000)}
                  className={`w-2/5 ${
                    cost === 500000 && 'shadow-yellow-300'
                  } bg-white p-[10px] shadow-lg text-center font-bold rounded-xl`}
                >
                  500.000 đ
                </p>
                <p
                  onClick={() => setCost(1000000)}
                  className={`w-2/5 ${
                    cost === 1000000 && 'shadow-yellow-300'
                  } bg-white p-[10px] shadow-lg text-center font-bold rounded-xl`}
                >
                  1.000.000 đ
                </p>
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-[20px] font-bold py-[20px]">Nhập số khác</p>
              <input
                type={'number'}
                onChange={(e) => setCost(Number(e.target.value))}
                min={0}
                placeholder="Vui lòng nhập số tiền..."
                className="p-[10px] px-[20px] shadow-lg outline-none rounded-xl"
              />
            </div>
          </div>
          <div className="w-full flex flex-col mt-[30px] space-y-5">
            <div className="w-full">
              <p className="text-[20px] font-bold py-[10px]">
                Vui lòng chọn số tiền
              </p>
              <div className="w-full bg-white p-[10px] px-[30px] shadow-lg rounded-xl flex flex-col">
                <div className="flex font-normal space-x-2">
                  <p>Ngân hàng thụ hưởng</p>
                  <p className="text-red-800">*</p>
                </div>
                <select
                  defaultValue={bank}
                  className="outline-none mt-[5px] font-bold"
                >
                  {options.map((item, index) => (
                    <option
                      className="my-[50px] block font-bold"
                      key={index}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
                {/* <Select
                  className="font-bold w-[300px]"
                  defaultValue="MBBANK"
                  style={{ width: 120 }}
                  bordered={false}
                  options={[
                    { value: 'MBBANK', label: 'MB - Ngân hàng TMCP Quân đội' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                  ]}
                /> */}
              </div>
            </div>
            <div className="w-full">
              <p className="text-[20px] font-bold py-[10px]">
                Vui lòng chọn ngôn ngữ
              </p>
              <div className="w-full bg-white p-[10px] px-[30px] shadow-lg rounded-xl flex flex-col">
                <div className="flex font-normal space-x-2">
                  <p>Ngôn ngữ</p>
                  <p className="text-red-800">*</p>
                </div>
                <select className="outline-none mt-[5px] font-bold">
                  <option className="my-[50px] block font-bold" value={'vi'}>
                    Tiếng Việt
                  </option>
                  <option className="my-[50px] block font-bold" value={'en'}>
                    Tiếng Anh
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <p
          onClick={fetchDeposit}
          className="w-fit rounded-lg font-semibold text-white p-[10px] float-right my-[20px]  bg-[#337aee]"
        >
          Hoàn tất nạp tiền
        </p>
      </div>
      <div className="mt-[100px]">
        <p className="text-[25px] font-bold py-[10px]">Liên hệ</p>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center space-x-5">
            <FontAwesomeIcon icon={faPhone} />
            <p>0123123213</p>
          </div>
          <div className="flex items-center space-x-5">
            <FontAwesomeIcon icon={faEnvelope} />
            <p>datbe@gmail.com</p>
          </div>
          <div className="flex items-center space-x-5">
            <FontAwesomeIcon icon={faMap} />
            <p>
              258 Lê Thanh Nghi. Phuong Hoa Cudng, Quan Håi Chåu, Thånh phö Då
              Nång
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
