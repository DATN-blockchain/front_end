'use client';
import staticVariables from '@/static';
import { CustomerServiceOutlined, MessageOutlined } from '@ant-design/icons';
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Drawer, FloatButton, Input, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { memo, useState } from 'react';

export default memo(function Footer() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div
      // data-aos="fade-left"
      // data-aos-offset="200"
      // data-aos-delay="50"
      // data-aos-duration="1500"
      // data-aos-easing="ease-in-out"
      className="w-full overflow-x-hidden p-[100px] bg-stone-900"
    >
      <div className="w-full flex text-[16px] text-[#6C737D] ">
        <div className="w-1/4">
          <p className="py-[10px] text-[#E1E8ED] font-extrabold">
            About Smarty App
          </p>
          <p>
            Turpis egestas sed tempus urna et. Egestas diam in arcu cursus
            euismod quis viverra nibh.
            <br /> Nec nam aliquam sem et tortor consequat. Sed risus ultricies
            tristique nulla aliquet.
          </p>
        </div>
        <div className="w-1/4">
          <Avatar
            className="m-auto block"
            size={200}
            src={staticVariables.qc6.src}
          />
        </div>
        <div className="w-1/4">
          <p className="py-[10px] text-[#E1E8ED] font-extrabold">
            About Smarty App
          </p>
          <div className="textwidget entry-content">
            <ul>
              <li>
                <a href="#">Introduction</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">News and Stories</a>
              </li>
              <li>
                <a href="#">Roadmap</a>
              </li>
              <li>
                <a href="#">Pricing Plans</a>
              </li>
              <li>
                <a href="https://demo.creativethemes.com/blocksy/app/privacy-policy/">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/4 ">
          <p className="py-[10px] text-[#E1E8ED] font-extrabold">Contact</p>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-5 ">
              <FontAwesomeIcon
                className="p-[10px] rounded-full border-2 border-[#6C737D]"
                icon={faLocationDot}
              />
              <a href="#">14 Doãn Uẩn - Khuê Mỹ - Ngũ Hành Sơn</a>
            </div>
            <div className="flex items-center space-x-5">
              <FontAwesomeIcon
                className="p-[10px] rounded-full border-2 border-[#6C737D]"
                icon={faPhone}
              />
              <a href="#">0123213123</a>
            </div>
            <div className="flex items-center space-x-5">
              <FontAwesomeIcon
                className="p-[10px] rounded-full border-2 border-[#6C737D]"
                icon={faEnvelope}
              />
              <a href="#">duongtrungqb12@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
      <FloatButton
        badge={{ count: 12 }}
        shape="square"
        type="primary"
        onClick={() => setOpenDrawer(true)}
        style={{ right: 24 }}
        icon={<MessageOutlined />}
      />

      <Drawer
        title="Messenger"
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <Input />
        <div className="flex items-center">
          <Avatar src={staticVariables.logoRaiden.src} />
          <div className="pl-[10px]">
            <Meta title={'Ong A'} />
            <Tag>Fammer</Tag>
          </div>
        </div>
        <div className="flex items-center">
          <Avatar src={staticVariables.logoRaiden.src} />
          <div className="pl-[10px]">
            <Meta title={'Ong A'} />
            <Tag>Fammer</Tag>
          </div>
        </div>
        <div className="flex items-center">
          <Avatar src={staticVariables.logoRaiden.src} />
          <div className="pl-[10px]">
            <Meta title={'Ong A'} />
            <Tag>Fammer</Tag>
          </div>
        </div>
      </Drawer>
    </div>
  );
});
