import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/hooks';
import staticVariables from '@/static';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowUpFromWaterPump,
  faClipboardList,
  faCloudSun,
  faIndustry,
  faLeaf,
  faSeedling,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Image } from 'antd';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import { useEffectOnce } from 'usehooks-ts';
import ItemNotification from '../notification/ItemNotification';
import ItemActivity from '../notification/ItemActivity';

interface IProps {
  created_at: string;
  data: {
    id: string;
    product_id: string;
    updated_at: string;
    user_id: string;
    message: string;
  };
}

ChartJS.register(ArcElement, Tooltip, Legend);
export default function Statistical() {
  const [dataStatistical, setSataStatistical] = useState<StatisticalSystemType>(
    {}
  );
  const [notifications, setNotification] = useState<NotificationItemType[]>([]);
  const [data, setData] = useState<IProps[]>([]);
  const currentUser = useAppSelector((state) => state.user.user);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
            lineHeight: 2.5,
          },
        },
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kê loại người dùng trong hệ thống',
        font: {
          size: 20,
          lineHeight: 2.5,
        },
      },
    },
  };
  const productChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
            lineHeight: 2.5,
          },
        },
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kê loại sản phẩm trong hệ thống',
        font: {
          size: 20,
          lineHeight: 2.5,
        },
      },
    },
  };
  const userChartData = {
    labels: [
      'Tổng tài khoản chưa kích hoạt',
      'Tổng công ty hạt giống',
      'Tổng người trồng trọt',
      'Tổng nhà máy chế biến',
    ],

    datasets: [
      {
        data: [
          dataStatistical.statistical_user?.member_count,
          dataStatistical.statistical_user?.seedling_count,
          dataStatistical.statistical_user?.farmer_count,
          dataStatistical.statistical_user?.manufacturer_count,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const productChartData = {
    labels: [
      'Tổng sản phẩm hạt giống',
      'Tổng sản phẩm trồng trọt',
      'Tổng sản phẩm của nhà máy chế biến',
    ],

    datasets: [
      {
        data: [
          dataStatistical.statistical_product?.seedling_count,
          dataStatistical.statistical_product?.farmer_count,
          dataStatistical.statistical_product?.manufacturer_count,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const listStatistical =
    currentUser.system_role === 'ADMIN'
      ? [
          {
            icon: (
              <FontAwesomeIcon
                size={'4x'}
                icon={faUsers}
                style={{ color: '#3e74d0' }}
              />
            ),
            img: staticVariables.user_anonymous.src,
            label: 'Tổng số User',
            value: dataStatistical.statistical_user?.total_user || 0,
          },
          {
            icon: <FontAwesomeIcon size={'4x'} icon={faUser} />,
            img: staticVariables.user_anonymous.src,
            label: 'Tổng tài khoản chưa kích hoạt',
            value: dataStatistical.statistical_user?.member_count || 0,
          },
          {
            icon: (
              <FontAwesomeIcon
                size={'4x'}
                icon={faUser}
                style={{ color: '#1aa231' }}
              />
            ),
            img: staticVariables.user_seed.src,
            label: 'Tổng công ty hạt giống',
            value: dataStatistical.statistical_user?.seedling_count || 0,
          },
          {
            icon: (
              <FontAwesomeIcon
                size={'4x'}
                icon={faUser}
                style={{ color: '#a4ac2a' }}
              />
            ),
            img: staticVariables.user_farmer.src,
            label: 'Tổng người trồng trọt',
            value: dataStatistical.statistical_user?.farmer_count || 0,
          },
          {
            icon: (
              <FontAwesomeIcon
                size={'4x'}
                icon={faIndustry}
                style={{ color: '#443d57' }}
              />
            ),
            img: staticVariables.user_factory.src,
            label: 'Tổng nhà máy chế biến',
            value: dataStatistical.statistical_user?.manufacturer_count || 0,
          },
          //Product
          {
            icon: (
              <FontAwesomeIcon
                size={'4x'}
                icon={faLeaf}
                style={{ color: '#b8d818' }}
              />
            ),
            img: staticVariables.product.src,
            label: 'Tổng số loại sản phẩm trên hệ thống',
            value: dataStatistical.statistical_product?.total_product || 0,
          },
          {
            icon: (
              <FontAwesomeIcon
                size={'4x'}
                icon={faSeedling}
                style={{ color: '#1aa231' }}
              />
            ),
            img: staticVariables.product_seed.src,
            label: 'Tổng loại cây giống đang mở bán',
            value: dataStatistical.statistical_product?.seedling_count || 0,
          },
          {
            icon: (
              <FontAwesomeIcon
                size={'4x'}
                icon={faCloudSun}
                style={{ color: '#afca2b' }}
              />
            ),
            img: staticVariables.product_farmer.src,
            label: 'Tổng sản phẩm của nông dân đang mở bán trên hệ thống',
            value: dataStatistical.statistical_product?.farmer_count || 0,
          },
          {
            icon: (
              <FontAwesomeIcon
                size={'4x'}
                icon={faArrowUpFromWaterPump}
                style={{ color: '#515358' }}
              />
            ),
            img: staticVariables.product_factory.src,
            label: 'Tổng loại sản phẩm từ nhà máy chế biến',
            value: dataStatistical.statistical_product?.manufacturer_count || 0,
          },
        ]
      : [
          {
            icon: (
              <FontAwesomeIcon
                size={'4x'}
                icon={faCloudSun}
                style={{ color: '#afca2b' }}
              />
            ),
            img: staticVariables.product_farmer.src,
            label: 'Tổng sản phẩm của bạn',
            value: dataStatistical.statistical_product?.total_product || 0,
          },
          {
            icon: (
              <FontAwesomeIcon
                size={'4x'}
                icon={faArrowUpFromWaterPump}
                style={{ color: '#515358' }}
              />
            ),
            img: staticVariables.product_factory.src,
            label: 'Tổng lượt bán',
            value: dataStatistical.statistical_product?.total_sales || 0,
          },
        ];
  const fetchStatisticalSystems = async () => {
    await instanceAxios
      .get(
        `${
          currentUser.system_role === 'ADMIN'
            ? 'user/statistical'
            : 'user/statistical/me'
        }`
      )
      .then((res) => {
        setSataStatistical(res.data.data);
      })
      .catch((err) => {
        console.log('user/statistical', err);
      });
  };

  const fetchNotificationOfUser = async () => {
    await instanceAxios
      .get(`notifications/list`)
      .then((res) => {
        setNotification(res.data.data);
      })
      .catch((err) => {
        console.log('notifications/list', err);
      });
  };

  const fetchActivity = async () => {
    await instanceAxios
      .get(`/activities/{user_id}/user`)
      .then((res) => {
        setData(res.data.data?.list_activities);
      })
      .catch((err) => {
        console.log('notifications/list', err);
      });
  };

  useEffectOnce(() => {
    fetchStatisticalSystems();
    if (currentUser.system_role !== 'ADMIN') {
      fetchActivity();
      fetchNotificationOfUser();
    }
  });

  return (
    <div className="w-full pb-[50px]">
      <div className="w-full flex justify-around flex-wrap gap-5">
        {listStatistical.map((item, index) => (
          <div
            key={index}
            className="flex w-1/4 gap-x-5 items-center border-green-600 border-2 p-[20px] bg-green-100 rounded-xl"
          >
            <div className="border-2 p-[10px] rounded-full border-green-600 bg-white">
              <Image
                className="object-cover  "
                alt=""
                preview={false}
                width={50}
                height={50}
                src={item.img}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-[30px] text-green-800  font-bold">
                {item.value}
              </p>
              <p className="text-green-800">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
      {currentUser.system_role === 'ADMIN' && (
        <div className="w-full flex justify-around mt-10">
          <div className="w-1/3 ">
            <Doughnut options={options} data={userChartData} />
          </div>
          <div className="w-1/3">
            <Pie options={productChartOptions} data={productChartData} />
          </div>
        </div>
      )}
      {/*<Chart />*/}
      {currentUser.system_role !== 'ADMIN' && (
        <div className={'w-full flex gap-5 mt-10'}>
          <div className="w-[50%] bg-[#fdfdfd] rounded-3xl border p-5">
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon
                width={36}
                height={36}
                className="w-8 h-8 text-[#1b8c0c]"
                icon={faClipboardList}
              />
              <h2 className={'font-bold text-2xl text-center'}>
                Nội dung thông báo
              </h2>
            </div>

            <div className="mt-4 flex flex-col gap-1 ">
              {notifications?.map((item, index) => (
                <ItemNotification
                  data={item}
                  message={item?.data?.message as string}
                  createAt={item?.data?.data?.created_at as any}
                  key={index}
                />
              ))}
            </div>
          </div>

          <div className="w-[50%] bg-[#fdfdfd] items-center border justify-center gap-2 rounded-3xl p-5">
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon
                width={36}
                height={36}
                className="w-8 h-8"
                icon={faClipboardList}
              />
              <h2 className={'font-bold text-2xl text-center'}>
                {' '}
                Hoạt động gần đây
              </h2>
            </div>
            <div className="mt-4 w-full flex flex-col gap-1">
              {data?.map((item, index) => (
                <ItemActivity
                  message={item?.data?.message as string}
                  createAt={item?.created_at}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
