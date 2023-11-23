import instanceAxios from '@/api/instanceAxios';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import {
  faCircleXmark,
  faEnvelope,
  faEye,
  faLock,
  faLockOpen,
  faPenToSquare,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Collapse,
  ConfigProvider,
  Dropdown,
  Popconfirm,
  Popover,
  Row,
  Segmented,
  Space,
  Table,
  Tag,
  notification,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import Link from 'next/link';
import React, {
  ReactNode,
  useEffect,
  useState,
  memo,
  useCallback,
} from 'react';
import useSWR, { useSWRConfig } from 'swr';

export default memo(function ManageUser() {
  const [currentTable, setCurrentTable] = useState('all');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalUser, setTotalUser] = useState(0);
  const [userList, setUserList] = useState<UserRequest[]>([]);
  const { mutate } = useSWRConfig();
  const fetchAction = async (record: UserRequest, action: string) => {
    await instanceAxios
      .put(`user/${record.id}/confirm_user?confirm=${action}`)
      .then((res) => {
        notification.success({
          message: 'Thành công',
          description: `Đã ${action} yêu cầu của ${record.username}`,
        });
        mutate('user/list');
      })
      .catch((err) => {
        notification.error({
          message: 'Lỗi',
          description: `Đã có lỗi xảy ra`,
        });
      });
  };
  const columnsWaiting: ColumnsType<UserRequest> =
    currentTable === 'waiting'
      ? [
          {
            title: 'Role',
            dataIndex: 'system_role',
          },
          {
            title: 'Role yêu cầu',
            // dataIn   dex: '',
            render: (value, record, index) => record.survey_data?.user_role,
          },
        ]
      : [
          {
            title: 'Role',
            dataIndex: 'system_role',
          },
        ];
  const columns: ColumnsType<UserRequest> = [
    {
      title: 'Stt',
      dataIndex: 'key',
      width: 65,
    },
    {
      title: 'Người dùng',
      dataIndex: 'full_name',
      width: 200,
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      // width: 200,
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'created_at',
      render: (value, record, index) => moment(value).format('DD/MM/YYYY'),
    },
    ...columnsWaiting,
    {
      title: 'Trạng thái',
      dataIndex: '',

      render: (value, record, index) =>
        record.confirm_status == 'DONE' ? (
          <Tag color={'success'}>Đã kích hoạt</Tag>
        ) : (
          <Tag color={'gold'}>Chưa kích hoạt</Tag>
        ),
    },

    {
      title: 'Hành động',
      width: 140,
      render: (value, record, index) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                primaryColor: '#e62929',
              },
              Popover: {
                zIndexPopup: 1051,
              },
            },
            token: {
              colorBgContainer: '#7f84d4',
            },
          }}
        >
          {currentTable === 'waiting' ? (
            <div className="flex items-center">
              <Button
                onClick={() => fetchAction(record, 'REJECT')}
                className="text-[10px] py-[6px] px-[10px]"
              >
                Reject
              </Button>
              <Button
                onClick={() => fetchAction(record, 'ACCEPT')}
                className="text-[10px] py-[6px] px-[10px]"
              >
                Accept
              </Button>
            </div>
          ) : (
            <Dropdown
              placement={'bottomLeft'}
              trigger={['click']}
              menu={{
                items: [
                  {
                    key: 1,
                    label: (
                      <Link href={`/product/${record.id}`}>
                        {/* <Popover placement={'left'} title="Xem người dùng"> */}
                        <Space>
                          <FontAwesomeIcon
                            icon={faEye}
                            style={{ color: '#2657ab' }}
                          />
                          <p>Xem người dùng</p>
                        </Space>
                        {/* </Popover> */}
                      </Link>
                    ),
                  },
                  {
                    key: 2,
                    label: (
                      <Popconfirm
                        title={`${
                          record.system_role === 'PUBLISH'
                            ? 'Sure to block this user ?'
                            : 'Sure to open this user ?'
                        }`}
                      >
                        <Space>
                          {record.system_role === 'PUBLISH' ? (
                            <FontAwesomeIcon
                              icon={faLockOpen}
                              style={{ color: '#27913c' }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faLock}
                              style={{ color: '#a87171' }}
                            />
                          )}
                          <p>
                            {record.system_role === 'PUBLISH'
                              ? 'Block this account'
                              : 'Open this account'}
                          </p>
                        </Space>
                        {/* </Popover> */}
                      </Popconfirm>
                    ),
                  },
                  {
                    key: 3,
                    label: (
                      <Space>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          style={{ color: '#65dd55' }}
                        />
                        <p>Nhắn tin cho người dùng</p>
                      </Space>
                    ),
                  },
                  {
                    key: 4,
                    label: (
                      <Popconfirm title="Sure to delete?">
                        <Space>
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            style={{ color: '#c01616' }}
                          />
                          <p>Xóa người dùng</p>
                        </Space>
                      </Popconfirm>
                    ),
                  },
                ],
              }}
            >
              <ExclamationCircleTwoTone className="ml-[30px]" />
            </Dropdown>
          )}
        </ConfigProvider>
      ),
    },
  ];
  const fetchUser = useCallback(async () => {
    setLoading(true);
    await instanceAxios
      .get(
        `${
          currentTable === 'waiting' ? `user/list_users_request` : `user/list`
        }?skip=${skip}&limit=${limit}`
      )
      .then((res) => {
        const newList: UserRequest[] = [...res.data.data.list_users].map(
          (item, index) => ({
            key: skip * limit + index + 1,
            ...item,
          })
        );
        setUserList(newList);
        setTotalUser(res.data.data.total_users);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [currentTable, limit, skip]);
  useSWR(`user/list`, fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleChangeTable = async (e: any) => {
    setSkip(0);
    setCurrentTable(e.toString());
  };

  return (
    <div>
      <div className="flex  items-center justify-between p-[20px] border-[1px] rounded-[10px]">
        <p className="text-3xl font-medium">Quản lí người dùng</p>
      </div>
      <Segmented
        size={'large'}
        defaultValue={currentTable}
        onChange={handleChangeTable}
        options={[
          { label: 'All', value: 'all' },
          { label: 'Yêu cầu kích hoạt', value: 'waiting' },
          { label: 'Đã duyệt', value: 'active' },
          { label: 'Chưa kích hoạt', value: 'not-activate' },
        ]}
      />
      <div data-aos="fade-left">
        <Table
          loading={loading}
          columns={columns}
          dataSource={userList}
          pagination={{
            pageSize: limit,
            onChange: (e) => setSkip(e - 1),
            total: totalUser,
            position: ['bottomCenter'],
          }}
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
});
