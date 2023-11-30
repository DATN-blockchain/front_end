import staticVariables from '@/static';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BookOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Col, Row, Tag } from 'antd';
import Link from 'next/link';
import React from 'react';

export default function HistoryItem() {
  return (
    <div
      className={`relative hover:bg-slate-100 p-[5px] mx-[100px] border-[1px] border-t-0`}
    >
      <Row align={'middle'}>
        <Col
          className="flex hover:-translate-y-1 hover:scale-125 duration-300 justify-start"
          span={5}
        >
          <Link href={'/user/1'}>
            <div className=" flex items-center w-fit ">
              <Avatar size={'large'} src={staticVariables.logoRaiden.src} />
              <p className="py-[10px] px-[20px]">Ong A</p>
            </div>
          </Link>
        </Col>
        <Col
          className="flex flex-col hover:-translate-y-1 hover:scale-125 duration-300 justify-center items-center"
          span={5}
        >
          <BookOutlined />
          <p>123 | 1233.000 vnd</p>
        </Col>
        <Col span={1}>
          <ArrowRightOutlined
            style={{ fontSize: '25px', color: '#08c' }}
            className="flex justify-center"
          />
        </Col>
        <Col
          className="flex  hover:-translate-y-1 hover:scale-110 duration-300 justify-center"
          span={2}
        >
          <Tag
            color="success"
            icon={<CheckCircleOutlined />}
            className="m-auto py-[5px] px-[20px] text-sm"
          >
            Success
          </Tag>
        </Col>
        <Col span={1}>
          <ArrowLeftOutlined
            style={{ fontSize: '25px', color: '#08c' }}
            className="flex justify-center"
          />
        </Col>

        <Col
          className=" hover:-translate-y-1 hover:scale-125 duration-300 flex-col justify-center items-center"
          span={5}
        >
          <Link className="flex flex-col items-center" href={'/product/1'}>
            <Avatar shape="square" src={staticVariables.logoRaiden.src} />
            <p>Sau rieng viet</p>
          </Link>
        </Col>
        <Col
          className="flex hover:transition hover:delay-150 hover:duration-300 hover:ease-in-out justify-end"
          span={5}
        >
          <Link href={'/user/1'}>
            <div className="flex hover:-translate-y-1 hover:scale-125 duration-300 items-center">
              <p className="py-[10px] px-[20px]">Ong B</p>
              <Avatar size={'large'} src={staticVariables.logoRaiden.src} />
            </div>
          </Link>
        </Col>
      </Row>
    </div>
  );
}
