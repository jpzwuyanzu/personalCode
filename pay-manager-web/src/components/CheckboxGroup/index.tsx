import { Checkbox } from 'antd';
import { ProFormItem } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { CheckboxOptionType, CheckboxValueType } from 'antd/es/checkbox/Group';

type Props = {
  options: Array<CheckboxOptionType | string | number>;
  value?: any;
  onChange?: (value: any) => void;
};

export default (props: Props) => {
  const { options, value: initValue = [] } = props;

  const [checkAll, setCheckAll] = useState(false);
  const [value, setValue] = useState<any>([]);
  const [indeterminate, setIndeterminate] = useState(
    initValue.length && initValue.length < options.length,
  );

  useEffect(() => {
    props?.onChange?.(value);
  }, [value]);

  const onChange = (list: CheckboxValueType[]) => {
    setValue(list);
    setIndeterminate(list.length > 0 && list.length < options.length);
    setCheckAll(list.length > 0 && list.length === options.length);
  };

  const onCheckAllChange = (e: any) => {
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    const items = options.map((item: any) => item.value);
    setValue(e.target.checked ? items : []);
  };

  useEffect(() => {
    props?.onChange?.(initValue);
    onChange(initValue);
  }, [initValue]);

  return (
    <>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
        style={{ marginBottom: 7 }}
      >
        全选
      </Checkbox>
      <Checkbox.Group
        name="merchantIds"
        options={options}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
