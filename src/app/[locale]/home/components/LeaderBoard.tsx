import currency from '@/services/currency';
import staticVariables from '@/static';
import { Avatar, Col, Image, Row, Tooltip } from 'antd';
import React from 'react';
interface Props {
  listTopSelling: TopSellingType[];
  skip?: number;
}
export default function LeaderBoard(props: Props) {
  return (
    <div data-aos="fade-up" data-aos-duration="1500" className="w-full">
      <Row className="px-[10px] text-[14px] border-b-2 py-[20px]">
        <Col span={2}>Rank</Col>
        <Col span={14}>Sản phẩm</Col>
        <Col span={4}>Giao dịch</Col>
        <Col span={4}>
          <p className="float-right">Số lượng bán</p>
        </Col>
      </Row>
      {props.listTopSelling.map((item, index) => (
        <Row
          key={index}
          className="py-[10px] text-[16px] text-[#121212] font-semibold transition ease-in-out  hover:-translate-y-1 hover:bg-[#f6f6f6] rounded-xl px-[10px] duration-300 "
          align={'middle'}
        >
          <Col span={2}>
            <p className="text-[16px]">{(props.skip || 0) + index + 1}</p>
          </Col>
          <Col span={14}>
            <div className="flex items-center gap-x-5">
              <div className="w-fit">
                <Image
                  preview={false}
                  className="object-cover rounded-xl border-[1px]"
                  alt=""
                  width={70}
                  height={70}
                  src={item.Product?.banner}
                />
              </div>
              <p className="text-[16px] leading-6 pr-[50px] truncate">
                {item.Product?.name}
              </p>
            </div>
          </Col>
          <Col span={4}>
            <Tooltip
              placement={'bottomLeft'}
              title={`${item.total_sales} giao dịch thành công`}
            >
              <p className="text-[16px] text-[#121212] truncate">
                {`${item.total_sales} GD`}
              </p>
            </Tooltip>
          </Col>
          <Col span={4}>
            <Tooltip
              placement={'bottomRight'}
              title={`${item.total_quantity} sản phẩm bán ra`}
            >
              <p className="text-[16px] text-right pl-[20px] truncate">{`${item.total_quantity} SP`}</p>
            </Tooltip>
          </Col>
        </Row>
      ))}
    </div>
  );
}
