import staticVariables from '@/static';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Col, Row, Tooltip } from 'antd';

export default function ChainItem({
  role = '',
  data,
}: {
  role?: string;
  data: DetailHistoryType;
}) {
  return (
    <Row className="px-[10px] py-[15px] border-[1px]">
      S
      <Col span={2}>
        <div>
          <Avatar
            src={data.product?.user?.avatar || staticVariables.noImage.src}
          />
        </div>
      </Col>
      <Col span={4}>
        <Tooltip title={data.product?.user?.system_role}>
          <div className="flex items-center">
            <p className="pr-[10px] truncate">
              {data.product?.user?.system_role}
            </p>
          </div>
        </Tooltip>
      </Col>
      <Col span={4}>
        <Tooltip title={data.product?.user?.full_name}>
          <p className="pr-[10px] truncate">{data.product?.user?.full_name}</p>
        </Tooltip>
      </Col>
      <Col span={4}>
        <Tooltip title={data.product?.user?.email}>
          <p className="pr-[10px] truncate">{data.product?.user?.email}</p>
        </Tooltip>
      </Col>
      <Col span={4}>
        <Tooltip title={data.product?.user?.address_wallet}>
          <p className="pr-[10px] truncate">
            {data.product?.user?.tx_hash && (
              <a
                href={`https://goerli.arbiscan.io/tx/${data.product?.user?.tx_hash}`}
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
      {/* <Col span={4}>
                        <TooltipAntd title="Hạt giống cây sầu riêng Tây Nguyên">
                          <p className="pr-[10px] truncate">
                            Hạt giống cây sầu riêng Tây Nguyên
                          </p>
                        </TooltipAntd>
                      </Col> */}
      <Col span={4}>
        <Tooltip title={role}>
          <p className="text-center px-[10px] truncate bg-blue-100 rounded-lg text-blue-500">
            {role}
          </p>
        </Tooltip>
      </Col>
    </Row>
  );
}
