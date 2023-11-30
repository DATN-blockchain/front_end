import { useAppDispatch, useAppSelector } from '@/hooks';
import { nextEvent } from '@/reducers/nextEventSlice';
import { setshowFormLogin } from '@/reducers/showFormSlice';
import useLogin from '@/services/requireLogin';
import staticVariables from '@/static';
import { ShoppingCartOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import React, { HTMLAttributes, useState } from 'react';
import { CheckoutForm } from '../../common/CheckoutForm';
import instanceAxios from '@/api/instanceAxios';
import moment from 'moment';

interface Props {
  Product?: {
    name?: string;
    number_of_sales?: number;
    banner?: string;
    created_by?: string;
    description?: string;
    created_at?: string;
    price?: number;
    updated_at?: string;
    quantity?: number;
    hashed_data?: string;
    id?: string;
    product_status?: string;
    product_type?: string;
  };
  total_quantity?: number;
  total_sales?: number;
}

export default function ProductTodayItem({
  divElement,
  button,
  props,
}: {
  divElement?: HTMLAttributes<HTMLDivElement>;
  button?: HTMLAttributes<HTMLButtonElement>;
  productName?: string;
  ownerName?: string;
  productAvatar?: string;
  ownerId?: string;
  soldQuantity?: number;
  transactionQuantity?: number;
  props: Props;
}) {
  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.user.logged);
  const [showModalPay, setShowModalPay] = useState(false);
  const [buyOrCart, setBuyOrCart] = useState<'BUY' | 'CART'>('BUY');
  const { login } = useLogin();
  const handleSubmit = (e: any) => {
    buyOrCart === 'BUY' ? alert('Buy') : alert('CART');
  };
  const handleShowModalPay = () => {
    setBuyOrCart('CART');
    setShowModalPay(true);
  };

  return (
    <div className="mt-[30px]" {...divElement}>
      <Typography.Title className="text-center" level={3}>
        {props.Product?.name}
      </Typography.Title>
      <div className="flex items-center">
        <Image
          className="object-cover rounded"
          alt=""
          width={200}
          height={200}
          src={props.Product?.banner}
        />
        <div className="flex flex-col w-2/3 px-[20px] ">
          <div className="flex justify-between ">
            <Statistic title="Số lượng giao dịch" value={props.total_sales} />
            <Statistic title="Số lượng bán" value={props.total_quantity} />
          </div>
          <p>
            Sản phẩm này được bán vào ngày{' '}
            {moment(props.Product?.created_at).format('DD/MM/YYYY')}
          </p>
        </div>
      </div>
      {/* <div className="w-3/5 py-[10px]"> */}
      {/* <div className="flex mb-[10px] gap-x-3 font-thin text-base">
          Sản phẩm của<p className="text-[#313064] font-medium">{props.Product.}</p>
        </div> */}

      <div className="flex items-center mt-[10px]">
        <Button
          onClick={() => {
            login(() => setShowModalPay(true));
          }}
          className="w-full block shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.8784313725)]"
        >
          Buy now
        </Button>
        <Button
          onClick={() => {
            login(handleShowModalPay);
          }}
          className="flex items-center shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.8784313725)]"
        >
          <ShoppingCartOutlined />
        </Button>
      </div>
      <Modal
        centered
        open={showModalPay}
        onCancel={() => setShowModalPay(false)}
        footer={[]}
      >
        <div className="flex flex-col">
          <Typography.Title className="text-center" level={3}>
            Đặt hàng
          </Typography.Title>
          <Typography.Title className="text-center" level={4}>
            Sầu riêng
          </Typography.Title>
          <div className="block m-auto">
            <Image
              width={300}
              height={250}
              className=" object-cover rounded "
              alt=""
              src={staticVariables.logoRaiden.src}
            />
          </div>
          <div className="w-2/3 mt-[20px] border-[1px] p-[20px] rounded">
            <div className="flex w-full justify-between items-center">
              <Typography.Text>Sản phẩm của</Typography.Text>
              <Typography.Text>ABC</Typography.Text>
            </div>
            <div className="flex w-full justify-between items-center">
              <Typography.Text>Đơn giá 123.000</Typography.Text>
              <Typography.Text>ABC</Typography.Text>
            </div>
            <div className="flex w-full justify-between items-center">
              <Typography.Text>Số lượng còn 123</Typography.Text>
              <Typography.Text>ABC</Typography.Text>
            </div>
          </div>
          <Typography.Title className="border-b-[1px] my-[20px]" level={4}>
            Thông tin đặt hàng
          </Typography.Title>
          <CheckoutForm producId={''} price={0} quantity={10} buyQuantity={5} receiver={''} phone={''} address={''}/>
        </div>
      </Modal>
      {/* </div> */}
    </div>
  );
}
