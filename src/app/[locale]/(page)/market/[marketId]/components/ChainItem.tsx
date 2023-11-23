import { Avatar, Col, Row, Tooltip } from 'antd';
import React from 'react';

export default function ChainItem({
  role = '',
  data,
}: {
  role?: string;
  data: DetailHistoryType;
}) {
  return (
    <Row className="px-[10px] py-[15px] border-[1px]">
      <Col span={2}>
        <div>
          <Avatar src={data.product?.user?.avatar || ''} />
        </div>
      </Col>
      <Col span={4}>
        <Tooltip title={data.product?.user?.system_role}>
          <div className="flex items-center">
            <p className="pr-[10px] truncate">
              {data.product?.user?.system_role}
            </p>
          </div>
        </Tooltip>
      </Col>
      <Col span={4}>
        <Tooltip title={data.product?.user?.full_name}>
          <p className="pr-[10px] truncate">{data.product?.user?.full_name}</p>
        </Tooltip>
      </Col>
      <Col span={4}>
        <Tooltip title={data.product?.user?.email}>
          <p className="pr-[10px] truncate">{data.product?.user?.email}</p>
        </Tooltip>
      </Col>
      <Col span={6}>
        <Tooltip title={data.product?.user?.address_wallet}>
          <p className="pr-[10px] truncate">
            {data.product?.user?.address_wallet ||
              '0x12abcdefhxzxasdddddddddddddddddddddddddddddddddddddddddddd'}
          </p>
        </Tooltip>
      </Col>
      {/* <Col span={4}>
                        <TooltipAntd title="Hạt giống cây sầu riêng Tây Nguyên">
                          <p className="pr-[10px] truncate">
                            Hạt giống cây sầu riêng Tây Nguyên
                          </p>
                        </TooltipAntd>
                      </Col> */}
      <Col span={4}>
        <Tooltip title={role}>
          <p className="text-center px-[10px] truncate bg-blue-100 rounded-lg text-blue-500">
            {role}
          </p>
        </Tooltip>
      </Col>
    </Row>
  );
}
