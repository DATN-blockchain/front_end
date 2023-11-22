import { Button, Radio, Steps } from 'antd';
import React, { useState } from 'react';
import RegisterForm from '../RegisterForm';
import RoleSelect from '../RoleSelect';
import MapSelect from '../MapSelect';

export default function RegisterEnterprise() {
  const [current, setCurrent] = useState(0);

  const items = [
    {
      title: 'Bạn muốn đóng vai trò gì trong hệ thống?',
      description: <RoleSelect />,
    },
    {
      title: 'In Progress',
      //   subTitle: 'Left 00:00:08',
      description: <MapSelect/>,
    },
    {
      title: 'Sản phẩm bạn muốn bán là gì?',
      description: <Radio.Group name="radiogroup" defaultValue={1}>
      <Radio value={1}>Sầu riềng DatBe</Radio>
      <Radio value={2}>Tôm Hùm SimpRaiden</Radio>
      <Radio value={3}>Pycharm LuanNguyen</Radio>
      <Radio value={4}>Florentino</Radio>
    </Radio.Group>,
    },
    {
      title: 'Tần suất bán sử dụng trang web của chúng tôi?',
      description: <Radio.Group name="radiogroup" defaultValue={1}>
      <Radio value={1}>{`Ít (theo mùa)`}</Radio>
      <Radio value={2}>{`Trung bình (theo đợt)`}</Radio>
      <Radio value={3}>{`Thường xuyên(hoạt động mọi lúc)`}</Radio>
    </Radio.Group>,
    },
  ];

  return (
    <div>
      <div className='text-center text-2xl my-[50px]'>Đăng ký doanh nghiệp</div>
      <Steps
        current={current}
        percent={60}
        direction="vertical"
        items={items.map((item, index) => ({
          key: index,
          title: item.title,
          description: item.description,
        }))}
        onChange={(value) => {setCurrent(value)}}
      />
      <Button disabled={!(current===items.length-1)} className='block m-auto my-[50px]'>Done</Button>
    </div>
  );
}
