import React, { useCallback, useState } from 'react';
import InputCustom from '../../common/InputCustom/InputCustom';
import TextAreaCustom from '../../common/InputCustom/TextAreaCustom';
import { Image, Spin, Upload, message } from 'antd';
import staticVariables from '@/static';
import { EditTwoTone } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import instanceAxios from '@/api/instanceAxios';
import { useSWRConfig } from 'swr';
import { getCookie } from 'cookies-next';

interface Props {
  showEdit?: boolean;
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  product_id?: string;
}

export default function Description(props: Props) {
  const [loadingImage, setLoadingImage] = useState(false);
  const { mutate } = useSWRConfig();
  const handleChangeAvatar = useCallback(
    async (info: UploadChangeParam<UploadFile>) => {
      setLoadingImage(true);
      info.file.status = 'done';
      let formData = new FormData();
      formData.append(
        'avatar',
        info.file.originFileObj as Blob,
        info.file.name
      );
      await instanceAxios
        .put('user/avatar', formData)
        .then((res) => {
          console.log(res.data);

          mutate('user/me');
          message.success('Cập nhật thành công');
        })
        .catch((err) => console.log(err))
        .finally(() => setLoadingImage(false));
    },
    [mutate]
  );
  return (
    <div className="w-full h-full flex border-2 border-green-500 rounded-2xl">
      <div className="w-1/2 p-[50px] flex flex-col">
        <InputCustom
          className="text-[20px] py-[20px] font-semibold"
          showEdit={props.showEdit}
          queryType="product"
          APIurl={`detail_description/${props.id}/update`}
          passType="body"
          name={'title'}
          initialValue={props.title || ''}
        />
        <TextAreaCustom
          showEdit={props.showEdit}
          queryType="product"
          APIurl={`detail_description/${props.id}/update`}
          passType="body"
          name={'description'}
          initialValue={props.description || ''}
        />
      </div>
      <div className="w-1/2 relative p-[10px]">
        <Image
          className="object-cover rounded-2xl"
          width="100%"
          height="100%"
          preview={false}
          src={props.image || ''}
          alt=""
        />
        {props.showEdit && (
          <Upload
            accept="image/png, image/jpeg, image/jpg"
            showUploadList={false}
            action={`${process.env.NEXT_PUBLIC_API_ORIGIN}detail_description/${props.id}/img`}
            method="PUT"
            headers={{
              authorization: `Bearer ${getCookie('access_token')}`,
            }}
            name="image"
            onChange={(info) => {
              // if (info.file.status !== 'uploading') {
              //   console.log(info.file, info.fileList);
              // }
              if (info.file.status === 'done') {
                mutate(`product/${props.product_id}`);
                message.success(`Upload thành công`);
              } else if (info.file.status === 'error') {
                message.error(`Upload thất bại`);
              }
            }}
          >
            <EditTwoTone className="absolute -left-6 top-1/2 px-[10px]" />
          </Upload>
        )}
      </div>
    </div>
  );
}
