import { Tooltip } from 'antd';
import React from 'react';

export default function TagItem({
  label,
  typeLabel = 'large',
  value,
  labelClassName,
}: {
  label?: string;
  labelClassName?: string;
  value?: string;
  typeLabel?: 'large' | 'small';
  valueClassName?: string;
}) {
  return (
    <div className="w-full flex flex-col">
      {label && value && (
        <Tooltip title={label} trigger={['click']}>
          <p
            className={` truncate px-[10px]  text-[25px]${
              typeLabel === 'small'
                ? 'px-[10px] font-medium max-sm:text-[7px]'
                : 'py-[5px] font-semibold  max-sm:text-[10px]'
            } ${labelClassName}`}
          >
            {label}
          </p>
        </Tooltip>
      )}
      {value && (
        <Tooltip title={value} trigger={['click']}>
          <p
            className={`w-full rounded-[10px] truncate px-[10px] py-[5px] bg-[#373737] font-medium max-sm:text-[7px] ${labelClassName}`}
          >
            {value}
          </p>
        </Tooltip>
      )}
    </div>
  );
}
