import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch } from '@/hooks';
import { setUser } from '@/reducers/userSlice';
import fetchUpdate from '@/services/fetchUpdate';
import { EditTwoTone, WarningTwoTone } from '@ant-design/icons';
import { Button, Input, InputProps, InputRef, Modal, notification } from 'antd';
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
export default memo(function InputCustom({
  name,
  initialValue,
  className,
  input,
  classNameLabel,
  APIurl,
  queryType,
  showEdit = true,
  passType = 'body',
  mutateAPI,
  onKeyDown,
  onSuccess,
}: // onChange = () => {},
{
  name: string;
  initialValue: string;
  className?: string;
  classNameLabel?: string;
  APIurl: string;
  input?: InputProps;
  showEdit?: boolean;
  queryType: 'user' | 'product';
  passType?: 'body' | 'params';
  mutateAPI?: string;
  onSuccess?: () => void;
  onKeyDown?: KeyboardEventHandler;
  // onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  const [editAble, setEditAble] = useState(false);
  const [value, setValue] = useState('');
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // onChange?.(e);
    setValue(e.target.value);
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
        <Input
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
        <p defaultValue={value} className={classNameLabel}>
          {value}
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
