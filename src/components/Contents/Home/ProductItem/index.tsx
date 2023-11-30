import {
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
  LikeOutlined,
  MessageOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Card,
  ConfigProvider,
  Empty,
  Image,
  Modal,
  Space,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useLogin from '@/services/requireLogin';
import CommentItem from '../../ProductInfo/CommentItem';
import CommentInput from '../../common/CommentInput';
import instanceAxios from '@/api/instanceAxios';
import useSWR from 'swr';
import currency from '@/services/currency';
import staticVariables from '@/static';

const { Meta } = Card;

interface Props {
  id?: string;
  order_type?: string;
  order_id?: string;
  order_by?: string;
  hash_data?: string;
  created_at?: string;
  product?: {
    id?: string;
    product_type?: string;
    product_status?: string;
    name?: string;
    description?: string;
    price?: string;
    quantity?: string;
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
  comments?: {
    content?: string;
    marketplace_id?: string;
    user_id?: string;
    id?: string;
    created_at?: string;
    user?: string;
    reply_comments?: string;
  };
}

export default function ProductItem(props: Props) {
  const { login } = useLogin();
  const [openComment, setOpenComment] = useState(false);
  const [commentList, setCommentList] = useState<CommentItemType[]>([]);
  const [skip, setKkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const fetchDataComment = useCallback(async () => {
    await instanceAxios
      .get(
        `comments/list?marketplace_id=${props.id}&skip=${skip}&limit=${limit}`
      )
      .then((res) => {
        console.log(res.data.data.list_comment);
        setCommentList(res.data.data.list_comment);
      })
      .catch((err) => {
        setCommentList([]);
        console.log(err);
      });
  }, [limit, props.id, skip]);
  useSWR(`comments/list?marketplace_id=${props.id}`, fetchDataComment);
  const afterOpenChange = async (e: boolean) => {
    if (e) {
      fetchDataComment();
    }
  };
  // useEffect(() => {
  //   fetchDataComment();
  // }, [fetchDataComment, limit, props.marketId, skip]);
  // const { isLoading } = useSWR(``, fetchDataComment);
  return (
    <div data-aos="flip-right" className="w-fit">
      <Card
        hoverable
        style={{ width: 300 }}
        cover={
          <div className="relative w-fit">
            <Image
              width={300}
              height={200}
              alt=""
              className="object-cover"
              src={props.product?.banner}
            />
          </div>
        }
        actions={[
          <div onClick={() => login()} key="like">
            <Statistic
              valueStyle={{ fontSize: '10px' }}
              title={<LikeOutlined />}
              value={`112893`}
            />
          </div>,
          <div key="message" onClick={() => login(() => setOpenComment(true))}>
            <Statistic
              valueStyle={{ fontSize: '10px' }}
              title={<MessageOutlined />}
              value={`${props.product?.quantity} Messenger`}
            />
          </div>,
          <div key="cart" onClick={() => login()}>
            <Statistic
              valueStyle={{ fontSize: '10px' }}
              title={<ShoppingCartOutlined />}
              value={`${props.product?.quantity} Buyer`}
            />
          </div>,
        ]}
      >
        <Link href={`/market/${props.id || props.order_id}`}>
          <Meta
            // avatar={<Avatar size={50} src={props.ownerImg} />}
            title={
              <div>
                <div className="mb-[15px]">
                  <Meta className="text-center" title={props.product?.name} />
                </div>
                {props.product?.user?.username ||
                props.product?.user?.avatar ||
                props.order_type ? (
                  <div className="flex mt-[10px] items-center">
                    <Avatar
                      size={50}
                      src={
                        props.product?.user?.avatar ||
                        staticVariables.noImage.src
                      }
                    />
                    <div className="ml-[10px]">
                      <p className="font-normal text-xs mr-[10px]">
                        {props.product?.user?.username}
                      </p>
                      <Tag
                        color={
                          props.order_type === 'FARMER'
                            ? 'green'
                            : 'blue-inverse'
                        }
                        className="font-light"
                      >
                        {props.order_type}
                      </Tag>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            }
            description={
              <ConfigProvider
                theme={{
                  components: {
                    Statistic: {
                      contentFontSize: 20,
                      // titleFontSize: 12,
                    },
                  },
                }}
              >
                <div className="flex justify-around">
                  <Statistic title="Quantity" value={props.product?.quantity} />
                  <Statistic
                    title="Price"
                    suffix={currency}
                    value={props.product?.price}
                  />
                </div>
              </ConfigProvider>
            }
          />
        </Link>
      </Card>
      <Modal
        onCancel={() => setOpenComment(false)}
        centered
        title={'Bình luận về AA'}
        open={openComment}
        afterOpenChange={afterOpenChange}
        footer={[]}
      >
        <div className="max-h-[500px] overflow-auto">
          {commentList.length ? (
            commentList.map((item, index) => (
              <CommentItem {...item} key={index} />
            ))
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_DEFAULT}
              description={'Chưa có bình luận nào'}
            />
          )}
        </div>
        <CommentInput
          marketId={props.id || ''}
          productId={props.order_id || ''}
        />
      </Modal>
    </div>
  );
}
