'use client';
import HistoryItem from '@/components/Contents/History/HistoryItem';
import staticVariables from '@/static';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { faUber } from '@fortawesome/free-brands-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import {
  faMoneyBillTransfer,
  faRectangleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Col, Pagination, Row, Statistic } from 'antd';
import React from 'react';

export default function HistoryPage() {
  return (
    <div className="px-[50px]">
      <div className="mb-[50px]">Lich su giao dich toan he thong</div>
      <Row className="w-9/12 m-auto" justify={'space-around'} align={'middle'}>
        <Col span={7} className="flex items-center">
          <FontAwesomeIcon
            size={'3x'}
            icon={faMoneyBillTransfer}
            style={{ color: '#515590' }}
            className="pl-[10px] pr-[20px]"
          />
          <Statistic title="So giao dich hien tai" value={112893} />
        </Col>
        <Col span={7} className="flex items-center">
          <FontAwesomeIcon
            size={'3x'}
            icon={faCalendarCheck}
            style={{ color: '#559a3c' }}
            className="pl-[10px] pr-[20px]"
          />
          <Statistic title="So gia dich thanh cong" value={1193} />
        </Col>
        <Col span={7} className="flex items-center">
          <FontAwesomeIcon
            size={'3x'}
            icon={faRectangleXmark}
            style={{ color: '#b63535' }}
            className="pl-[10px] pr-[20px]"
          />
          <Statistic title="So giao dich that bai" value={1231} />
        </Col>
      </Row>
      <div>
        <p className="my-[50px]">Danh sach giao dich</p>
        <div className={`relative p-[10px] mx-[100px] border-[1px]`}>
          <Row align={'middle'}>
            <Col className="flex justify-center" span={5}>
              Ben mua
            </Col>
            <Col className="flex flex-col justify-center items-center" span={5}>
              <div className="text-center">
                Giao dich
                <br />
                <i>(So luong | Thanh tien)</i>
              </div>
            </Col>

            <Col className="flex justify-center" span={4}>
              Trang thai
              <QuestionCircleTwoTone className="ml-[5px]" />
            </Col>

            <Col className="flex flex-col justify-center items-center" span={5}>
              San pham
            </Col>
            <Col className="flex justify-center" span={5}>
              Ben Ban
            </Col>
          </Row>
        </div>
        <div>
          <HistoryItem />
          <HistoryItem />
        </div>
      </div>
      <Pagination
        className="w-fit m-auto mt-[50px]"
        current={1}
        onChange={() => {}}
        total={50}
      />
      ;
    </div>
  );
}
