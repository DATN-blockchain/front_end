import { LeftArrow, RightArrow } from '@/app/[locale]/home/components/Category';
import staticVariables from '@/static';
import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Collapse,
  ConfigProvider,
  Image,
  Segmented,
  Typography,
} from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import React, { useEffect, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useEffectOnce } from 'usehooks-ts';

export default function RoleSelect({
  onFinishSelectRule,
}: {
  onFinishSelectRule?: (e?: any) => void;
}) {
  const [currentDescriptionPage, setCurrentDescriptionPage] = useState(0);
  const [value, setValue] = useState('FARMER');

  useEffect(() => {
    onFinishSelectRule?.(value);
  }, [onFinishSelectRule, value]);
  const listRuleDescription = [
    {
      rules: 'Seed company',
      value: 'SEEDLING_COMPANY',
      image: staticVariables.qc5.src,
      decription: 'asdasdasd',
      detail: [
        {
          label: 'Xem mô tả',
          content: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
        },
        {
          label: 'Quyền lợi',
          content: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
        },
      ],
    },
    {
      rules: 'Nông dân',
      value: 'FARMER',
      image: staticVariables.qc5.src,
      decription: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
      detail: [
        {
          label: 'Xem mô tả',
          content: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
        },
        {
          label: 'Quyền lợi',
          content: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
        },
      ],
    },
    {
      rules: 'Nhà chế biến',
      value: 'MANUFACTURER',
      image: staticVariables.qc5.src,
      decription: 'asdasdasd',
      detail: [
        {
          label: 'Xem mô tả',
          content: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
        },
        {
          label: 'Quyền lợi',
          content: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
        },
      ],
    },
  ];
  return (
    <div className="w-full flex">
      <div className="w-full overflow-x-auto">
        <ConfigProvider
          theme={{
            components: {
              Segmented: { itemSelectedBg: '#42bb67' },
            },
            token: {
              colorBgLayout: '#E8FFF2B5',
              // paddingXXS: 0,
            },
          }}
        >
          <p className="font-bold text-center	text-4xl font-sans text-green-950 mb-[30px]">
            Bạn muốn giữ vai trò gì trong hệ thống ?
          </p>
          <Segmented
            onChange={(e: SegmentedValue) => {
              setValue(e.toString());
            }}
            options={listRuleDescription.map((item, index) => ({
              label: (
                <div
                  onClick={() => setCurrentDescriptionPage(index)}
                  style={{ padding: 20 }}
                >
                  <Image
                    alt=""
                    className="rounded object-cover"
                    preview={false}
                    height={100}
                    width={100}
                    src={item.image}
                  />
                  <div>{item.rules}</div>
                </div>
              ),
              value: item.value,
            }))}
          />
        </ConfigProvider>
      </div>
      {/* <div className="w-1/2 p-[30px]">
        <p className="text-3xl font-semibold p-[20px]">
          {listRuleDescription[currentDescriptionPage].rules}
        </p>
        <p className="py-[20px] font-thin">
          {listRuleDescription[currentDescriptionPage].decription}
        </p>
        <Collapse
          items={listRuleDescription[currentDescriptionPage].detail.map(
            (item, index) => ({
              key: index,
              label: item.label,
              children: (
                <div className="pr-[50px] text-justify">{item.content}</div>
              ),
            })
          )}
        />
      </div> */}
    </div>
  );
}
