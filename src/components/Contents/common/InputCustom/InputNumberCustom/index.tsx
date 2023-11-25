import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch } from '@/hooks';
import { setUser } from '@/reducers/userSlice';
import currency from '@/services/currency';
import fetchUpdate from '@/services/fetchUpdate';
import { EditTwoTone, WarningTwoTone } from '@ant-design/icons';
import {
  Button,
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  InputRef,
  Modal,
  notification,
} from 'antd';
import { valueType } from 'antd/es/statistic/utils';
import { FocusEvent, memo } from 'react';
import React, {
  ReactNode,
  KeyboardEvent,
  useState,
  useEffect,
  useRef,
  RefAttributes,
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEventHandler,
  FocusEventHandler,
} from 'react';
import { useSWRConfig } from 'swr';
import { useEffectOnce } from 'usehooks-ts';
export default memo(function InputNumberCustom({
  name,
  initialValue,
  className,
  input,
  classNameLabel,
  APIurl,
  passType = 'body',
  mutateAPI,
  queryType,
  showEdit = true,
  showCurrence = false,
  onKeyDown,
  onSuccess,
}: // onChange = () => {},
{
  name: string;
  initialValue: number;
  className?: string;
  classNameLabel?: string;
  APIurl: string;
  input?: InputNumberProps;
  showEdit?: boolean;
  queryType: 'user' | 'product';
  passType?: 'body' | 'params';
  mutateAPI?: string;
  showCurrence?: boolean;
  onSuccess?: () => void;
  onKeyDown?: KeyboardEventHandler;
  // onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  const [editAble, setEditAble] = useState(false);
  const [value, setValue] = useState(0);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const handleOk = async () => {
    setLoading(true);
    await instanceAxios
      .put(
        passType === 'body' ? APIurl : `${APIurl}?${name}=${value}`,
        passType === 'body' && { [name]: value }
      )
      .then((res) => {
        setEditAble(false);
        setOpenModalConfirm(false);
        if (queryType == 'user') {
          dispatch(setUser(res.data.data as UserType));
        }
        mutateAPI && mutate(mutateAPI);
        onSuccess?.();
        notification.success({
          message: 'Success',
          description: 'Cập nhật dữ liệu thành công',
        });
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: 'Error',
          description: 'Cập nhật dữ liệu thất bại',
        });
      })
      .finally(() => setLoading(false));
  };

  const handleBlur = async () => {
    if (value === initialValue) {
      setTimeout(() => setEditAble(false), 300);
    } else {
      setOpenModalConfirm(true);
    }

    // if (value === initialValue) {
    //   setEditAble(false);
    // } else {
    //   await fetchUpdateUser(
    //     { full_name: value },
    //     (res) => {
    //       console.log(res);
    //       setEditAble(false);
    //       // setValue(e.target.value);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // }
  };

  const handleChange = (e: any) => {
    // onChange?.(e);
    setValue(e);
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    onKeyDown?.(e);
    if (e.key === 'Enter') {
      if (value === initialValue) {
        setEditAble(false);
      } else {
        setOpenModalConfirm(true);
      }
    }
  };
  return (
    <div className={`flex w-fit h-fit item-center ${className}`}>
      {editAble ? (
        <InputNumber
          {...input}
          autoFocus
          onChange={handleChange}
          value={value}
          defaultValue={value}
          onKeyDown={(e) => handleKeyDown(e)}
          onBlur={handleBlur}
          onEnded={() => alert('OK')}
        />
      ) : (
        <p className={classNameLabel}>
          {`${showCurrence ? currency : ''} ${value
            .toLocaleString()
            .replace(/\./g, ',')}`}
        </p>
      )}
      <Modal
        title={
          <div>
            <WarningTwoTone className="mr-[10px]" />
            Xác nhận thay đổi dữ liệu
          </div>
        }
        centered
        open={openModalConfirm}
        // onOk={fetchUpdate}
        onCancel={() => {
          setOpenModalConfirm(false), setValue(initialValue);
        }}
        // cancelText="Huỷ"
        // okText="OK"
        footer={[
          <Button loading={loading} onClick={handleOk} key={0}>
            Xác nhận
          </Button>,
          <Button
            disabled={loading}
            onClick={() => {
              setOpenModalConfirm(false), setValue(initialValue);
            }}
            key={1}
          >
            Hủy
          </Button>,
        ]}
      >
        Dữ liệu của bạn vừa nhập có sự thay đổi đối với dữ liệu gốc. Xác nhận
        thay đổi!!!!
      </Modal>
      {showEdit && (
        <EditTwoTone
          className="px-[10px]"
          onClick={() => setEditAble(!editAble)}
        />
      )}
    </div>
  );
});
