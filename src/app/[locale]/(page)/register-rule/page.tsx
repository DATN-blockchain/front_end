'use client';
import instanceAxios from '@/api/instanceAxios';
import RoleSelect from '@/components/Header/Register/RoleSelect';
import { useAppSelector } from '@/hooks';
import staticVariables from '@/static';
import {
  Button,
  ConfigProvider,
  Image,
  Input,
  Radio,
  Space,
  Typography,
  notification,
} from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSWRConfig } from 'swr';
import Questions from './components/Questions';
import RadioCustom from './components/RadioCustom';

export default function RegisterRulePage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [rule, setRule] = useState('');
  const [gender, setGender] = useState('');
  const [yearOld, setYearOld] = useState('');
  const [education, setEducation] = useState('');
  const [workSpace, setWorkSpace] = useState('');
  const [experience, setExperience] = useState('');
  const [buyAndSellExperiance, setBuyAndSellExperiance] = useState('');
  const [worryBuyProduct, setWorryBuyProduct] = useState('');
  const [longLasting, setLongLasting] = useState('');
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const { mutate } = useSWRConfig();
  const currentUser = useAppSelector((state) => state.user.user);
  const onFinishSelectRule = (e: string) => {
    console.log(e);
    setRule(e);
  };
  const handlePrev = () => {
    if (currentTab == 0) {
      return;
    } else {
      setCurrentTab(currentTab - 1);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (currentTab >= listTab.length - 1) {
      await fetchChangeRule();
    } else {
      setCurrentTab(currentTab + 1);
    }
    setLoading(false);
  };
  const listTab = [
    // Get start
    <div key={0}>
      <div>
        <p className="text-lg font-medium">
          Chào mừng bạn tham gia SUPPLY CHAIN SYSTEM
        </p>
        <p className="pt-[12px] pb-[20px] text-[14px]">
          Hãy bắt đầu thiết lập tài khoản của bạn!
        </p>
        <Button onClick={handleSubmit}>Get go</Button>
      </div>
    </div>,
    // Select Roles
    <div key={1}>
      <RoleSelect onFinishSelectRule={onFinishSelectRule} />
      <Button className="w-fit block m-auto mt-[100px]" onClick={handleSubmit}>
        Next
      </Button>
    </div>,
    // Question1
    <div key={2}>
      <div className="flex flex-col gap-y-5">
        <RadioCustom
          defaulValue={gender}
          onChange={(e) => setGender(e)}
          title="Giới tính của bạn là gì?"
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Nam', value: 'Nam' },
            { label: 'Nữ', value: 'Nữ' },
          ]}
        />
        <RadioCustom
          defaulValue={yearOld}
          onChange={(e) => setYearOld(e)}
          spaceProps={{ direction: 'vertical' }}
          title="Xin vui lòng cho biết, Anh/Chị nằm trong độ tuổi nào? "
          itemList={[
            { label: 'Từ 18-25 tuổi', value: 'Từ 18-25 tuổi' },
            { label: 'Từ 26-35 tuổi', value: 'Từ 26-35 tuổi' },
            { label: 'Từ 36-45 tuổi', value: 'Từ 36-45 tuổi' },
            { label: 'Trên 45 tuổi', value: 'Trên 45 tuổi' },
          ]}
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!!!yearOld || !!!gender} onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>,
    // Question 2
    <div key={3}>
      <div className="flex flex-col gap-y-5">
        <RadioCustom
          defaulValue={education}
          onChange={(e) => setEducation(e)}
          title="Xin vui lòng cho biết, trình độ học vấn hiện tại của Anh/Chị? "
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Trung cấp', value: 'Trung cấp' },
            { label: 'Cao đẳng', value: 'Cao đẳng' },
            { label: 'Đại học', value: 'Đại học' },
            { label: 'Sau đại học', value: 'Sau đại học' },
            { label: 'Khác', value: 'Khác' },
          ]}
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!!!education} onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>,
    // Question 3
    <div key={4}>
      <div className="flex flex-col gap-y-5">
        <p>Anh/chị đã từng làm việc ở đâu?</p>
        <Input
          type="text"
          onChange={(e) => {
            setWorkSpace(e.target.value);
          }}
          placeholder="Nhập kết quả của bạn"
        />
        <RadioCustom
          defaulValue={experience}
          onChange={(e) => setExperience(e)}
          title="Anh/chị đã có kinh nghiệm bao nhiêu năm?"
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Từ 1-2 năm', value: 'Từ 1 năm đến 2 năm kinh nghiệm' },
            { label: 'Từ 2-5 năm', value: 'Từ 2 năm đến 5 năm kinh nghiệm' },
            { label: 'Từ 5-10 năm', value: 'Từ 5 năm đến 10 năm kinh nghiệm' },
            { label: 'Trên 10 năm', value: 'Trên 10 năm kinh nghiệm' },
          ]}
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!!!workSpace || !!!experience} onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>,
    // Question 4
    <div key={5}>
      <div className="flex flex-col gap-y-5">
        <RadioCustom
          defaulValue={buyAndSellExperiance}
          onChange={(e) => setBuyAndSellExperiance(e)}
          title="Anh/chị đã từng mua bán hàng hóa online bao giờ chưa?"
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Đã từng', value: 'Đã từng mua bán hàng online' },
            { label: 'Chưa từng', value: 'Chưa từng mua bán hàng online' },
          ]}
        />
        <RadioCustom
          defaulValue={worryBuyProduct}
          onChange={(e) => setWorryBuyProduct(e)}
          title="Anh/chị có lo lắng khi mua báng hàng online không ?"
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Có', value: 'Lo lắng khi mua bán hàng online' },
            {
              label: 'Không',
              value: 'Không lo lắng khi mua bán hàng online',
            },
          ]}
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button
          disabled={!!!worryBuyProduct || !!!buyAndSellExperiance}
          onClick={handleSubmit}
        >
          Next
        </Button>
      </div>
    </div>,
    // Question 5
    <div key={5}>
      <div className="flex flex-col gap-y-5">
        <RadioCustom
          defaulValue={longLasting}
          onChange={(e) => setLongLasting(e)}
          title="Anh/chị có dự định sử dụng dịch vụ của chúng tôi lâu dài không ?"
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Có', value: 'Có dự định sử dụng dịch vụ lâu dài' },
            {
              label: 'Không',
              value: 'Không dự định sử dụng dịch vụ lâu dài',
            },
          ]}
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!!!longLasting} onClick={handleSubmit}>
          Hoàn thành
        </Button>
      </div>
    </div>,
    // <RoleSelect onFinishSelectRule={onFinishSelectRule} key={0} />,
    // <Questions key={1} />,
  ];
  const fetchChangeRule = async () => {
    console.log(rule);
    await instanceAxios
      .put(`user/surveys`, {
        survey_data: {
          user_role: rule,
          gender,
          yearOld,
          education,
          workSpace,
          buyAndSellExperiance,
          worryBuyProduct,
          longLasting,
        },
      })
      .then((res) => {
        notification.success({
          message: 'Thành công',
          description: (
            <p>
              Đã yêu cầu xác thực tài khoản!!! <br />
              Vui lòng chờ 1 khoảng thời gian để hệ thống xác thực!!!
            </p>
          ),
        });
        route.replace('/home');
        // mutate(mutateAPI);
      })
      .catch((err) => {
        notification.error({
          message: 'Lỗi',
          description: 'Yêu cầu xác thực thất bại',
        });
      });
  };
  return (
    <div className="flex min-h-[750px]">
      <div className="w-1/2 pt-[100px] flex flex-col items-center min-h-[750px]">
        <Image
          width={'50%'}
          // height={'70%'}
          preview={false}
          className="object-cover m-auto"
          alt=""
          src={staticVariables.register_rule.src}
        />
        <p className="flex items-center gap-1 text-txt-secondary font-bold text-[32px] leading-[44px] mt-[13px] relative text-center ">
          Wellcome
        </p>
        <p className="font-normal text-[18px] leading-7 mt-3">
          We provide data on extended sourcing methods in the community..
        </p>
      </div>
      <div className="w-1/2 h-full min-h-[750px] px-[100px] py-[150px] bg-[#f9f9f9]">
        {listTab[currentTab]}
      </div>
      {}
    </div>
  );
}
