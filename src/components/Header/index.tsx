'use client';
import staticVariables from '@/static';
import {
  Avatar,
  Badge,
  Button,
  Col,
  ConfigProvider,
  Dropdown,
  Empty,
  Image,
  Input,
  InputNumber,
  MenuProps,
  Modal,
  Popover,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  message,
  notification,
} from 'antd';
import Link from 'next/link';
import { deleteCookie, getCookie } from 'cookies-next';
import React, {
  ChangeEvent,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Login from './Login';
import Register from './Register';
import { useDebounce, useEffectOnce, useOnClickOutside } from 'usehooks-ts';
import { usePathname as pathLanguage, useRouter } from 'next-intl/client';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks';
import useSWR, { useSWRConfig } from 'swr';
import {
  FieldTimeOutlined,
  GroupOutlined,
  HomeOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faCartShopping,
  faEarthAsia,
  faHouse,
  // faUser,
  faUserGear,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { logOut, setLogin } from '@/reducers/userSlice';
import SearchItem from './SearchItem';
import instanceAxios from '@/api/instanceAxios';
import { setshowFormLogin } from '@/reducers/showFormSlice';
import ForgetForm from './Register/ForgetForm';
import { Inter } from 'next/font/google';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import NotificationItem from './NotificationItem';
import moment from 'moment';
import 'moment/locale/vi';
import currency from '@/services/currency';
import CartItem from './CartItem';
import { CheckoutForm } from '../Contents/common/CheckoutForm';

const inter = Inter({ subsets: ['latin'] });

export default memo(function Header() {
  // const [user, setUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [valueRadioCart, setValueRadioCart] = useState(0);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showSearchItems, setShowSearchItems] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);

  const [currentForm, setCurrentForm] = useState<
    'LOGIN' | 'REGISTER' | 'FORGET'
  >('LOGIN');
  const [dataHeader, setDataHeader] = useState({});
  const [valueSearch, setValueSearch] = useState('');
  const [resultSearch, setResultSearch] = useState<MarketType[]>([]);
  const [listCart, setListCart] = useState<CartItemType[]>([]);
  const [listNotifications, setListNotifications] = useState<
    NotificationItemType[]
  >([]);
  const [listUnreadNotifications, setListUnreadNotifications] = useState(0);
  // const [totalNotifications, setTotalNotifications] = useState(0);
  const debouncedValue = useDebounce<string>(valueSearch, 300);
  const { mutate } = useSWRConfig();

  const router = useRouter();
  const t = useTranslations('header');
  const pathname = pathLanguage();
  const path = usePathname();
  const locale = useLocale();
  const logged = useAppSelector((state) => state.user.logged);
  const currentUser = useAppSelector((state) => state.user.user);
  const showFormLogin = useAppSelector((state) => state.showForm.showFormLogin);
  const dispatch = useAppDispatch();
  moment.locale(locale);

  const onChange = (e: RadioChangeEvent) => {
    // console.log('radio checked', e.target.value);
    setValueRadioCart(e.target.value);
  };

  const listIcon = [
    <HomeOutlined key={1} />,
    <GroupOutlined key={2} />,
    <FieldTimeOutlined key={3} />,
    <QuestionCircleOutlined key={4} />,
  ];

  const isHomePage = path === '/' + (locale === 'vi' ? '' : locale);
  useEffect(() => {
    // Sử dụng hàm async IIFE để lấy dữ liệu từ tệp dịch vụ (JSON)
    const fetchData = async () => {
      try {
        const messages = (await import(`../../../messages/${locale}.json`))
          .default;
        setDataHeader(messages.header);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setDataHeader({}); // Xử lý lỗi nếu cần thiết
      }
    };

    fetchData();
  }, [locale]);

  const fethGetUser = useCallback(async () => {
    await instanceAxios
      .get('user/me')
      .then((res) => {
        // console.log(res.data.data);
        dispatch(setLogin({ logged: true, user: { ...res.data.data } }));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
  // useEffectOnce(() => {
  //   fethGetUser();
  // });

  const fetchNotifications = async () => {
    await instanceAxios
      .get(`notifications/list`)
      .then((res) => {
        setListNotifications(res.data.data);
        setListUnreadNotifications(res.data.meta.unread_total);
        // setTotalNotifications(res.data.data.meta.total);
      })
      .catch((err) => console.log(err));
  };
  const fethMarketSearch = useCallback(async () => {
    await instanceAxios
      .get(`marketplace/list?name_product=${debouncedValue}&skip=0&limit=10`)
      .then((res) => {
        setResultSearch(res.data.data.list_marketplace);
      })
      .catch((err) => console.log(err));
  }, [debouncedValue]);

  const fethListCart = async () => {
    await instanceAxios
      .get(`cart/list?skip=0&limit=1000`)
      .then((res) => {
        setListCart(res.data.data.list_cart);
      })
      .catch((err) => console.log(err));
  };
  const fetchBuyCartItem = async () => {
    setLoadingBuy(true);
    await instanceAxios
      .put(
        `product/${listCart[valueRadioCart].product_id}/purchase?price=${listCart[valueRadioCart].price}&quantity=${listCart[valueRadioCart].quantity}&cart_id=${listCart[valueRadioCart].id}`
      )
      .then((res) => {
        notification.success({
          message: 'Mua hàng thành công',
          description: 'Bạn có thể xem lại đơn hàng ở trang thông tin',
        });
        mutate('cart/list');
      })
      .catch((err) => {
        notification.error({
          message: 'Mua hàng thất bại',
          description: 'Bạn có thể vui lòng xem lại thông tin',
        });
      })
      .finally(() => setLoadingBuy(false));
  };

  useEffect(() => {
    if (showFormLogin) {
      setCurrentForm('LOGIN');
      setShowModal(true);
    }
  }, [showFormLogin]);

  useEffect(() => {
    if (debouncedValue) {
      fethMarketSearch();
    }
  }, [debouncedValue, fethMarketSearch]);
  useEffect(() => {
    fethListCart();
  }, [logged]);
  useEffect(() => {
    fetchNotifications();
  }, [logged]);

  useSWR('cart/list', fethListCart);
  useSWR('user/me', fethGetUser);
  useSWR('notifications/list', fetchNotifications);

  const handleChangeLanguage = () => {
    router.replace(pathname, { locale: locale === 'vi' ? 'en' : 'vi' });
  };
  const onFinishOTP = () => {
    setCurrentForm('LOGIN');
  };
  const handleShowModal = () => {
    mutate('notifications/list');
    setShowModal(false);
  };
  const handleLogout = async () => {
    // const access = getCookie('access_token');
    delete instanceAxios.defaults.headers.common.Authorization;
    dispatch(logOut());
    deleteCookie('access_token');
    // router.push('/');
    // setShowModal(true);
    setCurrentForm('LOGIN');
    mutate('user/me');
  };

  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowSearchItems(false));
  const contentNotifications = (
    <div className="max-h-[500px] overflow-auto">
      {listNotifications.length ? (
        listNotifications.map((item, index) => (
          <NotificationItem key={index} {...item} />
        ))
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={'Chưa có thông báo nào'}
        />
      )}
    </div>
  );
  const items: MenuProps['items'] = [
    {
      label: (
        <Link href={`/user/${currentUser.id}`}>
          <Space
            className="py-[10px] font-medium text-[16px] space-x-3 px-[5px] rounded-xl"
            wrap={false}
          >
            <FontAwesomeIcon icon={faUser} style={{ color: '#3c64aa' }} />
            <p>Thông tin</p>
          </Space>
        </Link>
      ),
      key: '0',
    },
    // {
    //   label: (
    //     <Popover
    //       title="Thông báo của bạn"
    //       placement={'left'}
    //       content={contentNotifications}
    //     >
    //       <Row gutter={[16, 0]} wrap={false} justify={'start'}>
    //         <Col className="justify-center" span={6}>
    //           <FontAwesomeIcon icon={faBell} style={{ color: '#20249d' }} />
    //         </Col>
    //         <Col span={24}>
    //           {listUnreadNotifications ? (
    //             <Badge
    //               count={listUnreadNotifications}
    //               offset={[5, 8]}
    //               color="blue"
    //             >
    //               <p className="pr-[10px]">Thông báo</p>
    //             </Badge>
    //           ) : (
    //             <p className="pr-[10px]">Thông báo</p>
    //           )}
    //         </Col>
    //       </Row>
    //     </Popover>
    //   ),
    //   key: '1',
    // },
    {
      label: (
        <Space
          className="py-[10px] font-medium text-[16px] px-[5px] space-x-3 rounded-xl"
          wrap={false}
        >
          <FontAwesomeIcon icon={faWallet} style={{ color: '#4096ff' }} />
          <p>{`${currentUser.account_balance} ${currency}`}</p>
        </Space>
      ),
      key: '1',
    },
    // {
    //   label: (
    //     <ConfigProvider
    //       theme={{
    //         token: {
    //           lineWidth: 3,
    //           paddingXS: 10,
    //         },
    //       }}
    //     >
    //       <Space wrap={false} onClick={() => setShowCartModal(true)}>
    //         <Badge count={listCart.length} offset={[-30, 8]} color="blue">
    //           <FontAwesomeIcon icon={faCartShopping} />
    //         </Badge>
    //         <p>Giỏ hàng</p>
    //       </Space>
    //     </ConfigProvider>
    //   ),
    //   key: '2',
    // },
    {
      label: (
        <Link href={'/cms'}>
          <Space
            className="py-[10px] font-medium text-[16px] px-[5px] space-x-3 rounded-xl"
            wrap={false}
          >
            <FontAwesomeIcon icon={faUserGear} style={{ color: '#376ecd' }} />
            <p>Quản lí</p>
          </Space>
        </Link>
      ),
      key: '3',
    },
    {
      label:
        currentUser.system_role === 'MEMBER' ? (
          <Link
            // className="py-[10px] px-[5px] font-medium text-[16px] space-x-3 rounded-xl"
            href={'/register-rule'}
          >
            <Space
              className="py-[10px] font-medium text-[16px] px-[5px] space-x-3 rounded-xl"
              wrap={false}
            >
              <FontAwesomeIcon icon={faUser} />
              <p>Đăng kí thành viên</p>
            </Space>
          </Link>
        ) : (
          ''
        ),
      key: '4',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <div onClick={handleLogout}>
          <Space
            className="py-[10px] font-medium text-[16px] px-[5px] space-x-3 rounded-xl"
            wrap={false}
          >
            <FontAwesomeIcon
              // className="mr-[10px]"
              icon={faArrowRightFromBracket}
            />
            <p>Logout</p>
          </Space>
        </div>
      ),
      key: '5',
    },
  ];
  return (
    <div
      data-aos="fade-down"
      data-aos-duration="1500"
      className={`w-full	text-black ${
        isHomePage ? ' bg-transparent' : 'bg-[#2db457]'
      } bg-white fixed z-50 flex lg:py-1.5 items-center border-b-[1px] justify-between backdrop-blur-[50px] pl-5 pr-10 height-fit
      ${inter.className} `}
    >
      <Link href={'/'}>
        <Avatar
          size={50}
          className={`object-cover scale-[1.8]`}
          src={staticVariables.logoDurian.src}
          alt=""
        />
      </Link>
      <div className={`flex`}>
        {Object.keys((dataHeader as any).route || {}).map((key, index) => (
          <Link
            key={index}
            className={`py-[15px] px-6 flex hover:bg-[#ececec] text-[16px] items-center gap-x-2 rounded-xl hover:text-black transition duration-300 ease-in-out hover:-translate-y-1`}
            href={`/${key}`}
          >
            {/* {listIcon[index]} */}
            <p className={`text-inherit font-medium font-sans`}>
              {t(`route.${key}`)}
            </p>
          </Link>
        ))}
      </div>
      <div className="relative w-1/4">
        <Popover
          getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
          title={
            <p className=" w-full truncate">{`Kết quả tìm kiếm: ${debouncedValue}`}</p>
          }
          className="w-full"
          content={
            <div ref={ref} className="w-full max-h-[400px] overflow-y-auto">
              {resultSearch.length ? (
                resultSearch.map((item, index) => (
                  <SearchItem
                    parent={{ onClick: () => setShowSearchItems(false) }}
                    key={index}
                    data={item}
                  />
                ))
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  description={'Ko tìm thấy kết quả'}
                />
              )}
            </div>
          }
          open={showSearchItems}
          // trigger={'focus'}
          placement={'bottom'}
        >
          <input
            // tabIndex={1}
            maxLength={50}
            className="border-0 bg-[#1212120A] hover:bg-[#ececec] rounded-lg outline-0 px-[20px] py-[10px] text-sm font-light font-sans text-gray-900 "
            placeholder="Search Product...(Max 50 char)"
            value={valueSearch}
            onChange={(e) => {
              setValueSearch(e.target.value);
              if (e.target.value.trim()) {
                setShowSearchItems(true);
              } else {
                setShowSearchItems(false);
              }
            }}
            onFocus={(e) => {
              if (!e.target.value.trim()) {
                return;
              } else {
                setShowSearchItems(true);
                fethMarketSearch();
              }
            }}
          />
        </Popover>
      </div>
      <div className="flex items-center ">
        <ConfigProvider
          theme={{
            token: {
              // colorText: `${isHomePage && 'white'}`,
              // colorBgElevated: `${isHomePage && '#363636FF'}`,
            },
            components: {
              // Select: { controlItemBgActive: `${isHomePage && '#111126CE'}` },
            },
          }}
        >
          <Space className="w-fit bg-[#1212120A] hover:bg-[#ececec] px-[20px] py-[10px] rounded-lg mr-[20px]">
            <FontAwesomeIcon
              size="1x"
              icon={faEarthAsia}
              style={{ color: '#3748c8' }}
            />
            <Select
              defaultValue={locale}
              style={{ width: 100 }}
              onChange={handleChangeLanguage}
              bordered={false}
              // dropdownStyle={isHomePage ? { background: '#363636FF' } : {}}
              className={`text-inherit `}
              size={'small'}
              options={[
                { value: 'vi', label: 'Tiếng Việt' },
                { value: 'en', label: 'English' },
              ]}
            />
          </Space>
        </ConfigProvider>

        {logged ? (
          <div className="flex items-center space-x-5">
            <Popover
              getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
              title="Thông báo của bạn"
              placement={'bottomLeft'}
              trigger={['click']}
              content={contentNotifications}
            >
              <div className="bg-[#1212120A] hover:bg-[#ececec] px-[20px] py-[10px] rounded-lg">
                {listUnreadNotifications ? (
                  <Badge
                    count={listUnreadNotifications}
                    offset={[16, -8]}
                    color="blue"
                  >
                    <FontAwesomeIcon
                      size={'1x'}
                      className=""
                      icon={faBell}
                      style={{ color: '#20249d' }}
                    />
                  </Badge>
                ) : (
                  <FontAwesomeIcon icon={faBell} style={{ color: '#20249d' }} />
                )}
              </div>
            </Popover>

            <Dropdown
              getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
              menu={{ items }}
              placement={'bottom'}
            >
              {/* {listUnreadNotifications ? (
                <Badge
                  count={listUnreadNotifications}
                  offset={[5, 10]}
                  color="blue"
                >
                  <Avatar src={currentUser.avatar} size="large" />
                </Badge>
              ) : ( */}
              <div className="bg-[#1212120A] hover:bg-[#ececec]  px-[20px] py-[10px] rounded-lg">
                {/* <Avatar src={currentUser.avatar} size={20} /> */}
                <FontAwesomeIcon icon={faUser} style={{ color: '#000000' }} />
              </div>
              {/* )} */}
            </Dropdown>
            <ConfigProvider
              theme={{
                token: {
                  // lineWidth: 3,
                  // paddingXS: 10,
                },
              }}
            >
              <Space
                className="bg-[#1212120A] hover:bg-[#ececec]  px-[20px] py-[10px] rounded-lg"
                wrap={false}
                onClick={() => setShowCartModal(true)}
              >
                <Badge count={listCart.length} offset={[16, -8]} color="blue">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Badge>
                {/* <p>Giỏ hàng</p> */}
              </Space>
            </ConfigProvider>
            <Modal
              style={{ float: 'right', margin: '10px' }}
              onCancel={() => setShowCartModal(false)}
              centered
              title={
                <p className="text-[20px] py-[10px] font-semibold">Your cart</p>
              }
              open={showCartModal}
              footer={[]}
            >
              <div className="flex flex-col pr-[10px] w-full">
                <div className="flex justify-between mb-[20px]">
                  <p className="text-[16px] font-semibold">
                    {listCart.length} items
                  </p>
                  {listCart.length && (
                    <p className="text-[14px] font-semibold">Clear all</p>
                  )}
                </div>
                <div className="max-h-[360px] overflow-y-auto w-full flex flex-col">
                  {listCart.length ? (
                    <Radio.Group onChange={onChange} className="flex flex-col">
                      {listCart.map((item, index) => (
                        <Radio key={index} value={index}>
                          <div className="w-[410px]">
                            <CartItem
                              onDeleteSuccess={() => mutate('cart/list')}
                              active={valueRadioCart === index}
                              key={index}
                              data={item}
                            />
                          </div>
                        </Radio>
                      ))}
                    </Radio.Group>
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_DEFAULT}
                      description="Không có sản phẩm nào trong giỏ hàng"
                    />
                  )}
                </div>
                <div className="w-full flex flex-col space-y-5 border-t-[1px] mt-10 pt-5">
                  <div className="flex justify-between ">
                    <p className="text-[16px] font-bold">Total price</p>
                    <div className="flex flex-col">
                      <p className="text-[16px] font-semibold">
                        {listCart[valueRadioCart]?.product?.price || 0}{' '}
                        {currency}
                      </p>
                      <p className="text-[14px]">
                        {listCart[valueRadioCart]?.price || 0} {currency}
                      </p>
                    </div>
                  </div>
                  {/* Button Checkout */}
                  <div className="w-full">
                    <button
                      // disabled
                      // onClick={fetchBuyCartItem}
                      onClick={() => setShowCheckoutModal(true)}
                      className="relative disabled:bg-gray-100 disabled:text-gray-300 block m-auto py-2 px-8 text-black text-base font-bold bg-green-100 rounded-xl overflow-hidden transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0"
                    >
                      Buy now
                    </button>
                    <Modal
                      open={showCheckoutModal}
                      onCancel={() => setShowCheckoutModal(false)}
                      footer={[]}
                    >
                      <CheckoutForm
                        buyQuantity={listCart[valueRadioCart]?.quantity || 0}
                        producId={listCart[valueRadioCart]?.product?.id || ''}
                        price={listCart[valueRadioCart]?.product?.price || 0}
                        quantity={
                          listCart[valueRadioCart]?.product?.quantity || 0
                        }
                        cartId={listCart[valueRadioCart]?.id}
                        onSuccess={() => {
                          mutate(`marketplace/id`);
                        }}
                        receiver={''}
                        phone={''}
                        address={''}
                      />
                    </Modal>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        ) : (
          <div
            className={`text-inherit'} cursor-pointer`}
            onClick={() => setShowModal(true)}
          >
            Đăng nhập
          </div>
        )}
        <ConfigProvider
          theme={{
            token: {
              colorBgElevated: 'rgba(255, 255, 255, 0.75)',
            },
          }}
        >
          <Modal
            open={showModal}
            // width={currentForm === 'REGISTER' ? 1000 : 520}
            className="rounded-3xl backdrop-blur-sm"
            centered
            onCancel={() => {
              setShowModal(false);
              dispatch(setshowFormLogin({ showFormLogin: false }));
            }}
            footer={[]}
          >
            {currentForm === 'LOGIN' && <Login onFinish={handleShowModal} />}
            {currentForm === 'REGISTER' && (
              <Register onFinishOTP={onFinishOTP} onFinish={handleShowModal} />
            )}
            {currentForm === 'FORGET' && (
              <ForgetForm onFinishOTP={onFinishOTP} />
            )}
            <div className=" m-auto flex justify-around	max-w-[300px]">
              <a
                className="text-[16px]"
                onClick={() => setCurrentForm('FORGET')}
              >
                Forget?
              </a>
              <a
                className="text-[16px]"
                onClick={() =>
                  currentForm === 'LOGIN'
                    ? setCurrentForm('REGISTER')
                    : setCurrentForm('LOGIN')
                }
              >
                {currentForm === 'LOGIN' ? 'Register' : 'Login'}
              </a>
            </div>
          </Modal>
        </ConfigProvider>
      </div>
    </div>
  );
});
