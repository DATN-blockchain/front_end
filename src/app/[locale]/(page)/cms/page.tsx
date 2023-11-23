'use client';
import React, { memo, useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  LeftCircleTwoTone,
  PieChartOutlined,
  RightCircleTwoTone,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import GeneralInformation from '@/components/CMS/GeneralInformation';
import ChangPassword from '@/components/CMS/ChangePassword';
import ProductCMS from '@/components/CMS/Product';
import TransactionCMS from '@/components/CMS/Transaction';
import { useAppSelector } from '@/hooks';
import { useRouter } from 'next/navigation';
import ManageUser from '@/components/CMS/Admin/ManageUser';
import ManageProduct from '@/components/CMS/Admin/ManageProduct';
import Statistical from '@/components/CMS/Statistical';
import { useEffectOnce } from 'usehooks-ts';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export default memo(function CMSPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem('page'))
  );
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const currentUser = useAppSelector((state) => state.user);

  ////Render taskbar
  const items: MenuItem[] = [
    getItem(<p>Thống kê</p>, '1', <PieChartOutlined />),
    getItem('Thông tin của bạn', 'sub1', <UserOutlined />, [
      getItem(<p>Thông tin chung</p>, '2'),
      getItem(<p>Đổi mật khẩu</p>, '3'),
      getItem(<p>Liên kết</p>, '4'),
    ]),
    currentUser.user.system_role !== 'ADMIN'
      ? getItem('Sản phẩm', 'sub2', <TeamOutlined />, [
          getItem(<p>Quản lí sản phâm</p>, '5'),
          getItem(<p>Lịch sử giao dịch</p>, '6'),
        ])
      : null,
    // getItem('Files'

    currentUser.user.system_role === 'ADMIN'
      ? getItem('Admin', 'sub3', <TeamOutlined />, [
          // getItem('Thống kê hệ thống', '6'),
          getItem(<p>Quản lí user</p>, '7'),
          // getItem('Quản lí sản phẩm', '8'),
        ])
      : null,
    // getItem('Files', '8', <FileOutlined />),
  ];
  const contents = [
    <Statistical key={1} />,
    <GeneralInformation key={2} />,
    <ChangPassword className="w-2/5 m-auto" key={3} />,
    <></>,
    <ProductCMS key={4} />,
    <TransactionCMS key={5} />,

    currentUser.user.system_role === 'ADMIN'
      ? [
          // <div key={6}>asa</div>,
          <ManageUser key={6} />,
          // <ManageProduct key={8} />,
        ]
      : null,
  ];

  return (
    currentUser.logged && (
      <div className="w-full pt-[90px]">
        <Layout className="w-full">
          <Sider
            className="relative"
            theme={'light'}
            // collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              theme={'light'}
              defaultSelectedKeys={[currentPage.toString()]}
              mode="inline"
              items={items}
              onSelect={(e) => {
                setCurrentPage(Number(e.key));
                localStorage.setItem('page', e.key);
              }}
            />
            <div
              className="absolute top-0 right-0 translate-x-1/2 py-2 text-[20px]"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <RightCircleTwoTone /> : <LeftCircleTwoTone />}
            </div>
          </Sider>
          <Layout>
            {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
            <Content
            //  style={{ margin: '0 16px' }}
            >
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
              <div
                style={{
                  padding: 24,
                  paddingBottom: 50,
                  minHeight: 600,
                  background: colorBgContainer,
                }}
              >
                {contents[currentPage - 1]}
              </div>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
          </Layout>
        </Layout>
      </div>
    )
  );
});
