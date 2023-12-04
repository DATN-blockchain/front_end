import getRole from '@/services/getRole';
import staticVariables from '@/static';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Col, Row, Tooltip } from 'antd';
import React from 'react';

export default function ChainItem({
  owner,
  data,
}: {
  owner: string;
  data: OwnerProductType;
}) {
  function convertOwnerTypeToList(ownerType: OwnerProductType): UserType[] {
    const userList: UserType[] = [];

    if (ownerType.manufacturer) {
      userList.push(ownerType.manufacturer);
    }

    if (ownerType.farmer) {
      userList.push(ownerType.farmer);
    }

    if (ownerType.seedling_company) {
      userList.push(ownerType.seedling_company);
    }

    return userList;
  }
  const new_data = convertOwnerTypeToList(data);
  console.log('new data', data);
  return (
    <>
      {new_data.map((item: UserType, index: number) => (
        <Row key={index} className="px-[10px] py-[15px] border-[1px]">
          <Col span={2}>
            <div>
              <Avatar src={item.avatar || staticVariables.noImage.src} />
            </div>
          </Col>
          <Col span={4}>
            <Tooltip title={item.system_role}>
              <div className="flex items-center">
                <p className="pr-[10px] truncate">{item.system_role}</p>
              </div>
            </Tooltip>
          </Col>
          <Col span={4}>
            <Tooltip title={item.full_name}>
              <p className="pr-[10px] truncate">{item.full_name}</p>
            </Tooltip>
          </Col>
          <Col span={4}>
            <Tooltip title={item.email}>
              <p className="pr-[10px] truncate">{item?.email}</p>
            </Tooltip>
          </Col>
          <Col span={4}>
            <Tooltip title={item.address_wallet}>
              <p className="pr-[10px] truncate">
                {item.tx_hash && (
                  <a
                    href={`https://goerli.arbiscan.io/tx/${item.tx_hash}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={faUpRightFromSquare}
                      style={{ color: '#000' }}
                    />
                  </a>
                )}
              </p>
            </Tooltip>
          </Col>
          <Col span={4}>
            <Tooltip title={item.system_role}>
              <p className="text-center px-[10px] truncate bg-blue-100 rounded-lg text-blue-500">
                {owner === item.id
                  ? 'Chủ sở hữu'
                  : getRole(item.system_role || '')}
              </p>
            </Tooltip>
          </Col>
        </Row>
      ))}
    </>
  );
}
