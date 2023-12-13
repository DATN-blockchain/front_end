'use client';
import instanceAxios from '@/api/instanceAxios';
import ShopItem from '@/components/Contents/Seek/ShopItem';
import TagItem from '@/components/Contents/Seek/TagItem';
import staticVariables from '@/static';
import { FieldTimeOutlined } from '@ant-design/icons';
import { Avatar, Col, Image, Row, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import ChainItem from '../../(page)/market/[marketId]/components/ChainItem';
import moment from 'moment';

export default function SeekPage({
  params,
}: {
  params: { productId: string };
}) {
  const [currentTab, setCurrentTab] = useState<'PRODUCT' | 'USER'>('USER');
  const [chain, setChain] = useState<OwnerProductType>({});
  const [loadingPage, setLoadingPage] = useState(true);
  const [dataProduct, setDataProduct] = useState<ProductType>({});
  const [growUp, setGrowUp] = useState<GrowUpType[]>([]);

  useEffect(() => {
    setLoadingPage(false);
  }, []);

  useEffect(() => {
    const fetchOrigin = async () => {
      await instanceAxios
        .get(`product/${params.productId}/trace_origin`)
        .then((res) => {
          console.log(res.data.data);
          setChain(res.data.data.chain || {});
          setDataProduct(res.data.data.product || {});
          setGrowUp(res.data.data.grow_up || []);
        })
        .catch((err) => console.log(err));
    };
    fetchOrigin();
  }, [params.productId]);
  return (
    !loadingPage && (
      <div className="w-full font-roboto pb-[50px] bg-[#121212] text-white">
        <div className="w-1/2 py-[10px] m-auto font-bold text-center md:text-[10px]">
          Nguồn gốc sản phẩm
        </div>
        <div className="px-[30px] flex flex-col gap-y-10 mt-[20px]">
          <div>
            <div className="flex">
              <div
                onClick={() => setCurrentTab('USER')}
                className={`w-1/3 py-[10px] text-center ${
                  currentTab === 'USER' ? 'bg-[#373737]' : 'bg-[#1b1b1b]'
                } rounded-xl my-[5px]`}
              >
                Cửa hàng
              </div>
              <div
                onClick={() => setCurrentTab('PRODUCT')}
                className={`w-1/3 py-[10px] text-center ${
                  currentTab === 'PRODUCT' ? 'bg-[#373737]' : 'bg-[#1b1b1b]'
                } rounded-xl my-[5px]`}
              >
                Sản phẩm
              </div>
            </div>
            <ShopItem
              avatar={
                currentTab === 'USER'
                  ? dataProduct.user?.avatar
                  : dataProduct.banner
              }
              leftChildren={
                <div className="w-full bg-[#252525] rounded-2xl ">
                  {currentTab === 'USER' ? (
                    <div className="w-full flex flex-col gap-y-2 p-[10px] py-[15px]">
                      <TagItem
                        label="Tên cửa hàng"
                        value={dataProduct.user?.full_name}
                      />
                      <TagItem label="Sản phẩm bán" value={dataProduct.name} />
                    </div>
                  ) : (
                    <div className="w-full flex flex-col gap-y-2 p-[10px] py-[15px]">
                      <TagItem label="Tên sản phẩm" value={dataProduct.name} />
                    </div>
                  )}
                </div>
              }
              rightChildren={
                <div className="w-full bg-[#252525] rounded-2xl ">
                  {currentTab === 'USER' ? (
                    <div className="w-full flex flex-col gap-y-2 p-[10px] py-[15px]">
                      <p className=" text-right px-[10px] py-[5px] font-semibold text-[25px] max-sm:text-[10px]">
                        Thông tin
                      </p>
                      <TagItem
                        label="Email"
                        typeLabel="small"
                        value={dataProduct.user?.email}
                      />
                      <TagItem
                        label="Username"
                        typeLabel="small"
                        value={dataProduct.user?.username}
                      />
                      <TagItem
                        label="Vai trò"
                        typeLabel="small"
                        value={dataProduct.user?.system_role}
                      />
                      <TagItem
                        label="SDT"
                        typeLabel="small"
                        value={dataProduct.user?.phone}
                      />
                    </div>
                  ) : (
                    <div className="w-full flex flex-col gap-y-2 p-[10px] py-[15px]">
                      <p className=" text-right px-[10px] py-[5px] font-semibold text-[25px] max-sm:text-[10px]">
                        Thông tin
                      </p>
                      <TagItem
                        label="Số lượng bán"
                        typeLabel="small"
                        value={(dataProduct.quantity || 0).toLocaleString()}
                      />
                      <TagItem
                        label="Giá bán"
                        typeLabel="small"
                        value={(dataProduct.price || 0).toLocaleString()}
                      />
                      <TagItem
                        label="Ngày mở bán"
                        typeLabel="small"
                        value={moment(dataProduct.created_at).format(
                          'DD/MM/YYYY - HH:MM:ss'
                        )}
                      />
                    </div>
                  )}
                </div>
              }
            />
          </div>
          <div className="w-full border-[1px]   rounded-xl border-gray-300">
            <div className="flex items-center space-x-4 border-b-[1px] p-[20px]">
              <FieldTimeOutlined className="text-[20px]" />
              <p className="text-[16px] font-semibold tracking-wider">
                Các nhà cung cấp
              </p>
            </div>
            <div className="w-full overflow-x-auto">
              <div className="min-w-[600px]">
                <Row className="w-full px-[5px] py-[15px] border-b-[1px]">
                  <Col span={2}></Col>
                  <Col span={4}>
                    <p>Vai trò</p>
                  </Col>
                  <Col span={4}>
                    <p>Tên</p>
                  </Col>
                  <Col span={4}>
                    <p>Email</p>
                  </Col>
                  <Col span={4}>
                    <p>Mã GD</p>
                  </Col>
                </Row>
                <ChainItem owner={dataProduct.user?.id || ''} data={chain} />
              </div>
            </div>
            {/* before user */}
          </div>
          <div className="flex flex-col gap-y-4">
            {growUp.map((item, index) => (
              <div
                key={index}
                className={`div1 w-[80%] flex items-center rounded-xl relative border-2 p-[10px] ${
                  index !== 0 &&
                  `after:content-[''] after:absolute after:w-[2px] after:h-[calc(50%-10px)] after:top-0 after:right-0 after:translate-x-[2550%] after:bg-white`
                } ${
                  index < growUp.length - 1 &&
                  `before:content-[''] before:absolute before:w-[2px] before:bg-white before:h-[calc(50%+9px)] before:right-0 before:top-1/2 before:translate-y-[10px] before:translate-x-[2550%]`
                }  `}
              >
                <div
                  className={`absolute w-[20px] h-[20px] rounded-full border-2 top-1/2 right-0 -translate-y-1/2 translate-x-[300%]`}
                />
                <div className="w-1/2 h-full overflow-hidden">
                  <Image
                    width={'100%'}
                    height={'100%'}
                    className="object-cover rounded-xl"
                    alt=""
                    src={item.image}
                  />
                </div>
                <div className="w-1/2 p-[10px]">
                  <p className="mb-[10px]">
                    {moment(item.created_at).format('DD/MM/YYYY')}
                  </p>
                  <p className="w-full break-words max-sm:text-[10px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
            {/* <div
              className={`div1 w-[80%] relative border-2 p-[10px] after:content-[''] after:absolute after:w-[2px] after:h-[calc(50%-10px)] after:top-0 after:right-0 after:translate-x-[2550%] after:bg-white  before:content-[''] before:absolute before:w-[2px] before:bg-white before:h-[calc(50%+9px)] before:right-0 before:top-1/2 before:translate-y-[10px] before:translate-x-[2550%]`}
            >
              <div
                className={`absolute w-[20px] h-[20px] rounded-full border-2 top-1/2 right-0 -translate-y-1/2 translate-x-[300%]`}
              />
              <p>asdadasdadasdadadad</p>
              <p>asdadasdadasdadadad</p>
            </div> */}
          </div>
          {/* <div>
          <div className="w-1/3 py-[10px] text-center bg-[#373737] rounded-xl my-[5px]">
            Sản phẩm
          </div>
          <ShopItem
            leftChildren={
              <div className="w-full rounded-2xl bg-green-100 ">
                <div className="w-full flex flex-col gap-y-1 p-[10px] py-[15px]">
                  <TagItem
                    label="Tên sản phẩm"
                    value="Bim bim snack siêu cay"
                  />
                  <TagItem label="asdasd" value="asdads" />
                </div>
              </div>
            }
            rightChildren={
              <div className="w-full rounded-2xl bg-gradient-to-b from-green-300">
                <div className="w-full flex flex-col gap-y-1 p-[10px] py-[15px]">
                  <p className=" text-right px-[10px] py-[5px] font-semibold text-[25px] max-sm:text-[10px]">
                    Thông tin
                  </p>
                  <TagItem value="Nguyễn Văn A" />
                  <TagItem value="Nguyễn Văn A" />
                  <TagItem value="Nguyễn Văn A" />
                  <TagItem value="Nguyễn Văn A" />
                </div>
              </div>
            }
          />
        </div> */}
        </div>
        {/* <div className="w-full relative pt-[50px] before:content-[''] before:absolute before:left-1/2 before:-translate-y-[120px] before:-translate-x-1/2 before:h-[calc(100%+120px)] before:top-0 before:w-[5px] before:bg-[#9c6161]">
        <div className="w-1/3 py-[10px] text-center bg-[#d9d9d9] rounded-e-2xl my-[5px]">
          Nguồn gốc
        </div>
        <div className="w-full flex flex-row justify-between px-[10px] relative before:content-[''] before:absolute before:w-[15px] before:h-[15px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:top-1/2 before:left-1/2 before:bg-[#9c6161]">
          <div className="w-[45%] bg-[#d9d9d9] rounded-2xl p-[10px]">
            <div className="w-full flex flex-col gap-y-1 py-[15px]">
              <TagItem label="Tên cửa hàng" value="Nguyễn Văn A" />
            </div>
            <div className="w-full flex">
              <div className="w-1/3 flex justify-center items-center">
                <Avatar
                  size={'large'}
                  src={staticVariables.noImage.src}
                  className="object-cover"
                  alt=""
                />
              </div>
              <div className="w-2/3 flex flex-col gap-y-1">
                <TagItem value="Nguyễn Văn A" />
                <TagItem value="Nguyễn Văn A" />
                <TagItem value="Nguyễn Văn A" />
                <TagItem value="Nguyễn Văn A" />
              </div>
            </div>
          </div>
          <div className="w-[45%] bg-[#d9d9d9] rounded-2xl p-[10px]">
            <div className="w-full  py-[15px]">
              <TagItem
                label="Sản phẩm cung cấp"
                value="Nguyễn Văn Aasddddddddddddddddddddddddddddddddddddddddddd"
              />
            </div>
            <div className="w-full flex">
              <div className="w-1/3 flex justify-center items-center">
                <Avatar
                  size={'large'}
                  src={staticVariables.noImage.src}
                  className="object-cover"
                  alt=""
                />
              </div>
              <div className="w-2/3 flex flex-col gap-y-1">
                <TagItem value="Nguyễn Văn A" />
                <TagItem value="Nguyễn Văn A" />
                <TagItem value="Nguyễn Văn A" />
                <TagItem value="Nguyễn Văn A" />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      </div>
    )
  );
}
