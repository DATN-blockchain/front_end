import { Image, Typography } from 'antd';
import React from 'react';

export default function DescriptionItem() {
  return (
    <div className="w-full">
      <Typography.Title level={4}>Gioi thieu ve san pham</Typography.Title>
      <div className="w-fit block m-auto my-[20px]">
        <Image
          className='rounded'
          alt=""
          width={300}
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </div>
      <p className='px-[20px]'>
        DatBe tạo ra một hệ thống minh bạch cho việc theo dõi nguồn gốc của sản
        phẩm. Thông tin về quá trình sản xuất, vận chuyển và lưu trữ sản phẩm
        được ghi lại một cách an toàn và không thể thay đổi. Điều này giúp tăng
        độ tin cậy cho tất cả các bên liên quan, từ nhà sản xuất đến người tiêu
        dùng cuối cùng
      </p>
    </div>
  );
}
