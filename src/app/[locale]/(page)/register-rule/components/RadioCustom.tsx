import { Button, Radio, Space, SpaceProps } from 'antd';
import React, { useState } from 'react';

interface Props {
  title?: string;
  itemList?: {
    label?: string;
    value?: string | number;
  }[];
  spaceProps?: SpaceProps;
  defaulValue?: string | number;
  onChange?: (e?: any) => void;
}

export default function RadioCustom(props: Props) {
  //   const [valueRadio, setValueRadio] = useState(props.defaulValue || '');
  return (
    <div>
      <p className="pt-[12px] pb-[20px] text-[14px]">{props.title}</p>
      <Radio.Group
        defaultValue={props.defaulValue || ''}
        onChange={(e) => {
          //   setValueRadio(e.target.value);
          props.onChange?.(e.target.value);
        }}
      >
        <Space {...props.spaceProps}>
          {props.itemList?.map((item, index) => (
            <Radio key={index} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
}
