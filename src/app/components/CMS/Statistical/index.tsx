import React, { useState } from 'react';
import { Chart } from './Chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromWaterPump,
  faCloudSun,
  faIndustry,
  faLeaf,
  faSeedling,
  faSunPlantWilt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import instanceAxios from '@/api/instanceAxios';
import { useEffectOnce } from 'usehooks-ts';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import staticVariables from '@/static';
import { Avatar, Image } from 'antd';
import { useAppSelector } from '@/hooks';

ChartJS.register(ArcElement, Tooltip, Legend);
export default function Statistical() {
  const [dataStatistical, setSataStatistical] = useState<StatisticalSystemType>(
    {}
  );
  const currentUser = useAppSelector((state) => state.user.user);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          // This more specific font property overrides the global property
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
          // This more specific font property overrides the global property
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
  const fethStatisticalSystems = async () => {
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
  useEffectOnce(() => {
    fethStatisticalSystems();
  });
  return (
    <div className="w-full pb-[50px]">
      <div className="w-full flex justify-around flex-wrap gap-5">
        {listStatistical.map((item, index) => (
          <div
            key={index}
            className="flex w-1/4 gap-x-5 items-center p-[20px] bg-green-100 rounded-xl"
          >
            <div>
              <Avatar shape={'square'} size={50} src={item.img} />
            </div>
            {/* {item.icon} */}
            <div className="flex flex-col">
              <p className="text-[25px] font-bold">{item.value}</p>
              <p>{item.label}</p>
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
      {/* <Chart /> */}
    </div>
  );
}
