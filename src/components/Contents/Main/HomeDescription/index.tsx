import staticVariables from '@/static';
import { Image } from 'antd';
import React from 'react';

interface Props {
  alignRight: boolean;
}

export default function HomeDescription({ alignRight }: Props) {
  return (
    <div
      data-aos="fade-up"
      className={`flex w-full ${
        alignRight ? 'flex-row-reverse' : ''
      } justify-around items-center px-[100px]`}
    >
      <div className={`w-1/2`}>
        <p className={`text-5xl py-[20px]`}>Giám sát kĩ càng</p>
        <p>
          DatBe tạo ra một hệ thống minh bạch cho việc theo dõi nguồn gốc của
          sản phẩm. Thông tin về quá trình sản xuất, vận chuyển và lưu trữ sản
          phẩm được ghi lại một cách an toàn và không thể thay đổi. Điều này
          giúp tăng độ tin cậy cho tất cả các bên liên quan, từ nhà sản xuất đến
          người tiêu dùng cuối cùng
        </p>
      </div>
      <Image
        width={400}
        height={350}
        preview={false}
        className={`object-cover rounded-xl m-auto`}
        alt=""
        src={staticVariables.logo.src}
      />
    </div>
  );
}
