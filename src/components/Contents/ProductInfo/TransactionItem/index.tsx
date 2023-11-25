import staticVariables from '@/static';
import { Avatar, Button, Col, Image, Row } from 'antd';
import React from 'react';

export default function TransactionItem() {
  return (
    <div>
      <Row className="border-[1px] border-t-0 py-[5px]" align="middle">
        <Col span={8}>
          <div className="w-fit m-auto flex gap-x-5 items-center">
            <Avatar size={'large'} src={staticVariables.logoRaiden.src} />
            <div className="flex flex-col">
              <span>Cty A</span>
              <span>14Doan Uan</span>
            </div>
          </div>
        </Col>
        <Col span={4}>50</Col>
        <Col span={4}>1200.000</Col>
        <Col span={4}>01/02/20001</Col>
        <Col span={4}>
          <Button>Xem them</Button>
        </Col>
      </Row>
    </div>
  );
}
