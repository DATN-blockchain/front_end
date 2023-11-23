import currency from '@/services/currency';
import staticVariables from '@/static';
import {
  faBox,
  faCoins,
  faFileSignature,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Image, Space, Tag } from 'antd';
import Link from 'next/link';
import React from 'react';

export default function CardProductItem(props: MarketType) {
  return (
    <Link className="hover:text-inherit " href={`/market/${props.id}`}>
      <div
        // style={{ boxShadow: `0 2px 8px rgba(0,0,0,.15)` }}
        className="rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_2px_8px_rgba(66,187,103,0.95)]"
      >
        <Badge.Ribbon className="" text="Hippies">
          <div className="flex p-[5px] ">
            <div
              className="w-1/3 rounded-xl overflow-hidden"
              style={{ boxShadow: `0 2px 8px rgba(0,0,0,.15)` }}
            >
              <Image
                className=" object-cover"
                preview={false}
                width={'100%'}
                height={'100%'}
                alt=""
                src={props.product?.banner}
              />
            </div>
            <div className="flex flex-col w-2/3 space-y-1 text-[16px] px-[50px] py-[20px]">
              <p className="text-[20px] font-bold">{props.product?.name}</p>
              <Space>
                <FontAwesomeIcon icon={faBox} style={{ color: '#30b046' }} />
                <p>{props.product?.quantity}</p>
              </Space>
              <Space>
                <FontAwesomeIcon
                  icon={faFileSignature}
                  style={{ color: '#2c963d' }}
                />
                <Tag color={'success'}>{props.product?.product_type}</Tag>
              </Space>
              <Space>
                <FontAwesomeIcon icon={faCoins} style={{ color: '#3da451' }} />
                <p>{`${props.product?.price} ${currency}`}</p>
              </Space>
              <Space>
                <FontAwesomeIcon
                  icon={faUserTie}
                  style={{ color: '#295094' }}
                />
                <p>Sản phẩm của {props.product?.user?.username}</p>
              </Space>
            </div>
          </div>
        </Badge.Ribbon>
      </div>
    </Link>
  );
}
