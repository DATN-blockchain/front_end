'use client';
import HomeDescription from '@/components/Contents/Main/HomeDescription';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { increment } from '@/reducers/counterSlice';
import staticVariables from '@/static';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Image, Skeleton } from 'antd';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
// const Header = dynamic(() => import('@/components/Header'), {
//   loading: () => <Skeleton.Avatar />,
// });
// const Footer = dynamic(() => import('@/components/Footer'));
export default function Index() {
  return (
    <>
      <Header />
      <div className={`mainpage text-white pt-[100px]`}>
        <div
          className={`w-[600px] text-[70px] py-[10px] ml-[70px] font-black	text-2xl]`}
        >
          Hệ thống chuỗi cung ứng sầu riêng
        </div>
        <div
          data-aos="fade-up"
          className={`w-full flex text-lg mt-[200px] pr-[100px] justify-end`}
        >
          {/* shadow-[0px_4px_50px_30px_#00000089] px-[30px] py-[20px] backdrop-blur-xl bg-[#00000089] rounded` */}
          <p data-aos="fade-up" className={`w-[500px]`}>
            DatBe tạo ra một hệ thống minh bạch cho việc theo dõi nguồn gốc của
            sản phẩm. Thông tin về quá trình sản xuất, vận chuyển và lưu trữ sản
            phẩm được ghi lại một cách an toàn và không thể thay đổi. Điều này
            giúp tăng độ tin cậy cho tất cả các bên liên quan, từ nhà sản xuất
            đến người tiêu dùng cuối cùng
          </p>
        </div>
        <div className="bg-[#000000E2] pt-[300px] mt-[300px] ">
          <p
            data-aos="fade-up"
            className="m-auto text-center text-[35px] font-extrabold	"
          >
            Condimentum Mattis
            <br /> Pellentesque Dnibus Tortyga
          </p>
          <div
            data-aos="fade-up"
            className={`w-full mt-[200px] relative justify-around flex before:content-[''] before:absolute before:block before:top-1/2 before:w-full before:h-[1px] before:bg-white`}
          >
            <div
              className={`w-[200px] text-3xl backdrop-blur-xl rounded-sm border-[0.5px] py-[10px] text-center`}
            >
              Minh bạch
            </div>
            <div
              className={`w-[200px] text-3xl backdrop-blur-xl rounded-sm border-[0.5px] py-[10px] text-center`}
            >
              Uy tín
            </div>
            <div
              className={`w-[200px] text-3xl backdrop-blur-xl rounded-sm border-[0.5px] py-[10px] text-center`}
            >
              Minh bạch
            </div>
          </div>
          <div className="flex items-center px-[50px] justify-center flex-wrap gap-x-10">
            {[...Array(5)].map((_, index) => (
              <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1500"
                data-aos-easing="ease-in-out"
                key={index}
                className="w-[400px] flex flex-col items-center text-center"
              >
                <Avatar
                  shape={'square'}
                  size={200}
                  icon={
                    <FontAwesomeIcon
                      icon={faCubes}
                      style={{ color: '#2d5ba9' }}
                    />
                  }
                />
                <strong className="text-[24px]">Smart and Intuiteve</strong>
                <p className="w-full text-[16px] text-[#6c737d]">
                  Malesuada fames ac turpis egestas sed tempus urna et pharetra.
                  Urna duis convallis convallis tellus id interdum velit laoreet
                  id elementum tellus.
                </p>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col gap-y-[100px] text-black mt-[100px] py-[50px] rounded-sm bg-[#F5F5F5ED]">
            <HomeDescription alignRight={false} />
            <HomeDescription alignRight={true} />
            <HomeDescription alignRight={false} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
