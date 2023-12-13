import { Image, Modal, Typography } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

interface GrowUpType {
  id?: string;
  product_farmer_id?: string;
  description?: string;
  image?: string;
  video?: string;
  hashed_data?: string;
  created_at?: string;
  product_farmer?: {
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
  };
}

export default function GrowUpItem(props: GrowUpType) {
  const [showListImageModal, setShowListImageModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  return (
    <div className="flex w-full items-center py-[30px]">
      <div
        className={`relative pl-[100px] before:content-[''] before:absolute before:bg-[#1677ff] before:border-[5px] before:rounded-[50%] before:left-[0px] before:top-1/2 before:translate-y-[-50%] before:w-[20px] before:h-[20px] after:content-[''] after:absolute after:z-[-1] after:left-0 after:top-1/2 after:translate-y-[-50%]  after:w-[110%] after:h-[2px] after:bg-[#42bb67] after:bg-[#0505050f]`}
      >
        <p className="absolute top-1/2 left-0 translate-x-[-120%] translate-y-[-50%]">
          {moment(props.created_at).format('DD/MM/YYYY')}
        </p>
        <div className="relative w-fit">
          <Image
            preview={false}
            // onClick={() => setShowListImageModal(true)}
            alt=""
            className="object-cover  bg-white rounded drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
            width={300}
            height={200}
            src={props.image}
          />
          {/* <p className="absolute bottom-0 text-white right-0 py-[20px] px-[30px] bg-[#000000B5] rounded">
            +1
          </p> */}
        </div>
      </div>
      <div className="p-[30px] ml-[40px] rounded border-[1px] border-[#42bb67] w-2/3 max-h-2/3 ">
        <Typography.Title
          onClick={() => setShowDescriptionModal(true)}
          level={3}
        >
          {/* Thay đổi của sản cây vào ngày{' '} */}
          {moment(props.created_at).format('DD/MM/YYYY')}
        </Typography.Title>
        <p className="line-clamp-6 whitespace-pre-wrap bg-inherit text-justify ">
          {props.description}
        </p>
      </div>
      <Modal
        width={700}
        onCancel={() => setShowListImageModal(false)}
        open={showListImageModal}
        footer={[]}
      >
        <Typography.Title level={3}>
          Danh sách hình ảnh được tải lên
        </Typography.Title>
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          <Image
            alt=""
            width={200}
            height={150}
            className="object-cover"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          />
          <Image
            alt=""
            width={200}
            height={150}
            className="object-cover"
            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          />
        </Image.PreviewGroup>
      </Modal>
      <Modal
        width={700}
        onCancel={() => setShowDescriptionModal(false)}
        open={showDescriptionModal}
        footer={[]}
      >
        {/* <Typography.Title level={3}>
          Thông tin về sự phát triển của sản phẩm ngày 23
        </Typography.Title> */}
        <div>{props.description}</div>
      </Modal>
    </div>
  );
}
