import staticVariables from '@/static';
import { Button, ConfigProvider, Image, Statistic } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

interface PropsType {
  transactionId: string;
  image: string;
  productName: string;
  owner: string;
  buyQuantity: number;
  buyDay: string;
  priceTotal: number;
  onFinish?: (e: string) => void;
}

export default function TransactionSelectItem(props: PropsType) {
  const [showButton, setShowButton] = useState(false);
  return (
    <div
      onMouseOver={() => setShowButton(true)}
      onMouseOut={() => setShowButton(false)}
      className="flex w-full flex-col p-[20px] transition-all	ease-in duration-300"
    >
      <div className="flex gap-x-5">
        <Image
          className="object-cover rounded"
          alt=""
          width={100}
          height={100}
          src={props.image}
        />
        <div className="flex flex-col w-10/12 border-[1px] rounded">
          <p className="text-center text-xl font-medium	">{props.productName}</p>
          <div className="flex justify-around">
            <ConfigProvider
              theme={{
                components: {
                  Statistic: {
                    contentFontSize: 20,
                    titleFontSize: 13,
                  },
                },
              }}
            >
              <Statistic title="Owner" value={props.owner} />
              <Statistic title="Đã mua" value={props.buyQuantity} />
              <Statistic title="Tổng giá trị" value={props.priceTotal} />
              <Statistic
                title="Ngày mua"
                value={moment(props.buyDay).format('L')}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
      {showButton && (
        <Button
          onClick={() => props.onFinish?.(props.transactionId)}
          className="m-auto mt-[10px] w-2/3 "
        >
          Chọn
        </Button>
      )}
    </div>
  );
}
